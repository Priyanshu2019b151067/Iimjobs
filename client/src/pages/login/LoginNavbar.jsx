import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import Logo from '../../images/iimjobs.svg'
import './loginNavbar.css'
// icons
import { TiDownload } from "react-icons/ti";
import { FaChevronRight } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";

import { Link } from 'react-router-dom';

function LoginNavbar() {
  return (
    <div className='container'>
       <Navbar bg="white" variant="white" sticky="top" style={{}}>
      <Navbar.Brand as={Link} to={'/'}>
        <img src={Logo} alt='iimjobs logo' style={{width:'6rem'}}/>
      </Navbar.Brand>

      
      <Nav className='nav-right'>
        <button className='nav-button-design'>
        <Nav.Link as={Link}  to={'/download'} className='button-text-color' >
           <TiDownload style={
            {
              fontSize: '26px',
              paddingBottom: '4px'
            }
           }/>
            Download App <FaChevronRight style={{
              fontSize : '11px'
            }}  />

        </Nav.Link>
        </button>
        <button className='nav-button-design'>
        <Nav.Link as={Link}  to={'/recruiter'} className='button-text-color' >
            Recruiter Login 
            <CiLogin style={
               {
                fontSize: '26px',
                paddingBottom: '4px'
              }
            }/>

        </Nav.Link>
        </button>
      </Nav>
    </Navbar>
    </div>
   
  )
}

export default LoginNavbar