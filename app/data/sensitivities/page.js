'use client';

import { useState } from 'react';
import { Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';
import Search from '@/app/ui/search';
import FinancialDataTable from '@/app/ui/dashboard/financialDataTable';
import ModalComponent from '@/app/components/ModalComponent';
import CsvSensitivitiesFileUploader from '@/app/ui/dashboard/csvSensitivitiesUploadForm';
import SensitivitiesDataTable from '@/app/ui/sensitivities/sensitivitiesDataTable';

export default function Page(searchParams) {
  const query = searchParams.searchParams?.query || '';
  const currentPage = Number(searchParams.searchParams?.page) || 1;
  const [showSensitivies, setShowSensitivities] = useState(false);
  const [sensitivitiesFileUpload, setSensitivitiesFileUploaded] = useState(false);
  const [isSaveSensitivities, setSaveSensitivities] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleSenstivitiesFileUploaded = () => {
    setSensitivitiesFileUploaded(!priceFileUploaded);
    handleCloseSensitivities();
  };


  const handleCloseSensitivities = () => setShowSensitivities(false);
  const handleShowSensitivities  = ()  => setShowSensitivities(true);
  const handleSaveSensitivities  = ()  => setSaveSensitivities(true);

  return (
    <main>
        <div className="p-3 row">
          <h5 className="mb-4 mb-sm-0 col-12 col-md-6">Sensitivities</h5>

          <div className="ms-auto col-12 col-md-6 d-flex justify-content-end flex-column flex-md-row">
            <div>
              <Search placeholder="Event name" />
            </div>
            <Button className='ms-md-2 mt-2 mt-md-0' size="sm" variant="primary" onClick={handleShowSensitivities}>
              <FontAwesomeIcon icon={faUpload} className="me-1" /> Sensitivities
            </Button>
          </div>
        </div>
        <div className='mt-3'>
            <SensitivitiesDataTable 
              query={query} 
              currentPage={currentPage}
              fileUploaded={fileUploaded}
              />
        </div>

        <ModalComponent
            show={showSensitivies}
            handleClose={handleCloseSensitivities}
            handleSave={handleSaveSensitivities}
            loading={loading}
            size="lg"
            buttonText='Upload'
            buttonLoadingText='Processing file. Please wait...'
            const
            isSavable={true}
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
