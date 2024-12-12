
import { INTERACTIONS_URL } from '../config/config.js';

// insertamos datos en la tabla
async function getModelAnswer(tp) {
    
	//const url = "https://felgtbi-the-bridge.onrender.com/add_interaction";
    const url = `${INTERACTIONS_URL}/model_answer_${tp}`;

	try {
		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			},
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
    getModelAnswer 
};