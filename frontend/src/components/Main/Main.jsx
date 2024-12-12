import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ChatbotKit from "react-chatbot-kit";
import ProtectedRoute from "../ProtectedRoute";

import Home from "./Home";
import "../../styles/components/_Main.scss";
import ChartDashboard from "./AdminDashboard";
import ChatBot from "./ChatBot";
import ModChatbot from "./ModChatbot";
import ProbandoApi from "./ProbandoApi";
import AdminProfile from "./AdminProfile";

import config from "../../elements/Bot/config/config.jsx";
import MessageParser from "../../elements/Bot/MessageParser/MessageParser.jsx";
import ActionProvider from "../../elements/Bot/ActionProvider/ActionProvider.jsx";

import "react-chatbot-kit/build/main.css";
import "../../css/chatbot/custom-chatbot-kit.css";

function Main() {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <main>
      {!showChatbot && (
        <button
          onClick={() => setShowChatbot(!showChatbot)}
          className="chatbot-toggle-button"
        >
          💬 {/* Icono del botón */}
        </button>
      )}

      {showChatbot && (
        <div className="chatbot-container">
          <button
            onClick={() => setShowChatbot(false)}
            className="chatbot-close-button"
          >
            <i className="fas fa-times"></i>
          </button>
          <ChatbotKit
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        </div>
      )}

      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/chatbot" element={<ChatBot />} />

        {/* Ruta pública para /admin */}
        <Route path="/admin" element={<Home />} />

        {/* Rutas protegidas */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <Routes>
                <Route path="profile" element={<AdminProfile />} />
                <Route path="charts" element={<ChartDashboard />} />
                <Route path="modchatbot" element={<ModChatbot />} />
                <Route path="probandoapi" element={<ProbandoApi />} />
              </Routes>
            </ProtectedRoute>
          }
        />
      </Routes>
    </main>
  );
}

export default Main;
