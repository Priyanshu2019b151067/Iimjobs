import { React, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function VerifyEmail() {
  const query = useQuery();
  const token = query.get("token");
  const [error,setError] = useState(false);
 
  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/verify/verify-email?token=${token}`
        );
      } catch (error) {
        setError(true);
    }
    };
    if (token) {
      verifyEmail();
    } else {
      setMessage("Invalid verification link.");
    }
  }, [token]);
  const renderedMessage = (error ? <p>verification failed.Please try again.</p> : <p>Email verified successfully ! You can now <Link to={"/recruiter"}>login.</Link></p>)
  return (
    <div className="container">
      <div className="card p-5">
        <h1>Email Verification</h1>
        {renderedMessage}
      </div>
    </div>
  );
}

export default VerifyEmail;
