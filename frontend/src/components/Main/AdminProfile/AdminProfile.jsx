import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/components/_AdminProfile.scss';

const AdminProfile = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-profile__button-container">
      <button
        onClick={() => navigate('/admin/charts')}
        className="admin-profile__button"
      >
        Gráficas de datos
      </button>
      <button
        onClick={() => navigate('/admin/modchatbot')}
        className="admin-profile__button"
      >
        Modificar ChatBot
      </button>
    </div>
  );
};

export default AdminProfile;
