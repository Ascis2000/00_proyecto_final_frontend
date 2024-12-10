import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../../styles/components/_ModChatbot.scss'; // Importamos los estilos SCSS
import { API_URL } from '../../../config/config.js';

const ModChatbot = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${API_URL}api/respuestas/preguntasyrespuestas`);
        setQuestions(response.data);  // Guarda las preguntas con respuestas
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleQuestionChange = (e, index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].pregunta = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (e, questionIndex, answerIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].respuestas[answerIndex].respuesta = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleSaveQuestion = async (index) => {
    const updatedQuestion = questions[index];  // Obtener la pregunta actualizada

    try {
      const response = await axios.put(`${API_URL}api/preguntas/${updatedQuestion.pregunta_id}`, {
        pregunta: updatedQuestion.pregunta  // Enviar la pregunta actualizada
      });

      console.log('Pregunta actualizada:', response.data);
    } catch (error) {
      console.error('Error al actualizar la pregunta:', error);
    }
  };

  const handleSaveAnswer = async (questionIndex, answerIndex) => {
    const updatedAnswer = questions[questionIndex].respuestas[answerIndex];  // Obtener la respuesta actualizada

    try {
      // Realizamos un PUT con los datos de la respuesta modificada
      const response = await axios.put(`${API_URL}api/respuestas/${updatedAnswer.respuesta_id}`, {
        respuesta: updatedAnswer.respuesta,  // Enviar la respuesta actualizada
      });

      console.log('Respuesta actualizada:', response.data);
    } catch (error) {
      console.error('Error al actualizar la respuesta:', error);
    }
  };

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div className="mod-chatbot">
      <h1>Edita preguntas y respuestas</h1>
      {questions.map((question, questionIndex) => (
        <div key={question.pregunta_id} className="question-box">
          <textarea
            value={question.pregunta}
            onChange={(e) => handleQuestionChange(e, questionIndex)}
            rows={4}
            className="question-textarea"
          />
          <div className="button-container">
            <button
              onClick={() => handleSaveQuestion(questionIndex)}
              className="save-button"
            >
              Modificar Pregunta
            </button>
          </div>
          <div className="answers-container">
            <h3>Respuestas:</h3>
            {question.respuestas && question.respuestas.map((respuesta, answerIndex) => (
              <div key={respuesta.respuesta_id} className="answer-box">
                <textarea
                  value={respuesta.respuesta}
                  onChange={(e) => handleAnswerChange(e, questionIndex, answerIndex)}
                  rows={4}
                  className="answer-textarea"
                />
                <div className="button-container">
                  <button
                    onClick={() => handleSaveAnswer(questionIndex, answerIndex)}
                    className="save-button"
                  >
                    Modificar Respuesta
                  </button>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      ))}
    </div>
  );
};

export default ModChatbot;
