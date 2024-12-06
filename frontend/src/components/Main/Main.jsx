
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import '../../styles/components/_Main.scss';
import AdminDashboard from './AdminDashboard';
import ChatBot from './ChatBot';
//import Error404 from './Error404'; 

function Main() {
	return (
		<main className="boxMain">
			<Routes>
				<Route path="/" element={<Home />} />				
				<Route path="/admin" element={<AdminDashboard />} />
				<Route path="/chatbot" element={<ChatBot />} />
        		{/* <Route path="*" element={<Error404 />} />  */}
				
			</Routes>
		</main>
	);
}

export default Main;
