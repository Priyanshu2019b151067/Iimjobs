import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import Logo from "../../images/iimjobs.svg";
// icons
import { TiDownload } from "react-icons/ti";
import { FaChevronRight } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import "./welcomeNavbar.css";
import { FaPhoneAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
function WelcomeNavbar({togglePopup}) {
  const state = useSelector((state) => state);

  


  
  return (
    <div className="container-fluid">
      <Navbar bg="white" variant="white" sticky="top">
        <Navbar.Brand as={Link} to={"/"}>
          <img src={Logo} alt="iimjobs logo" style={{ width: "6rem" }} />
        </Navbar.Brand>

        <Nav className="nav-right">
          <p className="sales-text">
            Sales Enquiries(9:30 AM to 6:30 PM)
            <br />
            <span className="sales-phone">
              <FaPhoneAlt
                style={{
                  fontSize: "19px",
                  paddingBottom: "4px",
                  margin: "4px",
                }}
              />
              1800-103-7344
            </span>
          </p>
          <Nav.Link onClick={togglePopup}>
            <CgProfile
              style={{
                fontSize: "40px",
                paddingBottom: "4px",
                marginLeft: "10px",
              }}
            />
          </Nav.Link>
        </Nav>

        {/* <Nav className='nav-right'> */}

        {/* <button className='nav-button-design'>
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
        </button> */}
        {/* </Nav> */}
      </Navbar>
    </div>
  );
}

export default WelcomeNavbar;
