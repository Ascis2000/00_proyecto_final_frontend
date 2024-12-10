import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAdmin } from '../../utils/auth';

const PrivateRoute = () => {
  // Verificar si el usuario tiene el rol admin
  const isAuthenticated = isAdmin();

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
