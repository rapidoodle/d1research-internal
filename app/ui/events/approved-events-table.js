'use client';

import React, { useEffect, useRef, useState } from 'react';
import { EventsTableSkeleton } from '../skeletons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faEdit, faEye, faList } from '@fortawesome/free-solid-svg-icons';
import Pagination from '@/app/components/Pagination';
import formatDate from '@/app/utils';
import { Scheduler } from '@aldabil/react-scheduler';
import DataTableComponent from '@/app/components/DataTablesComponent';
import { approvedEventsColumns } from '@/app/lib/table-columns/columns';
import moment from 'moment';
import { all } from 'axios';
import Swal from 'sweetalert2';

const ApprovedEventsTable = ({query, currentPage, eventAdded}) => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(currentPage);
  const [pageSize] = useState(10); 
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [isCalendarView, setIsCalendarView] = useState(false);

  useEffect(() => {
    
      fetchEvents();

  }, [query, page, pageSize, eventAdded]);


  const totalPages = Math.ceil(totalRecords / pageSize);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/clinked/events`);
      const data = await response.json();

      setEvents(data);
      setTotalRecords(data.totalResults);
      setLoading(false);

      // Add events to calendar
      const events = data.map((event) =>({
        event_id: event.id,
        title: event.friendlyName,
        start: event.startDate,
        end: event.endDate,
      }));

      setCalendarEvents(events);
    } catch (error) {
      setError('Error fetching approved events');
      setLoading(false);
    }
  };
  
  const handleConfirmDelete = async (id) => {
    try {
      const response = await fetch(`/api/clinked/events/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      fetchEvents();

    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };


  if (error) {
    return <p>{error}</p>;
  }

  const handleDelete = async (event) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {

          await handleConfirmDelete(event.id);
  
          Swal.fire({
            title: "Deleted!",
            text: "Event has been deleted.",
            icon: "success"
          });
        } catch (error) {
          console.error('Error deleting event:', error);
          Swal.fire({
            title: "Error!",
            text: "There was a problem deleting the event.",
            icon: "error"
          });
        }
      }
    });
  }

  const handleEdit = async (id) => {
      
  }
  const approvedEventsColumnsWithActions =  approvedEventsColumns(handleDelete, handleEdit);

  if(!loading){
  return (
    <div>
        <div className='bg-light p-3 d-flex align-items-center justify-content-end'>
            <div>
                <button className={`btn ${isCalendarView ? 'btn-primary' : 'btn-light'}`} onClick={() => setIsCalendarView(true)}>
                    <FontAwesomeIcon icon={faCalendar} /> 
                </button>
                <button className={`btn ms-2 ${!isCalendarView ? 'btn-primary' : 'btn-light'}`} onClick={() => setIsCalendarView(false)}>
                    <FontAwesomeIcon icon={faList} /> 
                </button>
            </div>
        </div>
        {!isCalendarView && ( <>
      <div className='table-responsive'>
        <DataTableComponent columns={approvedEventsColumnsWithActions} data={events} />
      </div> 
      {totalRecords > 0 && ( 
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      )}
      </>)}

      {isCalendarView && ( <>
      <Scheduler
            view="month"
            editable={false}
            events={calendarEvents}
          />
        </>)}
    </div>
  );
}else{
  return <EventsTableSkeleton />
}
};

export default ApprovedEventsTable;
