import { useState } from 'react';
import React from 'react'
import RecruiterNavbar from './RecruiterNavbar';
import Signup from './Signup';
import Login from './Login';

function Recruiter() {
  const [showSignup, setShowSignup] = useState(false);
  const handleButtonClick = () => {
    setShowSignup(true);
  };

  const handleClose = () => {
    setShowSignup(false);
  };
  return (
    <>
      <RecruiterNavbar handleButtonClick = {handleButtonClick}/>
      {showSignup && <Signup onClose={handleClose} />}
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-7'>
            Styles
          </div>
          <div className='col-5'>
            <Login/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Recruiter;