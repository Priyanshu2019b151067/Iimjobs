import { useEffect } from "react";
import React from 'react'
import { useSelector } from "react-redux";

function index() {
  
    useEffect(() => {
        // Clear all the previous history
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = () => {
          window.history.pushState(null, null, window.location.href);
        };
      }, []);
  return (
    <div>SEXY</div>
  )
}

export default index