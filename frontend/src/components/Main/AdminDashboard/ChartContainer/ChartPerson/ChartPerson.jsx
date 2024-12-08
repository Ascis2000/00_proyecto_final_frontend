import React, { useState } from 'react';
import ChartPie from './ChartPie';
import '../../../../../styles/components/_ChartsContainer.scss'

const groupBy = (key, data = []) => {
  const groups = data.reduce((acc, item) => {
    if (item[key] !== undefined) {
      acc[item[key]] = (acc[item[key]] || 0) + 1;
    }
    return acc;
  }, {});
  return Object.entries(groups).map(([label, count]) => ({ label, count }));
};

const ChartPerson = ({ users }) => {
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
        <button className="chart-button" onClick={() => toggleChart('pais')}>
          Distribución por País
        </button>
        <button className="chart-button" onClick={() => toggleChart('genero')}>
          Distribución por Género
        </button>
        <button className="chart-button" onClick={() => toggleChart('orien_sex')}>
          Distribución por Orientación Sexual
        </button>
        <button className="chart-button" onClick={() => toggleChart('edad')}>
          Distribución por Edad
        </button>
      </div>

      {visibleChart === 'pais' && <ChartPie title="Distribución por País" data={groupBy('pais', users)} />}
      {visibleChart === 'genero' && <ChartPie title="Distribución por Género" data={groupBy('genero', users)} />}
      {visibleChart === 'orien_sex' && <ChartPie title="Distribución por Orientación Sexual" data={groupBy('orien_sex', users)} />}
      {visibleChart === 'edad' && <ChartPie title="Distribución por Edad" data={groupBy('edad', users)} />}
    </div>
  );
};

export default ChartPerson;
