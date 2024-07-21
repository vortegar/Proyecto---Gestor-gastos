// ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContextProvider';
const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/" />;
};

export default ProtectedRoute;
