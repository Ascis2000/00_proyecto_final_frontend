import React, { useState } from 'react';
import ChartPie from './ChartPie';
import '../../../../../styles/components/_ChartsContainer.scss';
import '../../../../../styles/components/_ChartPerson.scss';
import * as XLSX from "xlsx";

const groupBy = (key, data = []) => {
  const groups = data.reduce((acc, item) => {
    if (item[key] !== undefined) {
      acc[item[key]] = (acc[item[key]] || 0) + 1;
    }
    return acc;
  }, {});
  return Object.entries(groups).map(([label, count]) => ({ label, count }));
};

// Función para descargar en Excel
const handleDownloadExcel = (category, users) => {
  const filteredData = groupBy(category, users);

  const worksheet = XLSX.utils.json_to_sheet(filteredData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

  XLSX.writeFile(workbook, `datos_${category}.xlsx`);
};

// Función para descargar en CSV
const handleDownloadCSV = (category, users) => {
  const filteredData = groupBy(category, users);

  const csvContent =
    "data:text/csv;charset=utf-8," +
    filteredData.map((row) => `${row.label},${row.count}`).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `datos_${category}.csv`);
  document.body.appendChild(link);
  link.click();
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
      <h4 className="chart-heading">Selecciona una categoría:</h4>

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

      {visibleChart && (
        <div>
          <ChartPie
            title={`Distribución por ${visibleChart.charAt(0).toUpperCase() + visibleChart.slice(1)}`}
            data={groupBy(visibleChart, users)}
          />
          <div className="download-buttons">
            <button
              className="download-button"
              onClick={() => handleDownloadExcel(visibleChart, users)}
            >
              Descargar en Excel
            </button>
            <button
              className="download-button"
              onClick={() => handleDownloadCSV(visibleChart, users)}
            >
              Descargar en CSV
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartPerson;
