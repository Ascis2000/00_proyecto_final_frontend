import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChartProfesional from './ChartProfesional';
import { API_URL } from '../../../../config/config.js';
//

const ChartSanitary = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/profesionales`);
                //const response = await axios.get(`${API_URL}api/profesionales`);
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <p>Cargando datos...</p>;
    }

    return (
        <div>
            <h1>Gráficas de profesionales</h1>
            <ChartProfesional users={users} />
        </div>
    );
};

export default ChartSanitary;
