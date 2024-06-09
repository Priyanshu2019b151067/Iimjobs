import { useState } from "react";
import React from "react";
import RecruiterNavbar from "./RecruiterNavbar";
import Signup from "./Signup";
import Login from "./login/Login";
import Heart from "../../images/heart-large.png";
import Remarkable2 from "../../images/remarkable-2.svg";
import Remarkable1 from "../../images/remarkable-1.svg";

import "./index.css";
function Recruiter() {
  const [showSignup, setShowSignup] = useState(false);
  const handleButtonClick = () => {
    setShowSignup(true);
  };

  const handleClose = () => {
    setShowSignup(false);
  };
  return (
    <div
      style={{
        backgroundColor: "#fbfcff",
      }}
    >
      <RecruiterNavbar handleButtonClick={handleButtonClick} />
      {showSignup && <Signup onClose={handleClose} />}
      <div className="container">
        <div className="row main-row">
          <div className="col-8">
            <div className="title-main-head">
              <span className="title-heading">We</span>
              <img src={Heart} alt="heart image" />
              <span className="title-heading">Recruiting</span>
              <p className="introduction-container-subheader">
                Post a job for free and find candidates from top companies
                across domains such as banking & finance, consulting, research &
                analytics, sales & marketing, HR, IT and operations!
              </p>
            </div>
            <div className="remarkable-points-container">
              <div className="remarkable-point-container">
                <div className="point-image">
                  <img src={Remarkable2} alt="remarkable-2" />
                </div>
                <div className="point-text">
                  <div className="point-main-text">More than 100</div>
                  <div className="point-sub-text">Leading Unicorns choose iimjobs for their management hiring</div>
                </div>
              </div>


              <div className="remarkable-point-container">
                <div className="point-image">
                  <img src={Remarkable1} alt="remarkable-1" />
                </div>
                <div className="point-text">
                  <div className="point-main-text">4 out of 5</div>
                  <div className="point-sub-text">Top MBA College Graduates like IIMs / XLRI / ISB and more are registered on iimjobs</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-4">
            <Login handleButtonClick={handleButtonClick}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recruiter;
