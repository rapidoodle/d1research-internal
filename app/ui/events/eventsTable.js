'use client';

import React, { useEffect, useRef, useState } from 'react';
import { EventsTableSkeleton } from '../skeletons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faEdit, faEye, faList } from '@fortawesome/free-solid-svg-icons';
import Pagination from '@/app/components/Pagination';
import formatDate from '@/app/utils';
import { Scheduler } from '@aldabil/react-scheduler';
import DataTableComponent from '@/app/components/DataTablesComponent';
import { eventsColumns } from '@/app/lib/table-columns/columns';

const EventsTable = ({query, currentPage, eventAdded}) => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(currentPage);
  const [pageSize] = useState(10); 
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [isCalendarView, setIsCalendarView] = useState(false);
  const initialRender = useRef(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/events?&search=${query}&currentPage=${page}&pageSize=${pageSize}`);
        const data = await response.json();
        setEvents(data.data);
        setTotalRecords(data.totalRecords);
        setLoading(false);

        // Add events to calendar
        const events = data.data.map((event) => ({
          event_id: event.id,
          title: event.friendly_name,
          start: new Date(event.start_date),
          end: new Date(event.end_date),
        }));

        setCalendarEvents(events);
      } catch (error) {
        setError('Error fetching events');
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
        <div className='bg-light p-3 d-flex align-items-center justify-content-end'>
            <div>
                <button className={`btn ${isCalendarView ? 'btn-primary' : 'btn-light'}`} onClick={() => setIsCalendarView(!isCalendarView)}>
                    <FontAwesomeIcon icon={faCalendar} /> 
                </button>
                <button className={`btn ms-2 ${!isCalendarView ? 'btn-primary' : 'btn-light'}`} onClick={() => setIsCalendarView(!isCalendarView)}>
                    <FontAwesomeIcon icon={faList} /> 
                </button>
            </div>
        </div>
        {!isCalendarView && ( <>
      <div className='table-responsive'>
        <DataTableComponent columns={eventsColumns} data={events} />
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

export default EventsTable;
