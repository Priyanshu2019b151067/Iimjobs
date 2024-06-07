import { useEffect, useState } from 'react'
import {BrowserRouter,Routes,Route, useNavigate} from 'react-router-dom'
import './App.css'
import LoginNavbar from './pages/login/LoginNavbar';
import RecruiterPage from './pages/recruiter/index';
import DownloadPage from './pages/download';
import Signup from './pages/recruiter/Signup';
import Welcome from './pages/recruiter/Welcome';
import VerifyEmail from './pages/recruiter/VerifyEmail';
import DashBoard from './pages/recruiter/home/index'
import PrivateRoute from './pages/recruiter/PrivateRoute';
import RedirectToDashboard from './pages/recruiter/RedirectToDashboard';
import { useSelector } from 'react-redux';

const RedirectHandler = () => {
  const token = useSelector((state) => state.token);
  const data = useSelector((state) => state.recruit);
  const navigate = useNavigate();
  

  useEffect(() => {
    if (token && data) {
      navigate('/dashboard', { replace: true });
    }
  }, [token, data, navigate]);

  return null; 
};

function App() {

  return (
    <BrowserRouter>
    <RedirectHandler/>
      <Routes>
       <Route path='/' element={<RedirectToDashboard><LoginNavbar/></RedirectToDashboard>}></Route>
       <Route path='/recruiter' element={<RedirectToDashboard><RecruiterPage/></RedirectToDashboard>}></Route> 
       <Route path='/download' element={<RedirectToDashboard><DownloadPage/></RedirectToDashboard>}></Route> 
       <Route path='/signup' element= {<RedirectToDashboard><Signup/></RedirectToDashboard>} ></Route> 
       <Route path='/welcome' element ={<RedirectToDashboard><Welcome/></RedirectToDashboard>} ></Route>
       <Route path='/verify-email' element = {<VerifyEmail/>} ></Route>
        {/* Protected Routes */}
        <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashBoard />
              </PrivateRoute>
            }
          />
          {/* Add more protected routes here */}
      </Routes>    
    </BrowserRouter>
  )
}

export default App 
