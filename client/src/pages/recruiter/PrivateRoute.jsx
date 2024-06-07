import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = useSelector((state) => state.recruiter.token);
  const data = useSelector((state) => state.recruiter.recruit);
  if (!token || !data) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
