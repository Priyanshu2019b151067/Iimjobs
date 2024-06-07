import React, { useEffect, useState } from 'react';
import './Signup.css';
import CloseImage from '../../images/close.png'
import { FaRegBuilding } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import axios from 'axios';
import { IoIosAddCircleOutline } from "react-icons/io";
import {useDispatch, useSelector} from 'react-redux'
import { setRegister } from '../../state/recruiter';
import { useNavigate } from 'react-router-dom';


function Signup({ onClose }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const state  = useSelector((state) => state);
    // useDispatch
    // console.log(state);
    const [companyChecked, setcompanyChecked] = useState(false);
    const [consultantChecked, setconsultantChecked] = useState(false);
    const [passwordMatched, setpasswordMatched] = useState(true);
    const [phoneError, setphoneError] = useState('');
    const [allError,setallError] = useState('');
    const [companies,setCompanies] = useState([]);
    const [consultancy,setConsultancy] = useState([]);
    const [ifAdd,setifAdd] = useState(false);
  
    const handleButtonClick = (buttonNumber) => {
        //console.log(button)
        if (buttonNumber === 1) {
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
        repeatPassword : '',
        newOrg : ''
  })    


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
  },[]);


  const handleformSubmit = async (e)=>{
      e.preventDefault();
      console.log('here also')
      if(signupData.fullName === '' || signupData.location === '' || signupData.designation === '' ||
      signupData.email === ''  || signupData.password === '' || signupData.phone === '' || signupData.organization === ''
  ){
      setallError('Please fill all the value.')
      return;
  }
  setallError('');
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
        type : (companyChecked ? 'Company' : 'Consultant'),
        entityId : signupData.organization
    }
    
    try {
        const response = await axios.post('http://localhost:3000/recruiter/register',data);
        console.log(response.data.newRecuiter);
        console.log(response.data.token);

        if(response.status === 201){
            dispatch(setRegister({
                recruit : response.data.newRecuiter,
                token : response.data.token
            }))
            navigate('/welcome')
            clearFields();
        }
    } catch (error) {
       setallError(error.response.data.error);
    }
}


 const clearFields = ()=>{
    setsignupData({
        fullName : '',
        location : '',
        phone : '',
        email : '',
        organization : '',
        password : '',
        designation : '',
        repeatPassword : ''
    })
 }
  const handleChange = (e) => {
    const  {name,value} = e.target;
    if(name === 'phone'){
        if (!/^\d*$/.test(value)) {
            setphoneError('Only numbers are allowed.');
            return;
        }
        if (value.length > 10) {
            setphoneError('Phone number cannot exceed 10 digits.');
            return;
        }
    }
    //console.log(name,value);
    setphoneError('');
    setsignupData({...signupData,[name] : value});
  }
  const handleAdd = ()=>{
    if(companyChecked === false && consultantChecked === false){
        setallError('Please select org type.');
        return;
    }
    setifAdd(true);
  }

  const addOrg = async ()=>{
    if(companyChecked === false && consultantChecked === false){
        setallError('Please select org type.');
        return;
    }else if(companyChecked){
        try {
           const data = {name : signupData.newOrg}
           const response = await axios.post('http://localhost:3000/company/create',data);
           if(response.status === 201){
               setCompanies(response.data.allCompany);
               setsignupData({
                ...signupData,
                organization : response.data.newCompany._id
               })
               setallError('');
               setifAdd(false);
           }
        //    console.log(response.data.allCompany)
        } catch (error) {
            setallError(error.response.data.error)
        }
    }else{
        try {
            const data = {name : signupData.newOrg}
            const response = await axios.post('http://localhost:3000/consultant/create',data);
            if(response.status === 201){
                setConsultancy(response.data.allConsultant);
                setsignupData({
                 ...signupData,
                 organization : response.data.newConsultancy._id
                })
                setallError('');
                setifAdd(false);
            }
         //    console.log(response.data.allCompany)
         } catch (error) {
             setallError(error.response.data.error)
         }
    }
  }
 const organization = ifAdd  ?   <>
 <label htmlFor="newOrg">Add Organization</label>
 <input type='text' id='newOrg' name='newOrg' placeholder='Type org Name' className='input-style' value={signupData.newOrg} onChange={handleChange} style={{width : '80%'}}/>
  <button type='button' className='add-org-btn' onClick={addOrg}>Add</button>

 </> : <>
 <label htmlFor="organization">Organization</label>
 <select id='organization' name='organization' className='input-style' value={signupData.organization} onChange={handleChange} style={{width : '85%'}} >
                <option value="" >Select an option</option>
                {
                    options.map((option) =>(
                        <option key={option._id} value={option._id} >
                            {option.name}
                        </option>
                    ))
                }

            </select>
            
            <IoIosAddCircleOutline fontSize='36px' style={{margin : '4px',paddingBottom : '4px',cursor :'pointer'}}  onClick={handleAdd}/>
 </>;

  return (
    <div className="signup-overlay">
        <img src={CloseImage} alt="closeButton"   onClick={onClose} className='close-button-new'/>
      <div className="signup-container">

        <p className='register-text-heading'>Post a job for free</p>
        <p className='register-text-subheader'>Register,post a job and easily find great talent for your company or clients!</p>
        <form onSubmit={handleformSubmit}>
          <div className='row'>
            <div className='col-6'>
                <button type='button' className='type-btn' onClick={()=>handleButtonClick(1)}
                style={{ border: companyChecked ? '2px solid darkgreen' : '' }}
                >
                    <FaRegBuilding fontSize='23px' style={{
                        margin :'4px',
                        paddingBottom :'4px'
                    }} />
                I am a Company</button>
              

            </div>
            <div className='col-6'>
                <button type='button' className='type-btn' onClick={()=>handleButtonClick(2)} 
                style={{ border: consultantChecked ? '2px solid darkgreen' : '' }}
                >
                <CgProfile  fontSize='23px' style={{
                        margin :'4px',
                        paddingBottom :'4px'
                    }} />
                I am a Consultant</button>
              
            </div>
            <p className='error-password-recruiter' style={{
                color:'gray',
                textAlign : 'right'
            }}>Please select organization type.</p>
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
                <input type='text' id='phone' name='phone' value={signupData.phone} placeholder='e.g. 9873721034' className='input-style' onChange={handleChange}/>
                <p className='error-password-recruiter' style={{
                color:'gray'
            }}>{phoneError}</p>
            </div>
            <div className='col-6'>
            <label htmlFor="email">Work email id</label>
                <input type='email' id='email' name='email' value={signupData.email} placeholder='Your official email id (not gmail/yahoo)' className='input-style' onChange={handleChange}/>
            </div>

            <div className='col-6'>
            {/* <label htmlFor="organization">Organization</label> */}
            {/* need drop down lere */}
            {organization}
            {/* <select id='organization' name='organization' className='input-style' value={signupData.organization} onChange={handleChange} style={{width : '85%'}} >
                <option value="" >Select an option</option>
                {
                    options.map((option) =>(
                        <option key={option._id} value={option._id} >
                            {option.name}
                        </option>
                    ))
                }

            </select>
            
            <IoIosAddCircleOutline fontSize='23px' style={{margin : '4px',paddingBottom : '4px',cursor :'pointer'}}  onClick={handleAdd}/> */}
{/*             
            <label htmlFor="password">Password</label>
                <input type='password' id='password' name='password' placeholder='Set a password' className='input-style' value={signupData.password} onChange={handleChange}/> */}
            <p className='error-password-recruiter' style={{
                color:'gray',
            }}>Add if organization not in list.</p>
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
            <p className='error-password-recruiter'>{allError}</p>
            <button type='submit' className='sign-up-btn-recruiter' onSubmit={handleformSubmit}>Register</button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
