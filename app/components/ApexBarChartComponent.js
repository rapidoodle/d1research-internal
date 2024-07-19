import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const ApexStackedBarChart = ({chartData, xAxisData}) => {

  const chartSeries = chartData.map(seriesData => ({
    name: Object.keys(seriesData)[0],
    data: Object.values(seriesData)[0],
  }));

  const [chartOptions] = useState({
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      toolbar: {
        show: false // Disable the toolbar
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
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
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#F7F1E3', '#2F5651'] // Set text color for data labels
      },
    },
    xaxis: {
      categories: xAxisData,
      color: '#000'
    },
    colors: [ '#2F5651', '#F7F1E3'], // Add custom colors here
    stroke: {
      show: true,
      width: 1,
      colors: ['#fff']
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return `${val.toLocaleString()}%`;
        }
      }
    },
    fill: {
      opacity: 1
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      offsetY: 10
    }
  });

  return (
    <div>
      <Chart 
        options={chartOptions} 
        series={chartSeries} 
        type="bar" 
        height={225} 
      />
    </div>
  );
};

export default ApexStackedBarChart;
