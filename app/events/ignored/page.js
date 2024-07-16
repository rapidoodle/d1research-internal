'use client';

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Search from "@/app/ui/search";
import { Button, Modal } from "react-bootstrap";
import NewEventForm from "../../ui/events/NewEventForm";
import PendingEventsTable from "@/app/ui/events/pending-events-table";
import IgnoredEventsTable from "@/app/ui/events/ignored-events-table";

export default function Page(searchParams) {
  const query = searchParams.searchParams?.query || '';
  const currentPage = Number(searchParams.searchParams?.page) || 1;
  const [eventAdded, setEventAdded] = useState(false);
  const [show, setShow] = useState(false);
  const [scrapeData, setScrapeData] = useState([]);
  
    return (
      <main>
        <div className="bg-light p-3 row">
          <h5 className="mb-0 col">Ignored events</h5>
          {/* {JSON.stringify(scrapeData)} */}
          <div className="ms-auto col d-flex justify-content-end">
            <div>
              <Search placeholder="Event name" />
            </div>
          </div>
        </div>
        <div className="mt-3">
          <IgnoredEventsTable 
            query={ query }
            currentPage={ currentPage }
            eventAdded={ eventAdded } />
        </div>
      </main>
    )
  }
  