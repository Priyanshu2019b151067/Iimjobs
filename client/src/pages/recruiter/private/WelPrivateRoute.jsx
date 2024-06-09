import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const recruiter = useSelector((state) => state.welcome.recruiter);
  
  if (recruiter === null) {
    return <Navigate to="/recruiter" replace />;
  }

  return children;
};

export default PrivateRoute;
