
import React from 'react';

const MessageParser = ({ children, actions }) => {
	const parse = (message) => {
		// Si el mensaje incluye 'hola', maneja la respuesta
		if (message.includes('hola')) {
			console.log('mensaje: hola');
			actions.handleSaludo();
		}

		// Si el mensaje incluye 'dog', maneja la respuesta
		if (message.includes('Tengo miedo de haber contraído vih')) {
			actions.handleModelAnswer();
		}
	};

	// Mapea los niños y les pasa las acciones
	return (
		<div>
			{React.Children.map(children, (child) => {
				return React.cloneElement(child, {
					parse: parse,
					actions,
				});
			})}
		</div>
	);
};

export default MessageParser;
