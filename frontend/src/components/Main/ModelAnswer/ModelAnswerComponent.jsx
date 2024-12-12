
import React, { useState, useEffect } from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';

const ModelAnswerComponent = (props) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const modelAnswer = async () => {
      const options = props.payload.options;

      try {
        console.log('Opciones recibidas:', options);

        const response = await fetch('https://felgtbi-the-bridge.onrender.com/model_answer_usuario', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(options),
        });

        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }

        const result = await response.json();
        console.log('Respuesta del servidor:', result);

        setData(result); // Guardar los datos en el estado

        // Crear el mensaje para el chatbot
        const message = createChatBotMessage(result, {
          widget: 'wg_customRespuesta', // Si deseas incluir un widget específico
        });

      } catch (error) {
        console.error('Error en la petición:', error);
        setError(error.message); // Guardar el error en el estado
      } finally {
        setLoading(false); // Finalizar la carga
      }
    };

    modelAnswer();
  }, [props.payload.options, props.actions]); // Ejecutar cuando cambien las opciones

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return null; // Ya no es necesario renderizar los datos en el componente
};

export default ModelAnswerComponent;
