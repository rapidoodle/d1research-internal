import React, { useEffect, useState } from 'react';
import '@/app/styles/custom-table.css';
import { cleanField, format2Decimal } from '../lib/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';

const CustomTableComponent = ({ columns, data }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedTicker, setSelectedTicker] = useState('');

  useEffect(() => {
    if (selectedTicker === '') {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter(item => item.equity_ticker === selectedTicker));
    }
  }, [selectedTicker, data]);

  const onSort = (key) => {
    let direction = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });

    const sortedArray = [...filteredData].sort((a, b) => {
      const aValue = getDataValue(a[key]);
      const bValue = getDataValue(b[key]);

      if (aValue === bValue) return 0;
      if (direction === 'asc') return aValue > bValue ? 1 : -1;
      return aValue > bValue ? -1 : 1;
    });
    setFilteredData(sortedArray);
  };

  const getDataValue = (value) => {
    if (typeof value === 'string') {
      if (value.includes('%')) {
        return parseFloat(value.replace('%', ''));
      } else if (!isNaN(value)) {
        return parseFloat(value);
      }
    }
    return value;
  };

  const uniqueTickers = [...new Set(data.map(item => item.equity_ticker))];

  const handleTickerChange = (event) => {
    setSelectedTicker(event.target.value);
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover w-100" id='custom-table'>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th className='cursor-pointer' key={index}>
                {index !== 0 && <span onClick={() => onSort(col.selector)}>{col.name}</span>}
                {col.selector === 'equity_ticker' && (
                  <select value={selectedTicker} onChange={handleTickerChange} className='ticker-select'>
                    <option value=''>All</option>
                    {uniqueTickers.map((ticker, index) => (
                      <option key={index} value={ticker}>{ticker}</option>
                    ))}
                  </select>
                )}
                
                <FontAwesomeIcon 
                  className='ms-1'
                  onClick={() => onSort(col.selector)} 
                  icon={sortConfig.key === col.selector ? sortConfig.direction === 'asc' ? faSortUp : faSortDown : faSort} />
              </th>
            ))}

          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex} data-value={row[col.selector]}>
                  {isNaN(row[col.selector]) ? cleanField(row[col.selector]) : format2Decimal(row[col.selector])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTableComponent;
