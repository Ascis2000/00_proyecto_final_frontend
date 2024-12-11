
import React, { useState } from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';
import ProfesionalForm from '../../../components/Main/ChatBot/ProfesionalForm';
import UserForm from '../../../components/Main/ChatBot/UserForm';
import StartOptions from '../../../components/Main/StartOptions/StartOptions';
import ShowHTML from '../../../components/Main/ShowHTML/ShowHTML';

const botName = 'Eve';

const headerWidget = () => React.createElement(
	'div',
	{
		className: 'header',
	},
	`CHATBOT con ${botName}`
);

const parseTextWithLinks = (texto) => {
	// Expresión regular para detectar URLs
	const urlPattern = /https?:\/\/[^\s]+/g;

	// Dividir el texto por las URLs
	const partes = texto.split(urlPattern);

	// Extraer las URLs coincidentes
	const urls = texto.match(urlPattern);

	// Crear el contenido como JSX
	const resultado = [];
	partes.forEach((parte, index) => {
		// Agregar la parte de texto normal
		if (parte) {
			resultado.push(<span key={`text-${index}`}>{parte}</span>);
		}
		// Agregar la URL como enlace
		if (urls && urls[index]) {
			resultado.push(
				<a
					key={`link-${index}`}
					href={urls[index]}
					target="_blank"
					rel="noopener noreferrer"
				>
					{urls[index]}
				</a>
			);
		}
	});

	return resultado;
};

const resetBot = (props) => {
	setTimeout(() => {
		// Usamos `setTimeout` para asegurarnos de que no ocurre durante el renderizado
		props.setState((prev) => ({
			...prev,
			messages: config.initialMessages, // Reinicia los mensajes al estado inicial
		}));
	}, 0);
};


// obtenemos el localStorage 'chatbot_perfil'
const miPerfil = JSON.parse(localStorage.getItem('chatbot_perfil'));

const startOptionsButtons = (props) => {

	// si 'chatbot_perfil' no es nulo
	if(miPerfil == null){
		return (
			<div className="botones">
				<button
					onClick={() => props.actionProvider.handleOptionSelection("usuario", "Usuario")}>
						Soy una persona usuaria que busca información sobre vih
				</button>
				<button 
					onClick={() => props.actionProvider.handleOptionSelection("profesional", "Profesional")}>
						Soy profesional de la salud.
				</button>
			</div>
		);
	}
};

const dynamicOptionsWidget = (props) => {
	const options = props.payload.options; // Obtener las opciones pasadas en el payload

	return (
		<div className="boxPreguntas">
			{options.map((option, index) => (
				<button
					key={index}
					onClick={() => props.actionProvider.handleOptionSelection(option.nextQuestion, option.texto, option.fin)} // Manejar selección de opción
				>
					{/* {option.nextQuestion} */}
					{option.texto}
					{/* {parseTextWithLinks(option.texto)} */}
					FIN={option.fin ? "Sí" : "No"}
				</button>
			))}
		</div>
	);
};

const config = {
	botName: botName,
	initialMessages: [
		createChatBotMessage(`Hola! Mi nombre es ${botName}.
			Bienvenide al Chatbot de Información sobre vih de FELGTBI+. Estoy
			aquí para brindarte información confiable y orientación de manera confidencial.
			`, {
			// Primer mensaje del bot
			delay: 500, // Tiempo para que el mensaje aparezca con el indicador de "escribiendo"
		}),

		createChatBotMessage("¿Cómo puedo ayudarte mejor? Por favor selecciona una opción:", {
			widget: "wg_startOptionsButtons",
		}),

		/* createChatBotMessage("Por favor, selecciona una opción:", {
			widget: "startOptions", // Llamamos al widget startOptions
			delay: 1500, // Retardo antes de mostrar las opciones
		}), */

		/* createChatBotMessage('Por favor, ingresa tus datos a continuación:', {
			widget: 'getUsers', // Este es el nombre del widget
		}),
		createChatBotMessage('Por favor, este texto no sale:', {
			widget: 'showUserForm', // Este es el nombre del widget
		}), */
	],

	widgets: [
		{
			widgetName: "wg_startOptionsButtons",
			widgetFunc: startOptionsButtons,
		},
		{
			widgetName: "startOptions",
			widgetFunc: (props) => <StartOptions {...props} />,
		},
		{
			widgetName: 'showUserForm',
			widgetFunc: (props) => <UserForm {...props} />,
		},
		{
			widgetName: 'showProfesionalForm',
			widgetFunc: (props) => <ProfesionalForm {...props} />,
		},
		{
			widgetName: "optionsButtons",
			widgetFunc: (props) => {
				return (
					<>
						<div className="botones">
							<button
								onClick={() => props.actionProvider.handleOptionSelection("usuario", "Usuario")}>Usuario</button>
							<button onClick={() => props.actionProvider.handleOptionSelection("profesional", "Profesional")}>Profesional</button>
						</div>
					</>
				);
			}
		},
		{
			widgetName: "dynamicOptions",
			widgetFunc: dynamicOptionsWidget,
		},
		{
			widgetName: "showHTML",
			widgetFunc: (props) => <ShowHTML {...props} />,
		}
	],

	customStyles: {
		botMessageBox: {
			backgroundColor: '#E2007E',
		},
	},

	customComponents: {
		// Replaces the default header
		header: headerWidget,

	}
};

export default config;