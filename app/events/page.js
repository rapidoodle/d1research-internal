'use client';

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Search from "@/app/ui/search";
import NewEventForm from "../ui/events/NewEventForm";
import EventsTable from "../ui/events/eventsTable";
import { Scheduler } from "@aldabil/react-scheduler";

export default function Page(searchParams) {
  const query = searchParams.searchParams?.query || '';
  const currentPage = Number(searchParams.searchParams?.page) || 1;
  const [eventAdded, setEventAdded] = useState(false);

  // Callback to update the state
  const handleEventAdded = () => {
    setEventAdded(!eventAdded);
  };

  useEffect(() => {
    if (eventAdded && typeof window !== 'undefined') {
      const closeButton = document.querySelector('.btn-close');
      if (closeButton) {
        closeButton.click();
      }
    }
  }, [eventAdded]);

  return (
    <main>
      <div className="bg-light p-3 row">
        <h5 className="mb-0 col">Events</h5>

        <div className="ms-auto col d-flex justify-content-end">
          <div>
            <Search placeholder="Event name" />
          </div>
          <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#addEventModal">
          <FontAwesomeIcon icon={faPlus} className="me-1" /> Add new event
          </button>
        </div>
      </div>

      <div className="mt-3">
        <EventsTable 
          query={ query }
          currentPage={ currentPage }
          eventAdded={ eventAdded } />
      </div>

      <div class="modal fade modal-lg"  id="addEventModal" tabindex="-1" aria-labelledby="addEventModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="addEventModalLabel">Add new event</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <NewEventForm onEventAdded={handleEventAdded} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
  