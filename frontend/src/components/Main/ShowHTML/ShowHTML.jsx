
import React from 'react';

// Función para procesar texto y convertir URLs en enlaces HTML
const parseTextWithLinks = (text) => {

	if (typeof text !== 'string' || !text) {
		console.log(text)
		return null; // Retorna `null` si el texto no es válido
	}

	const urlRegex = /(https?:\/\/[^\s]+)/g;
	const parts = text.split(urlRegex);

	return parts.map((part, index) =>
		urlRegex.test(part) ? (
			<a
				key={`link-${index}`}
				href={part}
				target="_blank"
				rel="noopener noreferrer"
				style={{ color: 'blue', textDecoration: 'underline' }}
			>
				{part}
			</a>
		) : (
			<span key={`text-${index}`}>{part}</span>
		)
	);
};

// Función que muestra las respuestas seleccionadas por el usuario
const ShowHTML = (props) => {
	console.log("Props recibidas en ShowHTML:", props);

	// Asegúrate de que props.payload existe
	const customHTML = props.payload ? props.payload.customHTML : "";

	return (
		<div
			className="outer-container"
			style={{
				display: 'flex',
				justifyContent: 'flex-end',
				width: '100%',
				marginBottom: '10px',
			}}
		>
			<div
				className="react-chatbot-kit-user-chat-message custom"
				style={{
					width: 'auto', 
					maxWidth: '300px',
					backgroundColor: '#D0F7FD', 
					padding: '10px',
					position: 'relative',
					right: '55px',
					borderRadius: '5px',
					textAlign: 'left', 
					wordWrap: 'break-word', 
				}}
			>
				{parseTextWithLinks(customHTML)}
			</div>
		</div>
	);
};

export default ShowHTML;
