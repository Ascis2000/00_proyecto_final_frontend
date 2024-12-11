
import { INTERACTIONS_URL } from '../config/config.js';

// insertamos datos en la tabla
async function realizarInserccion(tp, id_perfil, iP, iR) {
    
	//const url = "https://felgtbi-the-bridge.onrender.com/add_interaction";
    const url = `${INTERACTIONS_URL}/add_interaction`;

	const data = {
		tipo: tp,
		interactor_id: id_perfil,
		pregunta_id: iP,
		respuesta_id: iR
	};

	console.log("DATA en fetch=", data)

	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data),
			credentials: "include"
		});

		if (!response.ok) {
			throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
		}

		const resultado = await response.json();
		console.log("Respuesta del servidor:", resultado);
		return resultado;
	} catch (error) {
		console.error("Ocurrió un error:", error);
		throw error;
	}
}

export { 
    realizarInserccion 
};