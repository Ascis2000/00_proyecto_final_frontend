
import React, { useState } from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';
import ProfesionalForm from '../../../components/Main/ChatBot/ProfesionalForm';
import UserForm from '../../../components/Main/ChatBot/UserForm';
import StartOptions from '../../../components/Main/StartOptions/StartOptions';
import ShowHTML from '../../../components/Main/ShowHTML/ShowHTML';

const botName = 'Cristina';

const headerWidget = () => React.createElement(
	'div',
	{
		className: 'header',
	},
	`ChatBot con ${botName}`
);

const resetBot = (props) => {
    // Restablecer los mensajes y la configuración
    setTimeout(() => {
        props.setState((prevState) => ({
            ...prevState,
            messages: config.initialMessages,  // Restablece los mensajes al estado inicial
            // Si es necesario, también puedes restablecer otras partes del estado aquí.
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
					onClick={() => props.actionProvider.handleOptionSelection(
						option.nextQuestion, 
						option.texto, 
						option.fin,
						option.idPerfil,
						option.id_pregunta,
						option.id_respuesta
					)} // Manejar selección de opción
				>
					{option.texto}
					{/* Pregunta={option.nextQuestion}
					Texto={option.texto}
					FIN={option.fin ? "Sí" : "No"}<br></br>
					Perfil={option.idPerfil}<br></br>
					Pregunta={option.nextQuestion}<br></br>
					Respuesta={option.id_respuesta} */}
				</button>
			))}
		</div>
	);
};

const finalOptionsButtons = (props) => {

	const options = props.payload.options;

	console.log("OPTIONS=", options.tPerfil)
	
	let pregunta = (options.tPerfil == "usuario") ? 1 : 6;

	// si 'chatbot_perfil' no es nulo
	if(miPerfil == null){
		return (
			<div className="botones">
				<button
					onClick={() => props.actionProvider.handleOptionSelection(pregunta, "SI", false, options.iPerfil)}>
						SI
				</button>
				<button 
					//onClick={() => window.location.reload() }>
					onClick={() => resetBot(props) }>
						NO
				</button>
			</div>
		);
	}
};

const config = {
	botName: botName,
	initialMessages: [
		createChatBotMessage(`Hola! Mi nombre es ${botName}.
			Bienvenide al Chatbot de Información sobre vih de FELGTBI+. 
			`, {
			// Primer mensaje del bot
			delay: 1000, // Tiempo para que el mensaje aparezca con el indicador de "escribiendo"
		}),
		createChatBotMessage("Estoy aquí para brindarte información confiable y orientación de manera confidencial.", {}),
		createChatBotMessage("¿Cómo puedo ayudarte mejor? Por favor selecciona una opción:", {
			widget: "wg_startOptionsButtons",
			delay: 1200,
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
		},
		{
			widgetName: "wg_finalOptionsButtons",
			widgetFunc: finalOptionsButtons,
		},
	],

	customStyles: {
		botMessageBox: {
			backgroundColor: '#E2007E',
		},
		chatButton: {
			backgroundColor: '#EEEEEE',
		},
	},

	customComponents: {
		// Replaces the default header
		header: headerWidget,

	}
};

export default config;