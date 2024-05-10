import axios from "axios";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import {IoMdClose} from 'react-icons/io'
import "./pop.css"
import { useEffect, useState } from "react";
import { server } from "../../App";

const CreatePop=({closeFunc , refreshFunc})=>{
    const [text,setText] = useState("");
    const [title,setTitle] = useState("");
    const [user,setUser] = useState({});
    
    const submitHandler=async()=>{
        try {
            const {data} = await axios.post(`${server}/note/${user._id}/create`,
            {
                title,
                text
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
                withCredentials: true,
              })
              toast.success(data.message);
              refreshFunc();
              closeFunc();
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
        
      }
      useEffect(()=>{
        const userData=localStorage.getItem('user');
        if(userData){
            const parsedUserData = JSON.parse(userData);
            setUser(parsedUserData);
        }
    },[])
    return (
        <div class="popup-overlay" id="popup">
            <div class="popup-content">
                <div className="comment-head">
                    <h3>Create Note</h3>
                    <IoMdClose class="close-btn" onClick={closeFunc} size={24}/>
                </div>
                <div>
                    <p>Title</p>
                    <input type="text" className="create-input" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title Name"/>
                    <p>Note</p>
                    <textarea type="text"  style={{ height: "450px",fontSize:".7rem"}} value={text} 
                    onChange={(e)=>setText(e.target.value)}
                    className="create-input" placeholder="Write the Notes"/>
                    
                    <button className="save" onClick={submitHandler}>Save</button>



                </div>
            </div>
        </div>
    );
};

export default CreatePop;