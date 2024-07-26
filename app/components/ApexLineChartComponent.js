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
      style : {
        fontFamily: '__Montserrat_08efcb, __Montserrat_Fallback_08efcb'
      },
      labels:{
        style: {
          fontFamily: '__Montserrat_08efcb, __Montserrat_Fallback_08efcb',
        }
      }
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
    },
    stroke: {
      curve: 'smooth',
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      fontFamily: '__Montserrat_08efcb, __Montserrat_Fallback_08efcb',
    },
    tooltip: {
      style : {
        fontFamily: '__Montserrat_08efcb, __Montserrat_Fallback_08efcb'
      },
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
