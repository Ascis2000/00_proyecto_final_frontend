import React, { useState } from 'react';
import './UserForm.css';
import { API_URL } from '../../../../config/config.js';

const UserForm = ({ actionProvider }) => {
	const [formData, setFormData] = useState({
		pais: '',
		genero: '',
		orien_sex: '',
		provincia: '',
		edad: '',
		tipoFormulario: 'usuario',
	});
	//mostrar el mensaje de error
	const [error, setError] = useState('');

	// const handleChange = (e) => {
	// 	const { name, value } = e.target;
	// 	setFormData({
	// 		...formData,
	// 		[name]: value,
	// 	});
	// };
	const handleChange = (event) => {
		const { name, value } = event.target;
		if (name === "edad") {
		  const validValue = value.replace(/[^0-9]/g, ''); 
		  if (validValue.length <= 2 && (parseInt(validValue) > 0 || validValue === "")) {
			setFormData({
			  ...formData,
			  [name]: validValue,
			});
		  }
		} else {
		  setFormData({
			...formData,
			[name]: value,
		  });
		}
	  };

	const handleSubmit = () => {

		//validacion 
		if (
			!formData.pais ||
			!formData.genero ||
			!formData.orien_sex ||
			!formData.provincia ||
			!formData.edad
		) {
			setError('Por favor, completa todos los campos antes de enviar.');
			return;
		}
		setError('');

		console.log("FORMDATA====", formData)
		fetch(`${API_URL}api/users/create`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('Usuario creado:', data);
				console.log("Usuario=", formData.tipoFormulario)
				actionProvider.handleActionSubmit(formData.tipoFormulario, data.usuario_id);
			})
			.catch((error) => console.error('Error:', error));
	};

	return (
		<div >
			<h3>Por favor, ingresa tus datos:</h3>
			<div className="form-container">

				{/* Selector para el País */}
				<label htmlFor="pais">País:</label>
				<select
					name="pais"
					value={formData.pais}
					onChange={handleChange}
				>
					<option value="" disabled>Selecciona tu país</option>
					<option value="España">España</option>
				</select>

				<label htmlFor="genero">Género:</label>
				<select
					name="genero"
					value={formData.genero}
					onChange={handleChange}
				>
					<option value="" disabled>Selecciona tu género</option>
					<option value="Masculino">Masculino</option>
					<option value="Femenino">Femenino</option>
					<option value="No Binario">No Binario</option>
					<option value="No Binario">Prefiero no decirlo</option>
				</select>

				<label htmlFor="orien_sex">Orientación:</label>
				<select
					name="orien_sex"
					value={formData.orien_sex}
					onChange={handleChange}
				>
					<option value="" disabled>Selecciona tu orientación</option>
					<option value="Heterosexualidad">Heterosexual</option>
					<option value="Homosexualidad">Homosexual</option>
					<option value="Bisexualidad">Bisexual</option>
					<option value="Asexualidad">Lesbiana</option>
					<option value="Otro">Otra</option>
				</select>

				<label htmlFor="provincia">Provincia:</label>
				<select
					name="provincia"
					value={formData.provincia}
					onChange={handleChange}
				>
					<option value="" disabled>Selecciona tu provincia</option>
					<option value="Álava">Álava</option>
					<option value="Albacete">Albacete</option>
					<option value="Alicante">Alicante</option>
					<option value="Almería">Almería</option>
					<option value="Asturias">Asturias</option>
					<option value="Ávila">Ávila</option>
					<option value="Badajoz">Badajoz</option>
					<option value="Barcelona">Barcelona</option>
					<option value="Burgos">Burgos</option>
					<option value="Cáceres">Cáceres</option>
					<option value="Cádiz">Cádiz</option>
					<option value="Cantabria">Cantabria</option>
					<option value="Castellón">Castellón</option>
					<option value="Ceuta">Ceuta</option>
					<option value="Ciudad Real">Ciudad Real</option>
					<option value="Córdoba">Córdoba</option>
					<option value="La Coruña">La Coruña</option>
					<option value="Cuenca">Cuenca</option>
					<option value="Gerona">Gerona</option>
					<option value="Granada">Granada</option>
					<option value="Guadalajara">Guadalajara</option>
					<option value="Gipuzkoa">Gipuzkoa</option>
					<option value="Huelva">Huelva</option>
					<option value="Huesca">Huesca</option>
					<option value="Islas Baleares">Islas Baleares</option>
					<option value="Jaén">Jaén</option>
					<option value="La Rioja">La Rioja</option>
					<option value="Las Palmas">Las Palmas</option>
					<option value="León">León</option>
					<option value="Lleida">Lleida</option>
					<option value="Lugo">Lugo</option>
					<option value="Madrid">Madrid</option>
					<option value="Malaga">Málaga</option>
					<option value="Melilla">Melilla</option>
					<option value="Murcia">Murcia</option>
					<option value="Navarra">Navarra</option>
					<option value="Ourense">Ourense</option>
					<option value="Palencia">Palencia</option>
					<option value="Pontevedra">Pontevedra</option>
					<option value="Salamanca">Salamanca</option>
					<option value="Segovia">Segovia</option>
					<option value="Sevilla">Sevilla</option>
					<option value="Soria">Soria</option>
					<option value="Tarragona">Tarragona</option>
					<option value="Teruel">Teruel</option>
					<option value="Toledo">Toledo</option>
					<option value="Valencia">Valencia</option>
					<option value="Valladolid">Valladolid</option>
					<option value="Vizcaya">Vizcaya</option>
					<option value="Zamora">Zamora</option>
					<option value="Zaragoza">Zaragoza</option>
				</select>

				<label htmlFor="edad">Edad:</label>
				<input
					type="number"
					name="edad"
					placeholder="Edad"
					value={formData.edad}
					onChange={handleChange}
					min="1"
					inputMode="numeric"
				/>

				<button onClick={handleSubmit}>Enviar</button>
				{error && <p style={{ color: 'red' }}>{error}</p>}
			</div>
		</div>
	);
};

export default UserForm;
