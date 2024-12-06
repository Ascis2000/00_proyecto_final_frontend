import React from 'react';
import ChartPerson from './ChartPerson';
import ChartSanitary from './ChartSanitary';

function AdminDashboard() {
  return (
    <div>
      <article className="echarts-for-react">
        <ChartPerson />
      </article>
      <article className="echarts-for-react">
        <ChartSanitary />
      </article>
    </div>
  );
}

export default AdminDashboard;
