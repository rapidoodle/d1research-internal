import React, { useEffect, useState } from 'react';
import '@/app/styles/custom-table.css';
import { cleanField, format2Decimal } from '../lib/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import { customSelectStyle, customTableSelectStyle } from '../lib/custom-styles/custom-styles';

const CustomTableComponent = ({ columns, data, inputFormat, fixedHeader }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedTicker, setSelectedTicker] = useState('');
  const [uniqueTickers, setUniqueTickers] = useState([]);

  useEffect(() => {
    if (selectedTicker === '') {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter(item => item.equity_ticker === selectedTicker));
    }
  }, [selectedTicker, data]);

const onSort = (key) => {
  let direction = 'asc';
  if (sortConfig.key === key && sortConfig.direction === 'asc') {
    direction = 'desc';
  }
  setSortConfig({ key, direction });

  const sortedArray = [...filteredData].sort((a, b) => {
    const aValue = getDataValue(a[key]);
    const bValue = getDataValue(b[key]);

    if(key !== 'equity_ticker') {
      // Handle NaN and non-string characters
      const aIsValid = isValidValue(aValue);
      const bIsValid = isValidValue(bValue);

      if (!aIsValid && !bIsValid) return 0;
      if (!aIsValid) return 1; // Move NaN or invalid to the bottom
      if (!bIsValid) return -1; // Move NaN or invalid to the bottom
    }

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

  const isValidValue = (value) => {
    return value !== null && value !== undefined && !isNaN(value);
  };


  const handleTickerChange = (event) => {
    setSelectedTicker(event.value);
  };

  useEffect(() => {
    const uniqueTickers = [...new Set(data.map(item => item.equity_ticker))];
    const all = { value: '', label: 'All' };
    
    const formattedTickers = uniqueTickers.map(ticker => ({
      value: ticker,
      label: ticker
    }));
    
    formattedTickers.unshift(all);
    
    setUniqueTickers(formattedTickers);
  }, [data]);

  return (
    <div className='custom-table-container'>
      <table className="table table-striped table-hover w-100" id='custom-table'>
        <thead className={fixedHeader && 'sticky-top'}>
          <tr>
            {columns.map((col, index) => (
              <th key={index} className={`cursor-pointer ${index === 0 && 'ps-2'}`}>
                <div className={`d-flex align-items-center ${index !== 0 && 'justify-content-center'}`}>
                  {index !== 0 && <span onClick={() => onSort(col.selector)}>{col.name}</span>}
                  {col.selector === 'equity_ticker' && (
                    <>
                    {/* <select value={selectedTicker} onChange={handleTickerChange} className='ticker-select'>
                      <option value=''>All</option>
                      {uniqueTickers.map((ticker, index) => (
                        <option key={index} value={ticker}>{ticker}</option>
                      ))}
                    </select> */}
                  {uniqueTickers.length > 1 &&
                    <Select 
                      onChange={handleTickerChange}
                      styles={customTableSelectStyle}
                      defaultValue={uniqueTickers[0]}
                      options={uniqueTickers} />
                  }
                    </>
                  )}
                  
                  <FontAwesomeIcon 
                    className={`ms-1 cursor-pointer f-13 ${sortConfig.key === col.selector ? 'text-success' : 'text-secondary'}`}
                    onClick={() => onSort(col.selector)} 
                    icon={sortConfig.key === col.selector ? sortConfig.direction === 'asc' ? faSortUp : faSortDown : faSort} />
                </div>
              </th>
            ))}

          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex} data-value={row[col.selector]}>
                  {isNaN(row[col.selector]) && colIndex === 0 ? cleanField(row[col.selector]) : inputFormat(row[col.selector])}
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
