import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../App";
import { toast } from "react-hot-toast";


function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username);
    try {
      const { data } = await axios.get(
        `${server}/user/${username}`,
          {withCredentials: true,}
      );
      console.log(data)
      toast.success(data.message);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUsername("");
      navigate("/home");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  };

  useEffect(()=>{
    const userData=localStorage.getItem('user');
    if(userData){
        navigate('/home');
    }
  },[]);

  return (
    <section className='loginpage'>
      <div>
        <img src="logo.webp" alt="logo"  className="logo-img"/>
      </div>
      <div className='logindiv'>
        <div className='head'>
          <h1 id='login'>Login</h1>
        </div>
        <div id='l_des'>Please enter your username here</div>
        <form onSubmit={handleSubmit}>
          <div className='inp_name'>
            <div>
              <span className='name_placeholder'>Username</span>
            </div>
            <input
              name='email'
              value={username}
              required
              className='username'
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className='bottom'>
            <button className='continue' onClick={()=>navigate("/register")}>
              Register
            </button>
            <button type='submit' className='continue'>
              Login now
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
export default Login;
