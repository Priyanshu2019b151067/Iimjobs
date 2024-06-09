import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import WelcomeNavbar from "./WelcomeNavbar";
import "./welcomeNavbar.css";
import { Link, useNavigate } from "react-router-dom";

import { CiLogout } from "react-icons/ci";
import { setWelcomeLogout } from "../../state/welcome";
import axios from "axios";
import { Alert } from "react-bootstrap";
import NewAlert from '../../components/AlertDismissAlert';

const Popup = ({ onClose }) => {
  const state = useSelector((state) => state);
  console.log(state);
  //const popupRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(setWelcomeLogout());
    navigate("/recruiter");
  };
  return (
    <div className="pop-up-overlay">
      <div>
        <p className="name-style">{state.welcome.recruiter.fullName}</p>
        <p className="email-style">{state.welcome.recruiter.email}</p>
        <button onClick={logout} className="pop-up-botton">
          <CiLogout />
          Logout
        </button>
      </div>
    </div>
  );
};

function Welcome() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showAlert,setshowAlert] = useState(false);
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  const resendEmail = async () =>{
    try{
      // email and fullName payload get request
      //api call to email 
      const data = {
        email : state.welcome.recruiter.email,
        fullName : state.welcome.recruiter.fullName
      }
     // console.log(data);
      const queryString = new URLSearchParams(data).toString();

      const response = await axios.get(`http://localhost:3000/verify/resend-email?${queryString}`);
      if(response.status === 200){
        setshowAlert(true);
      }
      //console.log(response.status,response.data);
    }catch(error){
    }
  }
  useEffect(() => {
    // Clear all the previous history
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, null, window.location.href);
    };
  }, []);
  return (
    <div className="container-fluid" >
      <WelcomeNavbar togglePopup={togglePopup} />
      {showAlert  && (<Alert variant ="success" dismissible>Email Sent Sucessfully!!! Check inbox.</Alert>) }
      {/* {<Alert variant={showError ? "succ"} dismissible>Email Sent Sucessfully!!! Check inbox.</Alert>} */}
      <div className="container">
        {isPopupOpen && <Popup onClose={togglePopup} />}
      </div>
      <div className="main-wrapper">
          <div className="main-container">
              <h1>Welcome,&nbsp;
                <span className="user-name">{state.welcome.recruiter.fullName}</span>
                !
              </h1>
              <p>Thank you for signing up! We are excited to have you on board.</p>
              <p>
                        <span class="secText">Before you start posting jobs, we need you to verify your email address.
                        We've sent you an email at </span>
                        <span class="user-email">{state.welcome.recruiter.email}</span><br/>
                        Please click on the activation link to get started.<br/>
              </p>
              <p>If you did not receive any email, please check your spam folder or request <Link onClick={resendEmail} class="request-reactivation resendActive" style={{
                textDecoration : 'none'
              }}>resending an activation link</Link>.</p>
          </div>
      </div>
      
    </div>
  );
}

export default Welcome;
