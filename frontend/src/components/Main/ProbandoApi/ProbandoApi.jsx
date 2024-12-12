import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../../styles/components/_ModChatbot.scss'; // Importamos los estilos SCSS
import { API_URL } from '../../../config/config.js';


const ProbandoApi = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    const fetchQuestions = async () => {
      console.log(API_URL)
      try {
        const response = await axios.get(`https://felgtbi-the-bridge.onrender.com/q_and_a?user_rol=usuario`);
        setQuestions(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Handler to update the question text
  const handleChange = (e, index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].pregunta = e.target.value;
    setQuestions(updatedQuestions);
  };

  // // Handler to save the changes
  // const handleSave = async (index) => {
  //   const updatedQuestion = questions[index];  // Obtener la pregunta actualizada

  //   try {
  //     // Realizamos un PUT con los datos de la pregunta modificada
  //     const response = await axios.put(`${API_URL}api/preguntas/${updatedQuestion.pregunta_id}`, {
  //       pregunta: updatedQuestion.pregunta  // Enviar la pregunta actualizada
  //     });

  //     console.log('Pregunta actualizada:', response.data);
  //   } catch (error) {
  //     console.error('Error al actualizar la pregunta:', error);
  //   }
  // };

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div className="mod-chatbot">
      <h1>Gráficas de invitados</h1>
      {questions.map((question, index) => (
        <div key={question.pregunta_id} className="question-box">
          <textarea
            value={question.pregunta}
            onChange={(e) => handleChange(e, index)}
            rows={4}
            className="question-textarea"
          />
          <div className="button-container">
            <button
              onClick={() => handleSave(index)}
              className="save-button"
            >
              Modificar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProbandoApi;
