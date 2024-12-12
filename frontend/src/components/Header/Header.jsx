import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/components/_Header.scss";
import axios from "axios";
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode"; // Importar jwt_decode para decodificar el token
import Logo from '../../assets/img/logo.png'; // Ruta de la imagen

const Header = () => {
  const location = useLocation(); // Hook para obtener la ubicación actual
  const token = Cookies.get('token'); // Obtener token de las cookies

  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [userRole, setUserRole] = useState(null);

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
  const isHomeRoute = location.pathname === "/"; // Verificar si estamos en la página principal (ruta /)

  return (
    <>
      <header className="navbar">
        <img className="logo" src={Logo} alt="Federacion estatal LGTBI+" />
        <div className="nav-items">
          <button className="button">
            <Link to="/" className="link">Home</Link>
          </button>

          {/* Mostrar el botón de Dashboard solo si no estamos en la ruta / */}
          {!isHomeRoute && (
            <button className="button">
              <Link to="/admin/profile" className="link">Dashboard</Link>
            </button>
          )}

          {/* Mostrar Logout solo si estamos autenticados */}
          {isAuthenticated && (
            <button onClick={handleLogout} className="button">Logout</button>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
