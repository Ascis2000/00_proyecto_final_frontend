import React, { useState } from 'react';
import ChartPie from './ChartPie';
import '../../../../../styles/components/_ChartsContainer.scss';

const groupBy = (key, data = []) => {
  const groups = data.reduce((acc, item) => {
    if (item[key] !== undefined) {
      acc[item[key]] = (acc[item[key]] || 0) + 1;
    }
    return acc;
  }, {});
  return Object.entries(groups).map(([label, count]) => ({ label, count }));
};

const ChartProfesional = ({ users }) => {
  const [visibleChart, setVisibleChart] = useState(null);

  if (!Array.isArray(users) || users.length === 0) {
    return <p>No hay datos disponibles para mostrar.</p>;
  }

  const toggleChart = (chartName) => {
    setVisibleChart((prev) => (prev === chartName ? null : chartName));
  };

  return (
    <div className="chart-container">
      <h2 className="chart-heading">Selecciona una categoría:</h2>

      <div className="button-container">
        <button className="chart-button" onClick={() => toggleChart('ciudad')}>
          Distribución por Ciudad
        </button>
        <button className="chart-button" onClick={() => toggleChart('especialidad')}>
          Distribución por Especialidad
        </button>
        <button className="chart-button" onClick={() => toggleChart('ambito')}>
          Distribución por Ámbito
        </button>
      </div>

      {visibleChart === 'ciudad' && <ChartPie title="Distribución por Ciudad" data={groupBy('ciudad', users)} />}
      {visibleChart === 'especialidad' && <ChartPie title="Distribución por Especialidad" data={groupBy('especialidad', users)} />}
      {visibleChart === 'ambito' && <ChartPie title="Distribución por Ámbito" data={groupBy('ambito', users)} />}
    </div>
  );
};

export default ChartProfesional;
