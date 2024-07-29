'use client';

import React, { useEffect, useRef, useState } from 'react';
import { CompaniesTableSkeleton, FinancialDataTableSkeleton } from '../../skeletons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import Pagination from '@/app/components/Pagination';
import { cleanCompanyName } from '@/app/lib/utils';
import DataTableComponent from '@/app/components/DataTablesComponent';
import { companiesTableColumns } from '@/app/lib/table-columns/columns';

const CompaniesTable = ({query, currentPage, companyAdded}) => {
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(currentPage);
  const [pageSize] = useState(1000); // You can make this adjustable if needed
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);

  const initialRender = useRef(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/companies?&search=${query}&currentPage=${page}&pageSize=${pageSize}`);
        const data = await response.json();
        setCompanies(data.data);
        setTotalRecords(data.totalRecords);
        setLoading(false);
        
      } catch (error) {
        setError('Error fetching companies');
        setLoading(false);
      }
    };

      fetchCompanies();
    
  }, [query, page, pageSize, companyAdded]);

  const totalPages = Math.ceil(totalRecords / pageSize);

  if (error) {
    return <p>{error}</p>;
  }

  if(!loading){
  return (
    <div>
      <DataTableComponent columns={companiesTableColumns} data={companies} />
    </div>
  );
}else{
  return <CompaniesTableSkeleton />
}
};

export default CompaniesTable;
