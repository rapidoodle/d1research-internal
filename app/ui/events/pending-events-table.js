'use client';

import React, { useEffect, useRef, useState } from 'react';
import { EventsTableSkeleton } from '../skeletons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faEdit, faEye, faList } from '@fortawesome/free-solid-svg-icons';
import Pagination from '@/app/components/Pagination';
import formatDate from '@/app/utils';
import { Scheduler } from '@aldabil/react-scheduler';
import DataTableComponent from '@/app/components/DataTablesComponent';
import { pendingEventsColumns } from '@/app/lib/table-columns/columns';
import ModalComponent from '@/app/components/ModalComponent';
import EditEventForm from './EditEventForm';
import Swal from 'sweetalert2';
import PageSpinner from '@/app/components/PageSpinner';

const PendingEventsTable = ({query, currentPage, eventAdded}) => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(currentPage);
  const [pageSize] = useState(1000); 
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [isCalendarView, setIsCalendarView] = useState(false);
  const initialRender = useRef(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [saving, setSaving] = useState(false);


  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/events?&search=${query}&currentPage=${page}&pageSize=${pageSize}&status=0`);
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

  useEffect(() => {
    
      fetchEvents();

  }, [query, page, pageSize, eventAdded]);

  const totalPages = Math.ceil(totalRecords / pageSize);

  if (error) {
    return <p>{error}</p>;
  }


  const handleReview = (event) => {
    setSelectedEvent(event);
    setShowModal(!showModal);
   }

   const handleSave = () => {
    setSaving(true);
   }

   const handleClose = () => {
    setShowModal(!showModal);
    setSaving(false);
   }

   const onEventSaved = () => {
    setShowModal(!showModal);
    setSaving(false);
    fetchEvents();
   }

   const handleApprove = (event) => {
    Swal.fire({
      title: 'Approve event?',
      text: "Are you sure you want to approve this event?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Approve'
    }).then(async (result) => {
      console.log(result);
      if (result.isConfirmed) {
        handleChangeStatus(event, 1);
      }
    })
   }

   const handleIgnore = (event) => {
    Swal.fire({
      title: 'Ignore event?',
      text: "Are you sure you want to ignore this event?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ignore'
    }).then(async (result) => {
      console.log(result);
      if (result.isConfirmed) {
        handleChangeStatus(event, 2);
      }
    })
   }

   const handleDelete = (event) => {
    Swal.fire({
      title: 'Delete event?',
      text: "Are you sure you want to delete this event?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then(async (result) => {
      console.log(result);
      if (result.isConfirmed) {
        handleDeleteEvent(event);
      }
    })
   }
 
   const pendingEventsColumnsWithActions = pendingEventsColumns(handleReview, handleApprove, handleIgnore, handleDelete);

   const handleChangeStatus = async(event, status) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/events/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: event.id, status: status, action: 'set-status'})
      });

      if (response.ok) {
        if(status === 1){

          setLoading(false);
        Swal.fire(
          'Approved!',
          'Event has been approved.',
          'success'
        )}else{
          Swal.fire(
            'Ignored!',
            'Event has been ignored.',
            'warning'
          )
        }
      }else{
        setLoading(false);
        Swal.fire(
          'Error!',
          'Error approving event. Please contact support.',
          'error'
        )
      }

      fetchEvents();
      
    } catch (error) {
      Swal.fire(
        'Error!',
        'Error approving event. Please contact support.',
        'error'
      )
    }
   }

   const handleDeleteEvent = async(event) => {
      try {
        setLoading(true);
        const response = await fetch(`/api/events/`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: event.id, action: 'delete'})
        });

        if (response.ok) {
          setLoading(false);

          Swal.fire(
            'Deleted!',
            'Event has been deleted.',
            'success'
          )
        }
        fetchEvents();

      } catch (error) {
        Swal.fire(
          'Error!',
          'Error deleting event. Please contact support.',
          'error'
        )
      }
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
        <DataTableComponent columns={pendingEventsColumnsWithActions} data={events} />
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
        </>
      )}
    <ModalComponent 
      show={showModal} 
      size={'lg'} 
      loading={loading}
      handleSave={handleSave}
      handleClose={handleClose}>
        {selectedEvent &&
          <EditEventForm 
            event={selectedEvent} 
            onEventAdded={onEventSaved}
            handleSave={saving} 
          />
        }
    </ModalComponent>

    </div>
  );
}else{
  return <PageSpinner />
}
};

export default PendingEventsTable;
