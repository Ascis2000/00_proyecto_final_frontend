import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

// Función para obtener el token desde la cookie y decodificarlo
const getDecodedToken = () => {
    const token = Cookies.get('token'); // Obtiene el token de la cookie 'token'

    if (!token) {
        return null; // Si no hay token, retorna null
    }

    try {
        // Decodificar el token
        const decoded = jwtDecode(token);
        return decoded;
    } catch (error) {
        console.error('Error decodificando el token:', error);
        return null; // Si no puede decodificar, retorna null
    }
};

// Verificar si el usuario tiene rol admin
const isAdmin = () => {
    const decodedToken = getDecodedToken();
    return decodedToken && decodedToken.rol === 'admin'; // Verifica si el rol es 'admin'
};

export { isAdmin };