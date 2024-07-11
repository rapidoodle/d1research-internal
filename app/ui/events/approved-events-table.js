'use client';

import React, { useEffect, useRef, useState } from 'react';
import { EventsTableSkeleton } from '../skeletons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faEdit, faEye, faList } from '@fortawesome/free-solid-svg-icons';
import Pagination from '@/app/components/Pagination';
import formatDate from '@/app/utils';
import { Scheduler } from '@aldabil/react-scheduler';
import DataTableComponent from '@/app/components/DataTablesComponent';
import { approvedEventsColumns, eventsColumns } from '@/app/lib/table-columns/columns';
import moment from 'moment';
import { all } from 'axios';

const ApprovedEventsTable = ({query, currentPage, eventAdded}) => {
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
        const response = await fetch(`/api/clinked/events`);
        const data = await response.json();
        setEvents(data.items);
        setTotalRecords(data.totalResults);
        setLoading(false);


        // Add events to calendar
        const events = data.items.map((event) =>({
          event_id: event.id,
          title: event.friendlyName,
          start: new Date(moment(event.startDate)),
          end: new Date(moment(event.endDate)),
        }));

        setCalendarEvents(events);
        console.log(events);
      } catch (error) {
        setError('Error fetching approved events');
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
        <DataTableComponent columns={approvedEventsColumns} data={events} />
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
