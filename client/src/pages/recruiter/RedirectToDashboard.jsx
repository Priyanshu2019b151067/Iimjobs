import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const RedirectToDashboard = ({ children }) => {
  const token = useSelector((state) => state.recruiter.token);
  const data = useSelector((state) => state.recruiter.recruit);

  if (token && data) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RedirectToDashboard;
