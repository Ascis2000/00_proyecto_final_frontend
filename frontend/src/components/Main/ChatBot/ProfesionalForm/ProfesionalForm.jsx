import React, { useState } from 'react';
import './ProfesionalForm.css';
import { API_URL } from '../../../../config/config.js';

const ProfesionalForm = ({ actionProvider }) => {
	const [formData, setFormData] = useState({
		provincia: '',
		cod_postal: '',
		ambito: '',
		especialidad: '',
		tipoFormulario: 'profesional',
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
    if (name === "cod_postal") {
      let validValue = value.replace(/[^0-9]/g, ''); 
      if (validValue.length <= 5) {
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
			!formData.provincia ||
			!formData.cod_postal ||
			!formData.ambito ||
			!formData.especialidad
		) {
			setError('Por favor, completa todos los campos antes de enviar.');
			return;
		}
		setError('');

		console.log("FORMDATA====", formData)

		fetch(`${API_URL}api/profesionales/create`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('Profesional creado:', data);
				console.log("Profesional=", formData.tipoFormulario)
				actionProvider.handleUserSubmit(formData.tipoFormulario);
			})
			.catch((error) => console.error('Error:', error));
	};

	return (
		<div >
			<h3>Por favor, ingresa tus datos:</h3>

			{/* Mensaje de error */}
			{error && <p style={{ color: 'red' }}>{error}</p>}
			<div className="form-container">
				{/* Selector para el País */}
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
				<label htmlFor="cod_postal">Codigo Postal:</label>
				<input
					type="text"
					name="cod_postal"
					value={formData.cod_postal}
					onChange={handleChange}
				/>

				<label htmlFor="ambito">Ambito:</label>
				<select
					name="ambito"
					value={formData.ambito}
					onChange={handleChange}
				>
					<option value="" disabled>Selecciona tu ámbito</option>
					<option value="Atencion Primaria">Atencion Primaria</option>
					<option value="Hospitalaria">Hospitalaria</option>
					<option value="Salud publica">Salud publica</option>
					<option value="ONG o voluntariado">ONG o voluntariado</option>
					<option value="Otro">Otro</option>
				</select>

				{/* <label htmlFor="especialidad">Especialidad:</label>
				<select
					name="especialidad"
					value={formData.especialidad}
					onChange={handleChange}
				>
					<option value="" disabled>Selecciona tu especialidad</option>
					<option value="Medicina">Medicina</option>
					<option value="Enfermeria">Enfermeria</option>
					<option value="Psicologia">Psicologia</option>
					<option value="Trabajo Social">Trabajo Social</option>
				</select> */}
        	<label htmlFor="especialidad">Especialidad:</label>
				<input
					type="text"
					name="especialidad"
					value={formData.especialidad}
					onChange={handleChange}
				/>

				<button onClick={handleSubmit}>Enviar</button>
			</div>
		</div>
	);
};

export default ProfesionalForm;
