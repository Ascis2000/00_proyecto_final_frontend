import React from 'react';
import ChartContainer from './ChartContainer';
import ChartSanitary from './ChartSanitary';
import '../../../styles/components/_AdminDashboard.scss';


function ChartDashboard() {
  return (
    <div>
      <article className="echarts-for-react">
        <ChartContainer />
      </article>
      <article className="echarts-for-react">
        <ChartSanitary />
      </article>
    </div>
  );
}

export default ChartDashboard;
