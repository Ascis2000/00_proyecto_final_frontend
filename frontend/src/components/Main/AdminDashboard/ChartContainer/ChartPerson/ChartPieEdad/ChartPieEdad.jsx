import React from 'react';
import ReactECharts from 'echarts-for-react';
import '../../../../../../styles/components/_ChartPie.scss';
const ChartPie = ({ title, data, rawData }) => {
  const colors = ['#44BAC1', '#9C4AA0', '#FFB024', '#F45540', '#A5165B', '#E2007E', '#1D1D1B','#71226E', '#36C49E'];
  // Generar mapeo para tooltips más detallados
  const detailedData = rawData.reduce((acc, user) => {
    const age = user.edad;
    if (age !== undefined) {
      const rangeStart = Math.floor(age / 10) * 10;
      const rangeEnd = rangeStart + 9;
      const rangeLabel = `${rangeStart}-${rangeEnd}`;
      acc[rangeLabel] = acc[rangeLabel] || {};
      acc[rangeLabel][age] = (acc[rangeLabel][age] || 0) + 1;
    }
    return acc;
  }, {});
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: (params) => {
        const range = params.name;
        const agesInRange = detailedData[range] || {};
        const ageDetails = Object.entries(agesInRange)
          .map(([age, count]) => `Edad ${age} años: ${count} personas`)
          .join('<br>');
        return `<b>${params.seriesName}</b><br>${params.name}: ${params.value} (${params.percent}%)<br><br>${ageDetails}`;
      }
    },
    legend: {
      top: '3%',
      left: 'center',
    },
    color: colors,
    series: [
      {
        name: title,
        type: 'pie',
        radius: ['35%', '70%'],
        center: ['50%', '60%'],
        data: data.map((item) => ({ value: item.count, name: item.label })),
      },
    ],
  };
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <h3>{title}</h3>
      <ReactECharts option={option} />
    </div>
  );
};
export default ChartPie;