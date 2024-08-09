import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ["latin"], weight: ['100', '300', '400', '500', '700', '900']});
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
        },
        style: {
          fontFamily: '__Montserrat_08efcb, __Montserrat_Fallback_08efcb',
        }
      },
      style: {
        colors: ['#F7F1E3'], // Set text color for the y-axis labels
        fontFamily: '__Montserrat_08efcb, __Montserrat_Fallback_08efcb',
      }
    },
    dataLabels: {
      formatter: function (val) {
        return `${val}%`;
      },
      enabled: true,
      style: {
        colors: ['#F7F1E3', '#2F5651'], // Set text color for data labels
        fontFamily: '__Montserrat_08efcb, __Montserrat_Fallback_08efcb',
      },
    },
    xaxis: {
      categories: xAxisData,
      labels: {
        style: {
          fontFamily: '__Montserrat_08efcb, __Montserrat_Fallback_08efcb',
          color: '#000',
        }
      }
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
      },
      style : {
        fontFamily: '__Montserrat_08efcb, __Montserrat_Fallback_08efcb'
      },
    },
    fill: {
      opacity: 1
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      fontFamily: '__Montserrat_08efcb, __Montserrat_Fallback_08efcb',
      offsetY: 10
    },
  });

  return (
    <div className='chart-container'>
      <Chart 
        options={chartOptions}  
        className={montserrat.className}
        series={chartSeries} 
        type="bar" 
        height={225} 
      />
    </div>
  );
};

export default ApexStackedBarChart;
