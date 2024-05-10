import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoAddCircleOutline , IoSearchOutline} from "react-icons/io5";
import { MdEdit ,MdDelete} from "react-icons/md";
import "./home.css"
import CreatePop from "../Pop/CreatePop";
import { server } from "../../App";
import axios from "axios";
import NotePop from "../Pop/Note";
import toast from "react-hot-toast";

const Home=()=>{
    const [user,setUser] = useState({});
    const navigate=useNavigate();
    const [createPop , setCreate] =  useState(false);
    const [notePop , setNotePop] =  useState(false);
    const [selectedNote,setSelected] =useState("");
    const [searchQuery, setSearchQuery] = useState('');

    const [notes,setNotes] = useState([]);

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };
    const performSearch = () => {
        if(searchQuery.length>0){
        const filteredResults = notes.filter(item =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setNotes(filteredResults);
        }
        else{
            getNotes(user);
        }
      };
    const getNotes=async(userData)=>{
        if(userData._id!=undefined){
            try {
                const {data} = await axios.get(`${server}/note/${userData._id}`,
                {
                    withCredential:true
                });
                setNotes(data.notes);

            } catch (error) {
                console.log(error)
            }
        }
    }

    const deleteNote=async(noteId)=>{
        try {
            const {data} = await axios.delete(`${server}/note/${noteId}`,{
                withCredentials:true
            });
            toast.success(data.message);
            getNotes(user)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message);
        }
        
    }

    const noteHandler=(note)=>{
        setNotePop(true);
        setSelected(note);
    }

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
          performSearch();
        }, 1000);
    
        return () => clearTimeout(debounceTimeout);
      }, [searchQuery]);

    useEffect(()=>{
        console.log('Fetching user data and notes');
        const userData=localStorage.getItem('user');
        if(userData){
            const parsedUserData = JSON.parse(userData);
            setUser(parsedUserData);
            getNotes(parsedUserData);

        }
        else{
            navigate("/");
        }
        
    },[])
    
    return(
        <div className="home">
            <h2 className="home-intro">Hello <b>{user?.name}</b> </h2>
            <div className="home-search">
                <input type="text" className="home-input"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    placeholder="Search Problems"/>
                <IoSearchOutline size={26} onClick={performSearch}/>
            </div>
            <div className="home-box">
                <div className="home-head">
                <h4>Notes</h4>
                <IoAddCircleOutline size={26} onClick={()=>setCreate(true)}/>
                </div>
                {notes.length==0 && <p>No Notes Found</p>}
                {notes.map((t,i)=>(
                    <div className="home-item" key={i} >
                        <p onClick={()=>noteHandler(t.text)}>{t.title}</p>
                        <div className="gap">
                        <MdEdit onClick={()=>console.log("edit")}/>
                        <MdDelete onClick={()=>deleteNote(t._id)}/>

                    </div>

                </div>
                ))}
            </div>
            {createPop && 
            <CreatePop closeFunc={()=>setCreate(false)} refreshFunc={()=>getNotes(user)}/>
            }
            {notePop && 
            <NotePop closeFunc={()=>setNotePop(false)} notes={selectedNote}/> }
        </div>
    );

}

export default Home;