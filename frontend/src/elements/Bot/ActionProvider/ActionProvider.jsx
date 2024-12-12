
import React, { useState } from "react";
import { API_URL } from '../../../config/config.js';
import { createChatBotMessage, createClientMessage } from 'react-chatbot-kit';
import { realizarInserccion } from '../../../servicios/interacciones.services.js';
import { getModelAnswer } from '../../../servicios/modelAnswer.services.js';

let perfil = 0;

const ActionProvider = ({ createChatBotMessage, setState, children }) => {

	const [tipoPerfil, setTipoPerfil] = useState("");

	// limpia todos los mensajes actuales
	const clearChat = () => {
		setState((prevState) => ({
			...prevState,
			messages: []
		}));
	};

	const handleSaludo = () => {
		const botMessageSaludo = createChatBotMessage('Hola. Encantada de atenderte');

		setState((prev) => ({
			...prev,
			messages: [...prev.messages, botMessageSaludo],
		}));
	};

	const addMessageToBot = (messageContent) => {
		const newMessage = createChatBotMessage(messageContent);

		// Añadir el mensaje a la lista de mensajes del chatbot
		setState(prevState => ({
			...prevState,
			messages: [...prevState.messages, newMessage]
		}));
	}

	const handleStartOptions = () => {
		const botMessage = createChatBotMessage("Selecciona una opción:", {
			widget: "startOptions",
		});

		setState((prev) => ({
			...prev,
			messages: [...prev.messages, botMessage],
		}));
	};

	// formulario para usuarios
	const handleUserForm = () => {
		const botMessage = createChatBotMessage("Formulario para usuarios:", {
			widget: 'showUserForm',
		});

		setState((prev) => ({
			...prev,
			messages: [...prev.messages, botMessage],
		}));
	};

	// formulario para profesionales
	const handleProfesionalForm = () => {
		const botMessage = createChatBotMessage("Formulario para profesionales:", {
			widget: 'showProfesionalForm', // Cambia el widget para que muestre el formulario de profesionales
		});

		setState((prev) => ({
			...prev,
			messages: [...prev.messages, botMessage],
		}));
	};

	// Recibimos los datos enviados por
	// el formulario de usuarios o profesionales
	const handleActionSubmit = (tipoFormulario, idPerfil) => {
		clearChat();

		const botMessage = createChatBotMessage("Gracias por enviar el formulario de " + tipoFormulario, {
			widget: 'formConfirmationWidget',
		});

		setState((prev) => ({
			...prev,
			messages: [...prev.messages, botMessage],
		}));

		if (tipoFormulario === "usuario") {
			handleOptionSelection(1, "", false, idPerfil);
		} else if (tipoFormulario === "profesional") {
			handleOptionSelection(6, "", false, idPerfil);
		}
	};

	let currentQuestionId = 1; // Inicializamos el ID de la primera pregunta

	const handleOptionSelection = async (option, texto, fin, idPerfil, idPregunta, idRespuesta) => {

		if (option === "profesional") {
			// Mostrar el formulario de profesional al pulsar el botón correspondiente
			handleProfesionalForm();
			setTipoPerfil("profesional");
			return;

		} else if (option === "usuario") {
			// Mostrar el formulario de usuario al pulsar el botón correspondiente
			handleUserForm();
			setTipoPerfil("usuario");
			return;

		} else if (option) {
			perfil = idPerfil;
			console.log("EN OPTION perfil es=", perfil)
			currentQuestionId = option; // Asignar el valor de `nextQuestion`
		} else {
			throw new Error("No se encontró un valor válido para currentQuestionId");
		}

		// si existe idPregunta
		// insertamos todas las pulsaciones en la tabla 'interacciones'
		if (idPregunta) {
			try {
				const nuevaInserccion = await realizarInserccion(tipoPerfil, idPerfil, idPregunta, idRespuesta);
				console.log("Interacción realizada correctamente:", nuevaInserccion);
			} catch (error) {
				console.error("Error al realizar la interacción:", error.message);
			}
		}

		// Estructura jerárquica de opciones dinamicas
		// que se rellenan mediante fetch
		const optionsMap = {
			datos: {
				pregunta: "",
				respuestas: [],
				fin: "",
			}
		};

		// USUARIO 
		// mensaje final. NO hay mas preguntas
		if (fin == true) {

			// Mostrar mensaje del usuario reflejando la selección
			const userMessage = createClientMessage(`He seleccionado:`, {
				widget: 'showHTML',
				payload: { customHTML: texto }, // Aquí se pasa el payload al widget
				delay: 500,
			});

			setState((prevState) => ({
				...prevState,
				messages: [...prevState.messages, userMessage],
			}));

			// Ejecutar un fetch a modelAnswer.services
			try {
				const respuesta = await getModelAnswer(tipoPerfil);
				//console.log("Respuesta ModelAnswer obtenida correctamente:", respuesta);

				const finalMessageModel = createChatBotMessage(respuesta);
				setState((prevState) => ({
					...prevState,
					messages: [...prevState.messages, finalMessageModel],
				}));

				// Una vez obtenido el fetch, mostrar el mensaje final
				const finalMessage = createChatBotMessage("Gracias por tu atención.");
				setState((prevState) => ({
					...prevState,
					messages: [...prevState.messages, finalMessage],
				}));

				// Mostrar opciones finales al usuario
				const botMessageFinalOptions = createChatBotMessage("¿Deseas realizar alguna consulta más?", {
					widget: "wg_finalOptionsButtons",
					payload: {
						options: {
							tPerfil: tipoPerfil,
							iPerfil: perfil
						}
					},
					delay: 500,
				});
				setState((prevState) => ({
					...prevState,
					messages: [...prevState.messages, botMessageFinalOptions],
				}));

			} catch (error) {
				console.error("Error al obtener la respuesta del modelAnswer:", error.message);
			}
			return;
		}


		// USUARIO 
		// mensaje informativo sonre lo que ha pulsado el usuario
		if (texto !== "") {
			// Mostrar mensaje del usuario reflejando la selección
			const userMessage = createClientMessage(`He seleccionado:`, {
				widget: 'showHTML',
				payload: { customHTML: texto }, // Aquí se pasa el payload al widget
				delay: 500,
			});
			//console.log("userMessage", userMessage); // Agrega el mensaje al flujo de chat

			setState((prevState) => ({
				...prevState,
				messages: [...prevState.messages, userMessage],
			}));
		}

		async function obtenerRespuestasPorPregunta(option) {
			try {
				//console.log("id_pregunta=", option)
				const response = await fetch(`${API_URL}api/preguntas/pr/${option}`);
				if (!response.ok) {
					throw new Error("Error al obtener las respuestas");
				}
				const respuestas = await response.json();

				currentQuestionId++

				return respuestas.map((res) => ({
					id_pregunta: option,
					pregunta: res.pregunta,
					nextQuestion: currentQuestionId++,
					tPerfil: tipoPerfil,
					idPerfil: perfil,
					id_respuesta: res.respuesta_id,
					texto: res.respuesta,
					fin: res.fin,
				}));
			} catch (error) {
				console.error("Hubo un error:", error);
				return [];
			}
		}

		// Actualizamos las respuestas dinámicas según la pregunta actual
		const nuevosDatos = await obtenerRespuestasPorPregunta(option);
		//console.log("nuevosDatos", nuevosDatos);

		if (nuevosDatos.length > 0) {
			optionsMap.datos.pregunta = nuevosDatos[0].pregunta;
			optionsMap.datos.respuestas = nuevosDatos;

			const botMessage = createChatBotMessage(optionsMap.datos.pregunta, {
				widget: "dynamicOptions",
				payload: { options: optionsMap.datos.respuestas },
				delay: 500,
			});

			setState((prevState) => ({
				...prevState,
				messages: [...prevState.messages, botMessage],
			}));
		} else {
			const finalMessage = createChatBotMessage("Fin de la información.");
			setState((prevState) => ({
				...prevState,
				messages: [...prevState.messages, finalMessage],
			}));

			const ayudaMessage = createChatBotMessage("¿Quieres hacer alguna consulta más?");
			setState((prevState) => ({
				...prevState,
				messages: [...prevState.messages, ayudaMessage],
			}));
		}
	};

	return (
		<div>
			{React.Children.map(children, (child) => {
				return React.cloneElement(child, {
					actions: {
						clearChat, // limpia los mensajes actuales del chat

						handleSaludo,

						handleStartOptions, // muestra los botones de usuario y profesional

						handleUserForm, // muestra el formulario de usuarios
						handleProfesionalForm, // muestra el formulario de profesionales

						handleActionSubmit, // recibe los datos de los formularios

						// funcion principal para la gestion de los datos
						handleOptionSelection,
					},
				});
			})}
		</div>
	);
};

export default ActionProvider;
