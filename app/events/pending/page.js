'use client';

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Search from "@/app/ui/search";
import { Button, Modal } from "react-bootstrap";
import NewEventForm from "../../ui/events/NewEventForm";
import PendingEventsTable from "@/app/ui/events/pending-events-table";

export default function Page(searchParams) {
  const query = searchParams.searchParams?.query || '';
  const currentPage = Number(searchParams.searchParams?.page) || 1;
  const [eventAdded, setEventAdded] = useState(false);
  const [show, setShow] = useState(false);
  const [scrapeData, setScrapeData] = useState([]);

  // Callback to update the state
  const handleEventAdded = () => {
    setEventAdded(!eventAdded);
    handleClose();
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const handleScraper = async () => {
  //   try {
  //     const response = await fetch('/api/scraper?site=total');
  //     if (!response.ok) {
  //       throw new Error('Error scraping events');
  //     }

  //     setScrapeData(await response.json());
      
  //   } catch (error) {
  //     console.error('Error scraping events:', error);
  //   }
  // }
  
    return (
      <main>
        <div className="bg-light p-3 row">
          <h5 className="mb-0 col">Pending approval events</h5>
          {/* {JSON.stringify(scrapeData)} */}
          <div className="ms-auto col d-flex justify-content-end">
            <div>
              <Search placeholder="Event name" />
            </div>

            <Button size="sm" variant="primary" onClick={handleShow}>
              <FontAwesomeIcon icon={faPlus} className="me-1" /> Add new event
            </Button>

            {/* <Button className="ms-2" size="sm" variant="primary" onClick={handleScraper}>
              <FontAwesomeIcon icon={faPlus} className="me-1" /> Scrapeeee
            </Button> */}
          </div>
        </div>

        <div className="mt-3">
          <PendingEventsTable 
            query={ query }
            currentPage={ currentPage }
            eventAdded={ eventAdded } />
        </div>

        <Modal size="lg" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add new event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NewEventForm onEventAdded={handleEventAdded} />
          </Modal.Body>
        </Modal>
      </main>
    )
  }
  