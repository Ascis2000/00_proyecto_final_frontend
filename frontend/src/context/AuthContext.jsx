import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Almacenar los datos del usuario
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        const adminRole = decodedToken.rol === "admin";
        if (adminRole) {
          setIsAuthenticated(true);
          setUser(decodedToken); // Decodificar y guardar datos del usuario
        }
      } catch (err) {
        console.error("Error al decodificar el token:", err);
      }
    }
    setLoading(false); // Finalizar la carga en cualquier caso
  }, []);

  const login = (token) => {
    Cookies.set("token", token, { path: "/" });
    setIsAuthenticated(true);
    setUser(jwt_decode(token)); // Decodificar y guardar datos del usuario
  };

  const logout = () => {
    Cookies.remove("token", { path: "/" });
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
