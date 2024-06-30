'use client';

import React, { useEffect, useState } from 'react';
import { EventsTableSkeleton } from '../skeletons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import Pagination from '@/app/components/Pagination';
import formatDate from '@/app/utils';

const EventsTable = ({query, currentPage, eventAdded}) => {
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(currentPage);
  const [pageSize] = useState(20); // You can make this adjustable if needed
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
        setLoading(true);
        try {
          const response = await fetch(`/api/events?&search=${query}&currentPage=${page}&pageSize=${pageSize}`);
          const data = await response.json();
          setCompanies(data.data);
          setLoading(false);
          
        } catch (error) {
          setError('Error fetching companies');
          setLoading(false);
        }
      };
  
      fetchEvents();

  }, [query, page, pageSize, eventAdded]);

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
                  <th>Title</th>
                  <th>Start date</th>
                  <th>End date</th>
                  <th>Location</th>
                  <th>Tags</th>
                  <th></th>
              </tr>
            </thead>
            <tbody>
            {companies.map((row) => (
                <tr key={row.id}>
                  <td>{row.company}</td>
                  <td>{row.friendly_name}</td>
                  <td>{formatDate(row.start_date)}</td>
                  <td>{formatDate(row.end_date)}</td>
                  <td>{row.location}</td>
                  <td>{row.tags.split(',').map((tag, index) => 
                    <span className='badge me-1 badge-tag' key={index}>
                      { tag }
                    </span>)}
                  </td>
                  <td align='right'>
                    <button className='btn btn-success btn-sm'>
                      <span><FontAwesomeIcon icon={faEdit} /> Edit</span>
                    </button>
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
  return <EventsTableSkeleton />
}
};

export default EventsTable;
