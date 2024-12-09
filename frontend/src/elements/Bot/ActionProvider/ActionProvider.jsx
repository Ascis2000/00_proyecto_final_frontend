
import React from 'react';
import { API_URL } from '../../../config/config.js';
import { createChatBotMessage, createClientMessage } from 'react-chatbot-kit';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {

	const handleHello = () => {
		const messageWithProperties = createChatBotMessage('Hola. Encantad@ de conocerteeee', {
			payload: {},
			delay: 500,
		});

		setState((prev) => ({
			...prev,
			messages: [...prev.messages, messageWithProperties],
		}));
	};

	const handleStartOptions = () => {
		const botMessage = createChatBotMessage("Selecciona una opción:", {
			widget: "startOptions",
		});

		setState((prev) => ({
			...prev,
			messages: [...prev.messages, botMessage],
		}));
	};

	const handleGetUsers = () => {
		const botMessage = createChatBotMessage("Aquí están los usuarios:", {
			widget: 'getUsers',
		});

		setState((prev) => ({
			...prev,
			messages: [...prev.messages, botMessage],
		}));
	};

	const handleUserForm = () => {
		const botMessage = createChatBotMessage("Formulario para usuarios:", {
			widget: 'showUserForm',
		});

		setState((prev) => ({
			...prev,
			messages: [...prev.messages, botMessage],
		}));
	};

	const handleUserSubmit = () => {
		const botMessage = createChatBotMessage("Gracias por enviar el formulario de usuario.", {
			widget: 'formConfirmationWidget',
		});

		setState((prev) => ({
			...prev,
			messages: [...prev.messages, botMessage],
		}));
	};

	const handleProfesionalForm = () => {
		const botMessage = createChatBotMessage("Formulario para profesionales:", {
			widget: 'showProfesionalForm', // Cambia el widget para que muestre el formulario de profesionales
		});

		setState((prev) => ({
			...prev,
			messages: [...prev.messages, botMessage],
		}));
	};

	const handleProfesionalSubmit = () => {
		const botMessage = createChatBotMessage("Gracias por enviar el formulario de profesional.", {
			widget: 'formConfirmationWidget',
		});

		setState((prev) => ({
			...prev,
			messages: [...prev.messages, botMessage],
		}));
	};

	let currentQuestionId = 1; // Inicializamos el ID de la primera pregunta
	const handleOptionSelection = async (option, texto) => {

		if (option === "profesional") {
			// Mostrar el formulario de profesional al pulsar el botón correspondiente
			handleProfesionalForm();
			return;
		} else if (option === "usuario") {
			// Mostrar el formulario de usuario al pulsar el botón correspondiente
			handleUserForm();
			return;
		} else if (option) {
			currentQuestionId = option; // Asignar el valor de `nextQuestion`
		} else {
			throw new Error("No se encontró un valor válido para currentQuestionId");
		}
	// const handleOptionSelection = async (option, texto) => {

	// 	if (option === "profesional") {
	// 		currentQuestionId = 6;
	// 	} else if (option === "usuario") {
	// 		currentQuestionId = 1;
	// 	} else if (option) {
	// 		currentQuestionId = option; // Asignar el valor de `nextQuestion`
	// 	} else {
	// 		throw new Error("No se encontró un valor válido para currentQuestionId");
	// 	}


		// Estructura jerárquica de opciones dinamicas
		// que se rellenan mediante fetch
		const optionsMap = {
			datos: {
				pregunta: "",
				respuestas: [],
			}
		};

		// Mostrar mensaje del usuario reflejando la selección
		const userMessage = createClientMessage(`He seleccionado:`, {
			widget: 'showHTML',
			payload: { customHTML: texto }, // Aquí se pasa el payload al widget
			delay: 500,
		});
		console.log("userMessage", userMessage); // Agrega el mensaje al flujo de chat

		setState((prevState) => ({
			...prevState,
			messages: [...prevState.messages, userMessage],
		}));


		

		async function obtenerRespuestasPorPregunta(option) {
			try {
				console.log("id_pregunta=", option)
				const response = await fetch(`${API_URL}api/preguntas/pr/${option}`);
				if (!response.ok) {
					throw new Error("Error al obtener las respuestas");
				}
				const respuestas = await response.json();

				currentQuestionId++

				return respuestas.map((res) => ({
					pregunta: res.pregunta,
					id: res.respuesta_id,
					texto: res.respuesta,
					nextQuestion: currentQuestionId++
				}));
			} catch (error) {
				console.error("Hubo un error:", error);
				return [];
			}
		}

		async function actualizarRespuestasPorPregunta(option) {
			const nuevosDatos = await obtenerRespuestasPorPregunta(option);
			if (nuevosDatos.length > 0) {
				optionsMap.datos.pregunta = nuevosDatos[0].pregunta;
				optionsMap.datos.respuestas = nuevosDatos;
			}
			return optionsMap.datos; // Devuelve los datos actualizados
		}

		// Incrementar el ID de la pregunta para la próxima llamada
		const nextOptions = await actualizarRespuestasPorPregunta(currentQuestionId);

		if (nextOptions) {
			const { pregunta, respuestas } = nextOptions;

			if (respuestas.length !== 0) {
				console.log(respuestas)
				const botMessage = createChatBotMessage(pregunta, {
					widget: "dynamicOptions",
					payload: { options: respuestas },
					delay: 500,
				});

				setState((prevState) => ({
					...prevState,
					messages: [...prevState.messages, botMessage],
				}));
			}
			else if (respuestas.length === 0) {
				const finalMessage = createChatBotMessage("Fin de la información.");
				setState((prevState) => ({
					...prevState,
					messages: [...prevState.messages, finalMessage],
				}));

				const ayudaMessage = createChatBotMessage("¿Necesitas más información?");
				setState((prevState) => ({
					...prevState,
					messages: [...prevState.messages, ayudaMessage],
				}));
			}
		} else {
			// Si no hay más opciones, mostrar un mensaje por defecto
			const noMoreOptionsMessage = createChatBotMessage("No hay más opciones disponibles.");
			setState((prevState) => ({
				...prevState,
				messages: [...prevState.messages, noMoreOptionsMessage],
			}));
		}
	};










	return (
		<div>
			{React.Children.map(children, (child) => {
				return React.cloneElement(child, {
					actions: {
						handleStartOptions,
						handleHello,
						handleGetUsers,
						handleUserForm,
						handleOptionSelection,
						handleProfesionalForm,
						handleProfesionalSubmit,
						handleUserSubmit


					},
				});
			})}
		</div>
	);
};

export default ActionProvider;
