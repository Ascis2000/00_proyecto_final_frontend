
import React from 'react';
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import ChatBox from "./components/Main/ChatBox/ChatBox";

const App = () => {
	return (
		<div className="boxApp">
			<AuthProvider>
				<BrowserRouter>
					<Header />
					<Main>
						<ChatBox />
					</Main>
					<Footer />
				</BrowserRouter>
			</AuthProvider>
		</div>
	);
};

export default App;

