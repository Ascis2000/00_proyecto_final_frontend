import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    // Mostrar un estado de carga mientras se verifica la autenticación
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    // Redirigir a la página de inicio si el usuario no está autenticado
    return <Navigate to="/" replace />;
  }

  // Renderizar los hijos si el usuario está autenticado
  return children;
};

export default ProtectedRoute;
