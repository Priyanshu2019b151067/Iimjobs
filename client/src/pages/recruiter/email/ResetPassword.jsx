import { React, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import axios from "axios";
import "../recruiterNavbar.css";
import { Card } from "react-bootstrap";
function ResetPassword() {
  const navigate = useNavigate();
  const [passState,setpassState] = useState({
    password : '',
    repeatPassword : ''
  });
  const [enteredPass,setenteredPass] = useState(false);
  const [error,setError] = useState('');
  
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const token = query.get("token");
  const email = query.get("email");
  if(!token || !email){
    navigate('/error');
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(passState.password === '' || passState.repeatPassword === ''){
        setError('Please enter your password.');
        return;
    }
    if(passState.password !== passState.repeatPassword){
        setError('The new password and confirm password do not match');
        return;
    }
    setError('');
    const data  = {
        token,
        email,
        password : passState.password
    }
    console.log(data)
    try {
      const response = await axios.post('http://localhost:3000/verify/reset-password',data);
      if(response.status === 200){
        setenteredPass(true);
      }
      
    } catch (error) {
        setError(error.response.data.message);
    }
  };
  const handleChange = (e) => {
    const {name,value} = e.target;
    setpassState({...passState,[name] : value});
  }
  return (
    <>

     <Navbar  bg="dark" data-bs-theme = "dark">
        <Container>
          <Navbar.Brand>iimjobs.com</Navbar.Brand>
        </Container>
      </Navbar>
    
    <div className="container m-5">
      <div className="row m-2 p-2">
        <div className="col-6 p-4">
          <div>
            {enteredPass ?<Card>
                <p>The password has been reset.You can <Link to='/recruiter' replace={true} style={{
                    textDecoration : 'none'
                } }>login</Link> now.</p>
            </Card> :
            <div>
              <h2>Reset your Password</h2>
              <p>Choose a new password for your account with email id</p>
              <p>{email}</p>
           
           
            <div>
              <form onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="password"
                    style={{
                      fontSize: "14px",
                    }}
                  >
                   New Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={passState.password}
                    placeholder="Password"
                    className="input-style"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="repeatPassword"
                    style={{
                      fontSize: "14px",
                    }}
                  >
                  Confirm  Password
                  </label>
                  <input
                    type="password"
                    id="repeatPassword"
                    name="repeatPassword"
                    value={passState.repeatPassword}
                    placeholder="Confirm Password"
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
              onSubmit={handleSubmit}
            >
              Reset
            </button>
              </form>
            </div>
            </div>}
          </div>
        </div>
        <div className="col-6"></div>
      </div>
    </div>
    </>
  );
}

export default ResetPassword;
