import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/components/_Header.scss";
import LoginForm from "./LoginForm";
import axios from "axios";
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode"; // Importar jwt_decode para decodificar el token
import Logo from '../../assets/img/logo.png'; // Ruta de la imagen

const Header = () => {
  const location = useLocation(); // Hook para obtener la ubicación actual
  const token = Cookies.get('token'); // Obtener token de las cookies

  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [userRole, setUserRole] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  // Decodificar el token y establecer el rol del usuario
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        setIsAuthenticated(true);
        setUserRole(decodedToken.rol); // Establecer el rol del usuario desde el token
      } catch (err) {
        console.error("Error al decodificar el token:", err);
        setIsAuthenticated(false);
        setUserRole(null);
      }
    }
  }, [token]);

  const handleLogin = () => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        setIsAuthenticated(true);
        setUserRole(decodedToken.rol); // Actualizar rol tras iniciar sesión
        window.location.reload(); // Recargar la página después del login
      } catch (err) {
        console.error("Error al decodificar el token durante login:", err);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/api/auth/logout");
      Cookies.remove('token');
      setIsAuthenticated(false);
      setUserRole(null); // Limpiar rol del usuario tras cerrar sesión
      window.location.reload(); // Recargar la página después del logout
    } catch (err) {
      console.error("Error en el logout:", err);
    }
  };

  const isAdminRoute = location.pathname.startsWith("/admin"); // Verificar si la ruta actual empieza con /admin

  return (
    <>
      <header className="navbar">
        <img className="logo" src={Logo} alt="Federacion estatal LGTBI+" />
        <div className="nav-items">
          <button className="button">
            <Link to="/" className="link">Home</Link>
          </button>
          {/* Mostrar contenido solo si es una ruta de administrador */}
          {isAdminRoute && (
            <>
              {isAuthenticated && userRole === "admin" ? (
                <>
                  <button className="button">
                    <Link to="/admin/profile" className="link">Dashboard</Link>
                  </button>
                  <button onClick={handleLogout} className="button">Logout</button>
                </>
              ) : (
                <button onClick={() => setShowLogin(true)} className="button">
                  Login
                </button>
              )}
            </>
          )}
        </div>
      </header>
      {/* Mostrar LoginForm si showLogin es true */}
      {showLogin && (
        <LoginForm onClose={() => setShowLogin(false)} onLogin={handleLogin} />
      )}
    </>
  );
};

export default Header;
