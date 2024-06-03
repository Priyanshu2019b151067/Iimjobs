import { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import LoginNavbar from './components/LoginNavbar';
import RecruiterPage from './pages/recruiter/index';
import DownloadPage from './pages/download';
function App() {

  return (
    <BrowserRouter>
      <Routes>
       <Route path='/' element={<LoginNavbar/>}></Route>
       <Route path='/recruiter' element={<RecruiterPage/>}></Route> 
       <Route path='/download' element={<DownloadPage/>}></Route> 
      </Routes>    
    </BrowserRouter>
  )
}

export default App
