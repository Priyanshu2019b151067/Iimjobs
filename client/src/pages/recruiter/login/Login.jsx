import React, { useState,useEffect } from "react";
import "../recruiterNavbar.css";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { setRegister } from "../../../state/recruiter";
import { setWelcome } from "../../../state/welcome";
import ForgetPassword from "./ForgetPassword";


const LoginBox = ({handleButtonClick}) => {
  const [showPassword,setshowPassword] = useState(false);
 
  const handlePassword = ()=>{
    setshowPassword(!showPassword);
  }
  return (
    <>
    {showPassword ? <ForgetPassword setshowPassword={handlePassword}/> : <Login handleButtonClick={handleButtonClick} forgetPassword={handlePassword}/>}
    </>
  );
};



function Login({ handleButtonClick,forgetPassword }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [error,setError] = useState('');



  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  const handleformSubmit = async (e) => {
    e.preventDefault();
    if(loginData.email === '' || loginData.password === ''){
      setError('Enter all fields');
      return;
    }
    //console.log(loginData);
    setError('');
    try {
    const response = await axios.post('http://localhost:3000/recruiter/login',loginData);
    if(response.status === 206){
      dispatch(setWelcome({
        recruiter : response.data.recruiter
      }));
      navigate('/welcome');
    }
    if(response.status ===200){
      dispatch(setRegister({
        recruit : response.data.recruiter,
        token : response.data.token
      }));
      navigate('/dashboard',{ replace: true });
      window.history.pushState(null, null, window.location.href);
      window.history.replaceState(null, null, '/dashboard');
    }
    } catch (error) {
      console.log(error);
       setError(error.response.data.message);
    }
  };


  // useEffect(() => {
  //   // Add a listener to prevent the user from going back to the login page
  //   window.history.pushState(null, null, window.location.href);
  //   window.addEventListener('popstate', () => {
  //     window.history.pushState(null, null, window.location.href);
  //   });

  //   return () => {
  //     window.removeEventListener('popstate', () => {});
  //   };
  // }, []);
  
  return (
    <div
      className="container-fluid p-4 m-2"
      style={{
        backgroundColor: "white",
      }}
    >
      <h2>Post a job for free</h2>
      <div className="container p-2">
        <div className="row mb-3">
          <form onSubmit={handleformSubmit}>
            <div className="col-12 mb-4">
              <label
                htmlFor="email"
                style={{
                  fontSize: "14px",
                }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={loginData.email}
                placeholder="eg. john.smith@gmail.com"
                className="input-style"
                onChange={handleChange}
              />
            </div>
            <div className="col-12 mb-4">
              <span
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <label
                  htmlFor="password"
                  style={{
                    fontSize: "14px",
                  }}
                >
                  Password
                </label>

                <Link
                  style={{
                    textDecoration: "none",
                    color: "#149075",
                    fontSize: "14px",
                  }}
                   onClick={forgetPassword}
                >
                  Forget Password ?
                </Link>
              </span>
              <input
                type="password"
                id="password"
                name="password"
                value={loginData.password}
                placeholder="password here"
                className="input-style"
                onChange={handleChange}
              />
            </div>
            {<p style={{
              color : 'red',
              fontSize : '13px'
            }}>{error}</p>}
            <button
              type="submit"
              className="sign-up-btn-recruiter "
              onSubmit={handleformSubmit}
            >
              Login
            </button>
          </form>
          <p
            style={{
              color: "gray",
              fontWeight: 300,
            }}
            className="mt-3"
          >
            Don't have an account?{" "}
            <Link
              style={{
                textDecoration: "none",
                color: "#149075",
                fontWeight: 400,
              }}
              onClick={handleButtonClick}
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginBox;
