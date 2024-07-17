import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const ApexStackedBarChart = ({chartData, xAxisData}) => {
  const data = [
    {
      "Dividend": [5556, 5616, 4744, 4581]
    },
    {
      "Share Buyback": [1941, 4059, 3000, 3000]
    }
  ];

  const xAxis = ["FY23", "FY24", "FY26e", "FY27e"];

  const chartSeries = chartData.map(seriesData => ({
    name: Object.keys(seriesData)[0],
    data: Object.values(seriesData)[0]
  }));

  const [chartOptions] = useState({
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      categories: xAxisData,
    },
    stroke: {
      show: true,
      width: 1,
      colors: ['#fff']
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val.toLocaleString();
        }
      }
    },
    fill: {
      opacity: 1
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      offsetX: 40
    }
  });

  return (
    <div>
      <Chart options={chartOptions} series={chartSeries} type="bar" height={225} />
    </div>
  );
};

export default ApexStackedBarChart;
