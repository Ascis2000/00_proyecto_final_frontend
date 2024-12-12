
import React, { useState } from "react";
import "./ChatBot.css";

import { API_URL } from '../../../config/config.js';


const ChatBot = () => {
	const [isChatOpen, setIsChatOpen] = useState(false);
	const [messages, setMessages] = useState([
		{ sender: "bot", text: "¡Hola! ¿En qué puedo ayudarte?", options: ["Consultar horario", "Hablar con soporte"] },
	]);

	const handleOptionClick = (option) => {
		// Simular la respuesta del usuario
		const newMessages = [...messages, { sender: "user", text: option }];

		// Generar respuestas simuladas según la opción seleccionada
		let botResponse = {};
		if (option === "Consultar horario") {
			botResponse = {
				sender: "bot",
				text: "Nuestros horarios son de 9:00 a 18:00. ¿Algo más?",
				options: ["Sí, tengo otra pregunta", "No, gracias"],
			};
		} else if (option === "Hablar con soporte") {
			botResponse = {
				sender: "bot",
				text: "Un momento por favor... Conectando con soporte.",
				options: [],
			};
		} else if (option === "Sí, tengo otra pregunta") {
			botResponse = {
				sender: "bot",
				text: "Claro, dime en qué puedo ayudarte.",
				options: ["Consultar horario", "Hablar con soporte"]
			};
		} else if (option === "No, gracias") {
			botResponse = {
				sender: "bot",
				text: "¡Que tengas un buen día!",
				options: [],
			};
		}

		// Añadir la respuesta del bot
		setMessages([...newMessages, botResponse]);
	};

	return (
		<div className="chatbot-container">
			{/* Botón flotante */}
			{!isChatOpen && (
				<button className="chat-button" onClick={() => setIsChatOpen(true)}>
					💬
				</button>
			)}

			{/* Capa del chatbot */}
			{isChatOpen && (
				<div className="chat-window">
					<div className="chat-header">
						<span>ChatBot</span>
						<button className="close-button" onClick={() => setIsChatOpen(false)}>
							✖
						</button>
					</div>
					<div className="chat-body">
						{messages.map((message, index) => (
							<div
								key={index}
								className={`message ${message.sender === "bot" ? "bot" : "user"}`}
							>
								{message.text}
								{message.sender === "bot" && message.options.length > 0 && (
									<div className="options">
										{message.options.map((option, idx) => (
											<button
												key={idx}
												className="option-button"
												onClick={() => handleOptionClick(option)}
											>
												{option}
											</button>
										))}
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default ChatBot;
