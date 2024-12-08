import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminProfile = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <button onClick={() => navigate('/charts')} style={{ padding: '0.5rem 1rem' }}>
        Gráficas de datos
      </button>
      <button onClick={() => navigate('/ruta2')} style={{ padding: '0.5rem 1rem' }}>
        Ir a Ruta 2
      </button>
    </div>
  );
};

export default AdminProfile;
