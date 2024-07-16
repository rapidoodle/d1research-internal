import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const ApexStackedBarChart = ({xAxisData}) => {
  const rawData = [
    [
      { "dps_z": 8.25, "year": 2027, "company": "VW", "equity_ticker": "VOW3 GY" },
      { "dps_z": 8, "year": 2026, "company": "VW", "equity_ticker": "VOW3 GY" },
      { "dps_z": 8.3, "year": 2025, "company": "VW", "equity_ticker": "VOW3 GY" },
      { "dps_z": 9.06, "year": 2024, "company": "VW", "equity_ticker": "VOW3 GY" }
    ],
    [
      { "dps_z": 4.5, "year": 2027, "company": "Renault", "equity_ticker": "RNO FP" },
      { "dps_z": 3.75, "year": 2026, "company": "Renault", "equity_ticker": "RNO FP" },
      { "dps_z": 3, "year": 2025, "company": "Renault", "equity_ticker": "RNO FP" },
      { "dps_z": 1.85, "year": 2024, "company": "Renault", "equity_ticker": "RNO FP" }
    ],
    [
      { "dps_z": 5.5, "year": 2027, "company": "BMW", "equity_ticker": "BMW GY" },
      { "dps_z": 5.5, "year": 2026, "company": "BMW", "equity_ticker": "BMW GY" },
      { "dps_z": 5.65, "year": 2025, "company": "BMW", "equity_ticker": "BMW GY" },
      { "dps_z": 6, "year": 2024, "company": "BMW", "equity_ticker": "BMW GY" }
    ],
    [
      { "dps_z": 5.05, "year": 2027, "company": "Mercedes", "equity_ticker": "MBG GY" },
      { "dps_z": 4.8, "year": 2026, "company": "Mercedes", "equity_ticker": "MBG GY" },
      { "dps_z": 4.7, "year": 2025, "company": "Mercedes", "equity_ticker": "MBG GY" },
      { "dps_z": 5.3, "year": 2024, "company": "Mercedes", "equity_ticker": "MBG GY" }
    ]
  ];

  const years = [...new Set(rawData.flat().map(item => item.year))].sort((a, b) => a - b);

  const [chartOptions] = useState({
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
    },
    xaxis: {
      categories: years,
    },
    stroke: {
      show: true,
      width: 1,
      colors: ['#fff']
    },
  });

  const [chartSeries] = useState(rawData.map(companyData => ({
    name: companyData[0].company,
    data: companyData.map(item => item.dps_z)
  })));

  return (
    <div>
      <Chart options={chartOptions} series={chartSeries} type="bar" height={225} />
    </div>
  );
};

export default ApexStackedBarChart;
