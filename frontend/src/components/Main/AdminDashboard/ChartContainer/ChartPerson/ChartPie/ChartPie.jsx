import React from 'react';
import ReactECharts from 'echarts-for-react';

const ChartPerson = ({ title, data }) => {
  const colors = ['#44BAC1', '#9C4AA0', '#FFB024', '#F45540', '#A5165B', '#E2007E', '#1D1D1B'];

  const option = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    color: colors, 
    series: [
      {
        name: title,
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '70%'],
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

export default ChartPerson;
