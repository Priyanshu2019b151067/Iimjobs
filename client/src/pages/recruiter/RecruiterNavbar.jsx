import React, { useState } from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import Logo from '../../images/iimjobs.svg'
import './recruiterNavbar.css'
// icons
import { FaRegHandPointRight } from "react-icons/fa";


import { Link } from 'react-router-dom';

function RecruiterNavbar({handleButtonClick}) {
  return (
    <div className='container'>
       <Navbar bg="white" variant="white" sticky="top" style={{}}>
      <Navbar.Brand as={Link} to={'/'}>
        <img src={Logo} alt='iimjobs logo' style={{width:'6rem'}}/>
      </Navbar.Brand>
      <Nav className='nav-right'>
        <Nav.Link as={Link}  to={'/'} className='link-adjustment' >
          Looking for job ?
        </Nav.Link>
        <button className='nav-button-design' onClick={handleButtonClick}>
        <Nav.Link  className='button-text-color' >
            Sign Up
            <FaRegHandPointRight style={{
              fontSize : '20px',
              marginLeft : '4px',
              paddingBottom : '3px'
            }} />
        </Nav.Link>
        </button>
      </Nav>
    </Navbar>
    </div>
   
  )
}

export default RecruiterNavbar;