
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

	const handleUserSubmit = (tipoFormulario) => {

		const botMessage = createChatBotMessage("Gracias por enviar el formulario de usuario.", {
			widget: 'formConfirmationWidget',
		});

		setState((prev) => ({
			...prev,
			messages: [...prev.messages, botMessage],
		}));

		if (tipoFormulario === "usuario") {
			handleOptionSelection(1, "", false);
		} else if (tipoFormulario === "profesional") {
			handleOptionSelection(6, "", false);
		}

		console.log("estoy en handleUserSubmit. TipoFormulario", tipoFormulario)
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
	const handleOptionSelection = async (option, texto, fin) => {

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

		// Estructura jerárquica de opciones dinamicas
		// que se rellenan mediante fetch
		const optionsMap = {
			datos: {
				pregunta: "",
				respuestas: [],
				fin: "",
			}
		};

		// mensaje final si ya no hay mas preguntas
		if(fin == true){

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

			return;
		}
		if(texto !== ""){
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
		}

		async function obtenerRespuestasPorPregunta(option) {
			try {
				console.log("id_preguntaaaa=", option)
				const response = await fetch(`${API_URL}api/preguntas/pr/${option}`);
				if (!response.ok) {
					throw new Error("Error al obtener las respuestas");
				}
				const respuestas = await response.json();

				currentQuestionId++
				console.log("RESPUESSSTAS", respuestas)
				return respuestas.map((res) => ({
					pregunta: res.pregunta,
					id: res.respuesta_id,
					texto: res.respuesta,
					fin: res.fin,
					nextQuestion: currentQuestionId++
				}));
			} catch (error) {
				console.error("Hubo un error:", error);
				return [];
			}
		}

		// Actualizamos las respuestas dinámicas según la pregunta actual
		const nuevosDatos = await obtenerRespuestasPorPregunta(option);

		console.log("nuevosDatos", nuevosDatos)
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
