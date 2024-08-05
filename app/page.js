'use client';

import { Suspense, useState } from 'react';
import CsvUploader from './ui/dashboard/csvUploadForm';
import FinancialDataTable from './ui/dashboard/financialDataTable';
import Search from './ui/search';
import { FinancialDataTableSkeleton } from './ui/skeletons';
import { Button, Container, Form, Modal, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';
import ModalComponent from './components/ModalComponent';
import CsvPriceFileUploader from './ui/dashboard/csvPriceUploadForm';
import CsvSensitivitiesFileUploader from './ui/dashboard/csvSensitivitiesUploadForm';

export default function Page(searchParams) {
  const query = searchParams.searchParams?.query || '';
  const currentPage = Number(searchParams.searchParams?.page) || 1;
  const [show, setShow] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [showSensitivies, setShowSensitivities] = useState(false);

  const [fileUploaded, setFileUploaded] = useState(false);
  const [priceFileUploaded, setPriceFileUploaded] = useState(false);
  const [sensitivitiesFileUpload, setSensitivitiesFileUploaded] = useState(false);

  const [isSave, setSave] = useState(false);
  const [isSavePrice, setSavePrice] = useState(false);
  const [isSaveSensitivities, setSaveSensitivities] = useState(false);

  const [loading, setLoading] = useState(false);

  // Callback to update the state
  const handleFileUploaded = () => {
    setFileUploaded(!fileUploaded);
    handleClose();
  };

  const handlePriceFileUploaded = () => {
    setPriceFileUploaded(!priceFileUploaded);
    handleClosePrice();
  };

  const handleSenstivitiesFileUploaded = () => {
    setSensitivitiesFileUploaded(!priceFileUploaded);
    handleCloseSensitivities();
  };

  const handleClose = () => setShow(false);
  const handleShow  = ()  => setShow(true);
  const handleSave  = ()  => setSave(true);

  const handleClosePrice = () => setShowPrice(false);
  const handleShowPrice  = ()  => setShowPrice(true);
  const handleSavePrice  = ()  => setSavePrice(true);

  const handleCloseSensitivities = () => setShowSensitivities(false);
  const handleShowSensitivities  = ()  => setShowSensitivities(true);
  const handleSaveSensitivities  = ()  => setSaveSensitivities(true);

  return (
    <main>
        <div className="p-3 row">
          <h5 className="mb-4 mb-sm-0 col-12 col-md-6">Master data</h5>

          <div className="ms-auto col-12 col-md-6 d-flex justify-content-end flex-column flex-md-row">
            <div>
              <Search placeholder="Event name" />
            </div>

            <Button  className='ms-md-2 mt-2 mt-md-0' size="sm" variant="primary" onClick={handleShow}>
              <FontAwesomeIcon icon={faUpload} className="me-1" />Master
            </Button>

            <Button className='ms-md-2 mt-2 mt-md-0' size="sm" variant="primary" onClick={handleShowPrice}>
              <FontAwesomeIcon icon={faUpload} className="me-1" /> Price
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

        <ModalComponent
            show={showPrice}
            handleClose={handleClosePrice}
            handleSave={handleSavePrice}
            loading={loading}
            size="lg"
            buttonText='Upload'
            buttonLoadingText='Processing file. Please wait...'
            const
            title="Upload new price file">
          <CsvPriceFileUploader 
            onFileUploaded={handlePriceFileUploaded} 
            setLoading={setLoading} 
            isSave={isSavePrice} 
          />
        </ModalComponent>

        <ModalComponent
            show={showSensitivies}
            handleClose={handleCloseSensitivities}
            handleSave={handleSaveSensitivities}
            loading={loading}
            size="lg"
            buttonText='Upload'
            buttonLoadingText='Processing file. Please wait...'
            const
            title="Upload sensitivities file">
          <CsvSensitivitiesFileUploader 
            onFileUploaded={handleSenstivitiesFileUploaded} 
            setLoading={setLoading} 
            isSave={isSaveSensitivities} 
          />
        </ModalComponent>
    </main>
  );
}
