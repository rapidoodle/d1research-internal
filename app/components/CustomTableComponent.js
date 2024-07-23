import React from 'react';
import '@/app/styles/custom-table.css';

const CustomTableComponent = ({ columns, data }) => {
  // Function to format numbers
  const formatNumber = (num) => {
    return num !== null ? num.toFixed(2) : 'N/A';
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover w-100">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}> {isNaN(row[col.selector]) ? row[col.selector] : formatNumber(row[col.selector])} </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTableComponent;
