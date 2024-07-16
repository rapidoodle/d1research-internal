import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const ApexLineChartComponent = ({xaxisData, seriesData}) => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'line',
      height: 250,
    },
    xaxis: {
      categories: xaxisData,
    },
    stroke: {
      curve: 'smooth',
    },
  });

  return (
    <div>
      <Chart 
        options={chartOptions} 
        series={seriesData} 
        type="line" 
        height={225} 
      />
    </div>
  );
};

export default ApexLineChartComponent;
