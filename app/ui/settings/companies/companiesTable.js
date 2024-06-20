'use client';

import React, { useEffect, useState } from 'react';
import { CompaniesTableSkeleton, FinancialDataTableSkeleton } from '../../skeletons';

const CompaniesTable = ({query, currentPage, companyAdded}) => {
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(currentPage);
  const [pageSize] = useState(10); // You can make this adjustable if needed
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/companies?&search=${query}&currentPage=${page}&pageSize=${pageSize}`);
        const data = await response.json();
        setCompanies(data.data);
        setTotalRecords(data.totalRecords);
        setLoading(false);
        console.log(data);
        
      } catch (error) {
        console.error('Error fetching companies:', error);
        setError('Error fetching companies');
        setLoading(false);
      } finally {
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
    <div className="container">
      <div className='table-responsive'>
        <table className="table table-bordered table-striped">
            <thead>
              <tr>
                  <th>Company</th>
                  <th>Sector</th>
              </tr>
            </thead>
            <tbody>
            {companies.map((row) => (
                <tr key={row.id}>
                  <td>{row.company}</td>
                  <td>{row.sector}</td>
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
      <nav aria-label="Page navigation example" className='d-flex justify-content-end'>
        <ul class="pagination d-flex align-items-center">
          <li class="page-item" >
            <button class="page-link btn-disabled" href="#"
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>Previous</button>
          </li>
          <li class="page-item"><span className="page-link">Page {page} of {totalPages}</span></li>
          <li class="page-item">
            <button class="page-link"
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages} href="#">Next</button>
            </li>
        </ul>
      </nav>
    </div>
  );
}else{
  return <CompaniesTableSkeleton />
}
};

export default CompaniesTable;
