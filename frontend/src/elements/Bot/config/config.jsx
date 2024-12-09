
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

const dynamicOptionsWidget = (props) => {
	const options = props.payload.options; // Obtener las opciones pasadas en el payload
	
	return (
		<div className="boxPreguntas">
			{options.map((option, index) => (
				<button
					key={index}
					onClick={() => props.actionProvider.handleOptionSelection(option.nextQuestion, option.texto)} // Manejar selección de opción
				>
					{/* {option.nextQuestion} */}
					{option.texto}
					{/* {parseTextWithLinks(option.texto)} */}
				</button>
			))}
		</div>
	);
};

const config = {
	botName: botName,
	initialMessages: [
		createChatBotMessage(`Hola! Mi nombre es ${botName}. ¿En qué puedo ayudarte?`, {
			// Primer mensaje del bot
			delay: 500, // Tiempo para que el mensaje aparezca con el indicador de "escribiendo"
		}),

		createChatBotMessage("Elige una opción:", {
			widget: "optionsButtons", // Este es el widget donde se mostrarán las opciones
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
			backgroundColor: '#BC2EAE',
		},
		chatButton: {
			backgroundColor: '#5ccc9d',
		},
	},

	customComponents: {
		// Replaces the default header
		header: headerWidget,
		
	}
};

export default config;