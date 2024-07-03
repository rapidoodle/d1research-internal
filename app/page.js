'use client';

import { Suspense, useState } from 'react';
import CsvUploader from './ui/dashboard/csvUploadForm';
import FinancialDataTable from './ui/dashboard/financialDataTable';
import Search from './ui/search';
import { FinancialDataTableSkeleton } from './ui/skeletons';
import { Button, Container, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';

export default function Page(searchParams) {
  const query = searchParams.searchParams?.query || '';
  const currentPage = Number(searchParams.searchParams?.page) || 1;
  const [show, setShow] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);

  // Callback to update the state
  const handleFileUploaded = () => {
    setFileUploaded(!fileUploaded);
    handleClose();
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <main>
        <div className="bg-light p-3 row">
          <h5 className="mb-0 col">Master data</h5>

          <div className="ms-auto col d-flex justify-content-end">
            <div>
              <Search placeholder="Event name" />
            </div>

            <Button size="sm" variant="primary" onClick={handleShow}>
              <FontAwesomeIcon icon={faUpload} className="me-1" /> Upload new master file
            </Button>
          </div>
        </div>
      <div className='mt-3'>
          <FinancialDataTable 
            query={query} 
            currentPage={currentPage}
            fileUploaded={fileUploaded}
            />
      </div>
      
      <Modal size="lg" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Upload master file</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CsvUploader onFileUploaded={handleFileUploaded} />
          </Modal.Body>
        </Modal>
    </main>
  );
}
