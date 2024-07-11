import React, { useEffect, useState, useRef } from 'react';
import { FinancialDataTableSkeleton } from '../skeletons';
import Pagination from '@/app/components/Pagination';
import { formatNumber } from '@/app/lib/utils';
import DataTableComponent from '@/app/components/DataTablesComponent';
import { financialDataColumns } from '@/app/lib/table-columns/columns';

const FinancialDataTable = ({ query, currentPage, fileUploaded }) => {
  const [financialData, setFinancialData] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(currentPage);
  const [pageSize] = useState(1000); // You can make this adjustable if needed
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);

  const initialRender = useRef(true);

  useEffect(() => {
    const fetchFinancialData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/financial-data?&search=${query}&currentPage=${page}&pageSize=${pageSize}`);
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
            columns={financialDataColumns} 
            data={financialData} 
            loading={loading} />
        </div>
        {!loading && <Pagination page={page} totalPages={totalPages} setPage={setPage} /> }
      </div>
    );

};

export default FinancialDataTable;
