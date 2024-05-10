import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { useState } from "react";
import axios from "axios";
import { server } from "../../App";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [userName,setUserName] = useState("");
  const [page ,setPage] =useState(0);
  const navigate=useNavigate();
  const createUserId=async()=>{
    if(firstName.length>0){
      setPage(1);
      const random=generateRandomNumber();
      setUserName(firstName+random);
    }
  }
  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 9000) + 1000;
};
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const { data } = await axios.post(
        `${server}/user/create`,
        {
          userId: userName,
          name:firstName
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(data);
      setFirstName("");
      navigate("/");
    } catch (error) {
      console.log(error);

    }
  };

  return (
    <section className='loginpage'>
      <div>
        <img src="logo.webp" alt="logo"  className="logo-img"/>
      </div>
      <div className='logindiv'>
        <div className='head'>
          <h1 id='login'>Register</h1>
        </div>
        
        
        <div>
          <div id='l_des'>Welcome To the Family</div>
        <div className='inp_name'>
              <div>
                <span className='name_placeholder'>Name</span>
              </div>
              <input
                type='text'
                name='firstName'
                value={firstName}
                required
                className='username text'
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </div>
            {page==1 && 
            <div>
              <p style={{color:"red"}}>*Please Remember it*</p>

              <p>Your UserName is {userName}</p>

              </div>}
          <div className='bottom'>
            
            <button className='continue' onClick={()=>navigate('/')}>
              Login Now
            </button>
            <button className='continue' onClick={page==1 ? handleSubmit : createUserId} >
              {(page==1)? 'Register' : 'Get UserId'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Register;
