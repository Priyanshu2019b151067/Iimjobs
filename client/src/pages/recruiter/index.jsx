import { useState } from 'react';
import React from 'react'
import RecruiterNavbar from './RecruiterNavbar';
import Signup from './Signup';

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

    </>
  )
}

export default Recruiter;