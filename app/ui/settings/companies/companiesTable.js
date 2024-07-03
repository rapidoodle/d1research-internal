'use client';

import React, { useEffect, useRef, useState } from 'react';
import { CompaniesTableSkeleton, FinancialDataTableSkeleton } from '../../skeletons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import Pagination from '@/app/components/Pagination';
import { cleanCompanyName } from '@/app/lib/utils';

const CompaniesTable = ({query, currentPage, companyAdded}) => {
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(currentPage);
  const [pageSize] = useState(20); // You can make this adjustable if needed
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
      <div className='table-responsive'>
        <table className="table table-hovered table-condensed table-striped">
            <thead>
              <tr>
                  <th>Company</th>
                  <th>Sector</th>
                  <th>Tags</th>
                  <th></th>
              </tr>
            </thead>
            <tbody>
            {companies.map((row) => (
                <tr key={row.id}>
                  <td>{row.company}</td>
                  <td>{row.sector}</td>
                  <td>{row.tags.split(',').map((tag, index) => 
                    <span className='badge me-1 badge-tag' key={index}>
                      { tag }
                    </span>)}
                  </td>
                  <td>
                    <a href={`${row.iframe}`} target='_blank'>{row.iframe}</a>
                    </td>
                  <td align='right'>
                    <button className='btn btn-success btn-sm'>
                      <span><FontAwesomeIcon icon={faEdit} /> Edit</span>
                    </button>
                    <a target='_blank' className='btn ms-2 btn-success btn-sm' href={`/companies/${cleanCompanyName(row.company)}`}>
                      <span><FontAwesomeIcon icon={faEye}/> View page</span>
                    </a>
                  </td>
                </tr>
            ))}
            {companies.length === 0 && (
              <><tr>
                <td colSpan={44} align='center'>No available data</td>
                </tr></>
            )}
            </tbody>
        </table>
      </div>
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
}else{
  return <CompaniesTableSkeleton />
}
};

export default CompaniesTable;
