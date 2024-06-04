import React, { useEffect, useState } from 'react';
import './Signup.css';
import CloseImage from '../../images/close.png'
import { FaRegBuilding } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import axios from 'axios';
function Signup({ onClose }) {
    
    const [companyChecked, setcompanyChecked] = useState(false);
    const [consultantChecked, setconsultantChecked] = useState(false);
    const [passwordMatched, setpasswordMatched] = useState(true);

    const handleButtonClick = (button) => {
        if (button === 1) {
          setcompanyChecked(true);
          setconsultantChecked(false);
        } else {
          setcompanyChecked(false);
          setconsultantChecked(true);
        }
        //console.log(button1Checked,button2Checked)
      };
    // type,
    // entityId
  
  const [signupData,setsignupData] = useState({ 
        fullName : '',
        location : '',
        phone : '',
        email : '',
        organization : '',
        password : '',
        designation : '',
        repeatPassword : ''
  })    

  const [companies,setCompanies] = useState([]);
  const [consultancy,setConsultancy] = useState([]);

  const options =  (companyChecked ? companies : (consultantChecked ? consultancy : []));
  useEffect(()=>{
    const getCompanyNConsultancy = async() =>{
        try {
            const response = await axios.get('http://localhost:3000/recruiter/all');
            setCompanies(response.data.companies);
            setConsultancy(response.data.consultancy);
         
        } catch (error) {
            console.log(error);
        }
    }   
    getCompanyNConsultancy();
  },[])
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(signupData.password !== signupData.repeatPassword){
        setpasswordMatched(false);
        return;
    }
    setpasswordMatched(true);
    const data = {fullName : signupData.fullName,
        location : signupData.location,
        phone : signupData.phone,
        email : signupData.email,
        password : signupData.password,
        designation : signupData.designation,
        type : companyChecked ? 'Company' : 'Consultant',
        entityId : signupData.organization
    }
    console.log(data);
    
    // password : hashPassword,
    // phone,
    // location,
    // designation,
    // type,
    // entityId
    const response = await axios.post('http://localhost:3000/recruiter/register',data);
    console.log(response.data);
}



  const handleChange = (e) => {
    const  {name,value} = e.target;
    //console.log(name,value);
    setsignupData({...signupData,[name] : value});
  }
  return (
    <div className="signup-overlay">
        <img src={CloseImage} alt="closeButton" srcset=""  onClick={onClose} className='close-button-new'/>
      <div className="signup-container">

        <p className='register-text-heading'>Post a job for free</p>
        <p className='register-text-subheader'>Register,post a job and easily find great talent for your company or clients!</p>
        <form onSubmit={handleSubmit}>
          <div className='row'>
            <div className='col-6'>
                <button className='type-btn' onClick={()=>handleButtonClick(1)}
                style={{ border: companyChecked ? '2px solid darkgreen' : '' }}
                >
                    <FaRegBuilding fontSize='23px' style={{
                        margin :'4px',
                        paddingBottom :'4px'
                    }} />
                I am a Company</button>
            </div>
            <div className='col-6'>
                <button className='type-btn' onClick={()=>handleButtonClick(2)} 
                style={{ border: consultantChecked ? '2px solid darkgreen' : '' }}
                >
                <CgProfile  fontSize='23px' style={{
                        margin :'4px',
                        paddingBottom :'4px'
                    }} />
                I am a Consultant</button>
            </div>

            <div className='col-6'>
                <label htmlFor="fullName">Name</label>
                <input type='text' id='fullName' name='fullName' value={signupData.fullName} placeholder='Write your full name' className='input-style' onChange={handleChange}/>
            </div>
            <div className='col-6'>
            <label htmlFor="location">Location</label>
                <input type='text' id='location' name='location' value={signupData.location} placeholder='Write Location' className='input-style' onChange={handleChange} />
            </div>

            <div className='col-6'>
                <label htmlFor="phone">Phone</label>
                <input type='number' id='phone' name='phone' value={signupData.phone} placeholder='e.g. 9873721034' className='input-style' onChange={handleChange}/>
            </div>
            <div className='col-6'>
            <label htmlFor="email">Work email id</label>
                <input type='email' id='email' name='email' value={signupData.email} placeholder='Your official email id (not gmail/yahoo)' className='input-style' onChange={handleChange}/>
            </div>

            <div className='col-6'>
            <label htmlFor="organization">Organization</label>
            {/* need drop down lere */}
           
            <select id='organization' name='organization' className='input-style' value={signupData.organization} onChange={handleChange}>
                <option value="" >Select an option</option>
                {
                    options.map((option) =>(
                        <option key={option._id} value={option._id} >
                            {option.name}
                        </option>
                    ))
                }

            </select>
            </div>
            <div className='col-6'>
            <label htmlFor="designation">Designation</label>
                <input type='text' id='designation' name='designation' value={signupData.designation} placeholder='e.g. Talent Acquisition Manager' className='input-style' onChange={handleChange}/>
            </div>

            <div className='col-6'>
            <label htmlFor="password">Password</label>
                <input type='password' id='password' name='password' placeholder='Set a password' className='input-style' value={signupData.password} onChange={handleChange}/>
            </div>
            <div className='col-6'>
            <label htmlFor="repeatPassword">Confirm Password</label>
                <input type='password' id='repeatPassword' name='repeatPassword' placeholder='Re-enter password' className='input-style' value={signupData.repeatPassword} onChange={handleChange}/>
            {passwordMatched ?null : <p className='error-password-recruiter'>The password you entered do not match</p>}            
            </div>
            
            <button type='submit' className='sign-up-btn-recruiter' onSubmit={handleSubmit}>Register</button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
