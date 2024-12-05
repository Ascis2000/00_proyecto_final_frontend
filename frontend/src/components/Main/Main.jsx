
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import '../../styles/components/_Main.scss';

/* import Perfil from './Perfil';
import Error404 from './Error404'; */

function Main() {
	return (
		<main className="boxMain">
			<Routes>
				<Route path="/" element={<Home />} />				{
				/* <Route path="/perfil" element={<Perfil />} />
        		<Route path="*" element={<Error404 />} /> */
				}
			</Routes>
		</main>
	);
}

export default Main;
