import React from 'react';
import '@/app/styles/custom-table.css';
import { formatNumber } from '../lib/utils';

const CustomTableComponent = ({ columns, data }) => {

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover w-100" id='custom-table'>
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
