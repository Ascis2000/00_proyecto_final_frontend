
import React, { useContext, useState, useEffect } from 'react';

import { Link } from "react-router-dom";
import utilsToken from "../../../utils/token.js";
import { AuthContext } from "../../../context/AuthContext";
import { API_URL } from '../../../config/config.js';

const Home = () => {

    console.log('API_URL:', API_URL);

	// desestructuración de la variable de contexto AuthContext
	const { isAuthenticated, user, loading, error } = useContext(AuthContext);

	// llamamos al serviceMovies utilizando 'isAuthenticated && user'
	useEffect(() => {

		const fetchInicio = async () => {
			try {
				const response = await fetch(`${API_URL}`, {
				//const response = await fetch(`http://localhost:3000/`, {
					method: "GET",
					headers: { "Content-Type": "application/json" },
				});
	
				const data = await response.json();
				console.log("data", data)
			
			} catch (err) {
				console.error("HOME: Error al obtener API:", err);
			}
		};

		fetchInicio();
	}, [isAuthenticated, user]);
	
	return (
		<div className="home">
			{
				/* isAuthenticated ? (
					<>
						<h2>Usuario: {user?.nombre}</h2>
						<p>Tu tipo de rol actual es:
							{
								user?.role == 1 ? " No Premium" :
								user?.role == 2 ? " Premium" : " Admin"
							}
						</p>
					</>
				) : (
					<>
						<div>
							<h2>Bienvenid@ al Proyecto Final</h2>
						</div>
					</>
				) */
			}
		</div>
	);
};

export default Home;