import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const ApexLineChartComponent = ({xaxisData, seriesData}) => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'line',
      height: 250,
      toolbar: {
        show: false // Disable the toolbar
      }
    },
    xaxis: {
      categories: xaxisData,
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return `${val}%`;
        }
      },
      style: {
        colors: ['#F7F1E3'], // Set text color for the y-axis labels
      }
    },
    stroke: {
      curve: 'smooth',
    },
    colors: ['#2F5651', '#FF7F50', '#87CEEB', '#DAA520', '#FF6347'], // Set the color for the first line
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
