import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/components/_Header.scss";
import LoginForm from "./LoginForm";
import axios from "axios";
import Cookies from 'js-cookie';
import Logo from '../../assets/img/logo.png'; // Ruta de la imagen



const Header = () => {
  const valor = Cookies.get('token');

  const [isAuthenticated, setIsAuthenticated] = useState(valor);
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = async () => {

    try {
      await axios.get("http://localhost:3000/api/auth/logout");

      setIsAuthenticated(false)
    } catch (err) {
      console.error("Error en el logout:", err);
    }
  };

  return (
    <>
      <header className="navbar">
      <img className ="logo" src={Logo} alt="Federacion estatal LGTBI+"/>
        <div className="nav-items">
          <button className="button"><Link to="/" className="link">Home</Link></button>
          {!isAuthenticated ? (
            <>
              <button onClick={() => setShowLogin(true)} className="button">
                Login
              </button>
            </>
          ) : (
            <>
              <button className="button"> <Link to="/admin" className="link">Dashboard</Link></button>
              <button  onClick={handleLogout} className="button">Logout</button>
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
