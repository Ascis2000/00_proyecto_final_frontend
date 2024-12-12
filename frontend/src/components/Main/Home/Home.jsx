
import React, { useContext, useState, useEffect } from 'react';

import { Link } from "react-router-dom";
import utilsToken from "../../../utils/token.js";
import { AuthContext } from "../../../context/AuthContext";
import { API_URL } from '../../../config/config.js';
import "../../../styles/components/_Home.scss";

const Home = () => {
	return (
		<div className="home-container">
			<img
				src="/home.png"
				alt="Fondo de Home"
				className="home-background"
			/>

		</div>
	);
};

export default Home;