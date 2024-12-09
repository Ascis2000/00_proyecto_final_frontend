
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import '../../styles/components/_Main.scss';
import ChartDashboard from './AdminDashboard';
import ChatBot from './ChatBot';
import ChatbotKit from 'react-chatbot-kit'
import AdminProfile from './AdminProfile';
import ModChatbot from './ModChatbot'
import ProbandoApi from './ProbandoApi'


import config from '../../elements/Bot/config/config.jsx';
import MessageParser from '../../elements/Bot/MessageParser/MessageParser.jsx';
import ActionProvider from '../../elements/Bot/ActionProvider/ActionProvider.jsx';

import 'react-chatbot-kit/build/main.css'
import '../../css/chatbot/custom-chatbot-kit.css'; 

//import Error404 from './Error404'; 

function Main() {
	return (
		<main className="boxMain">
			<Routes>
				<Route path="/" element={<Home />} />		
				<Route path="/admin" element={<AdminProfile />} />		
				<Route path="/admin/charts" element={<ChartDashboard />} />
				<Route path="/admin/modchatbot" element={<ModChatbot />} />
				<Route path="/admin/probandoapi" element={<ProbandoApi />} />
				<Route path="/chatbot" element={<ChatBot />} />
				<Route path="/chatbotkit" element={<ChatbotKit
					config={config}
					messageParser={MessageParser}
					actionProvider={ActionProvider}
				/>} />
        		{/* <Route path="*" element={<Error404 />} />  */}
				
			</Routes>
		</main>
	);
}

export default Main;
