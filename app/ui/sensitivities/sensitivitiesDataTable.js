import React, { useEffect, useState, useRef } from 'react';
import Pagination from '@/app/components/Pagination';
import DataTableComponent from '@/app/components/DataTablesComponent';
import { financialDataColumns, sensitivitiesTableColumns } from '@/app/lib/table-columns/columns';

const SensitivitiesDataTable = ({ query, currentPage, fileUploaded }) => {
  const [financialData, setFinancialData] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(currentPage);
  const [pageSize] = useState(10000); // You can make this adjustable if needed
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFinancialData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/sensitivities?search=${query}&currentPage=${page}&pageSize=${pageSize}`);
        const data = await response.json();
        setFinancialData(data.data);
        setTotalRecords(data.totalRecords);
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.error('Error fetching financial data:', error);
        setError('Error fetching financial data');
        setLoading(false);
      }
    };

      fetchFinancialData();
    
  }, [query, page, pageSize, fileUploaded]);

  const totalPages = Math.ceil(totalRecords / pageSize);

  if (error) {
    return <p>{error}</p>;
  }

    return (
      <div className="container-fluid">
        <div className='table-responsive'>
          <DataTableComponent 
            columns={sensitivitiesTableColumns} 
            data={financialData} 
            loading={loading} />
        </div>
        {!loading && <Pagination page={page} totalPages={totalPages} setPage={setPage} /> }
      </div>
    );

};

export default SensitivitiesDataTable;
