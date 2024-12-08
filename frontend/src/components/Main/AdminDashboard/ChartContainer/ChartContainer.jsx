import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChartPerson from './ChartPerson';
import { API_URL } from '../../../../config/config.js';


const ChartContainer = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}api/users`);
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
      <h1>Gráficas de invitados</h1>
      <ChartPerson users={users} />
    </div>
  );
};

export default ChartContainer;
