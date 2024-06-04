import { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import LoginNavbar from './pages/login/LoginNavbar';
import RecruiterPage from './pages/recruiter/index';
import DownloadPage from './pages/download';
import Signup from './pages/recruiter/Signup';

function App() {

  return (
    <BrowserRouter>
      <Routes>
       <Route path='/' element={<LoginNavbar/>}></Route>
       <Route path='/recruiter' element={<RecruiterPage/>}></Route> 
       <Route path='/download' element={<DownloadPage/>}></Route> 
       <Route path='/signup' element= {<Signup/>} ></Route> 
      </Routes>    
    </BrowserRouter>
  )
}

export default App
