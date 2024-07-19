import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../App";
import { toast } from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";


function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [loading,setLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username);
    try {
      setLoader(true);
      const { data } = await axios.get(
        `${server}/user/${username}`,
          {withCredentials: true,}
      );
      // console.log(data)
      toast.success(data.message);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUsername("");
      setLoader(false);
      navigate("/home");
    } catch (error) {
      setLoader(false);
      console.log(error);
      toast.error(error.response.data.message)
    }
  };

  // useEffect(()=>{
  //   const userData=localStorage.getItem('user');
  //   if(userData){
  //       navigate('/home');
  //   }
  // },[]);

  return (
    <>
    {loading ? <div className="loader-container">
      <ColorRing
      visible={true}
      height="100"
      width="100"
      ariaLabel="color-ring-loading"
      wrapperStyle={{}}
      wrapperClass="color-ring-wrapper"
      colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
    />
    </div>
    :
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
}
    </>
   
  );
}
export default Login;
