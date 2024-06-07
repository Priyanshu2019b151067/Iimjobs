import React, { useRef, useState ,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import WelcomeNavbar from './WelcomeNavbar' 
import './welcomeNavbar.css'
import { useNavigate } from 'react-router-dom'
import { setLogout } from '../../state/recruiter'
import { CiLogout } from "react-icons/ci";

const Popup = ({onClose}) =>{
    const state = useSelector((state) => state);
    console.log(state);
    //const popupRef = useRef(null);
    const navigate =  useNavigate();
    const dispatch = useDispatch();

    const logout = () =>{
        dispatch(setLogout());
        navigate('/recruiter');
    }
    return (
        <div className='pop-up-overlay'>
          <div>
            <p className='name-style'>{state.recruiter.recruit.fullName}</p>
            <p className='email-style'>{state.recruiter.recruit.email}</p>
            <button onClick={logout} className='pop-up-botton'>
            <CiLogout />Logout</button>
          </div>
        </div>
      );
}

function Welcome() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const togglePopup = () => {
      setIsPopupOpen(!isPopupOpen);
    };
  return (
    < >
        <WelcomeNavbar togglePopup={togglePopup}/>
        <div className='container'>
            {isPopupOpen && <Popup onClose={togglePopup} />}
        </div>
    </>
  )
}

export default Welcome