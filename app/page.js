'use client';

import { Suspense, useState } from 'react';
import CsvUploader from './ui/dashboard/csvUploadForm';
import FinancialDataTable from './ui/dashboard/financialDataTable';
import Search from './ui/search';
import { FinancialDataTableSkeleton } from './ui/skeletons';
import { Button, Container, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';
import ModalComponent from './components/ModalComponent';

export default function Page(searchParams) {
  const query = searchParams.searchParams?.query || '';
  const currentPage = Number(searchParams.searchParams?.page) || 1;
  const [show, setShow] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [isSave, setSave] = useState(false);
  const [loading, setLoading] = useState(false);

  // Callback to update the state
  const handleFileUploaded = () => {
    setFileUploaded(!fileUploaded);
    handleClose();
  };

  const handleClose = () => setShow(false);
  const handleShow = ()  => setShow(true);
  const handleSave = ()  => {
    setSave(true);
  }

  return (
    <main>
        <div className="p-3 row">
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

      <ModalComponent
          show={show}
          handleClose={handleClose}
          handleSave={handleSave}
          loading={loading}
          size="lg"
          buttonText='Upload'
          buttonLoadingText='Processing file. Please wait...'
          const
          title="Upload new master file">
        <CsvUploader 
          onFileUploaded={handleFileUploaded} 
          setLoading={setLoading} 
          isSave={isSave} 
        />
      </ModalComponent>
    </main>
  );
}
