'use client';

import { useState } from 'react';
import PageTitle from '@/app/components/PageTitle';

const CsvUploader = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file first.');
      return;
    }
 
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('api/financialData?type=financial_data', {
      method: 'POST',
      body: formData,
    });

    //awaaits the response from the server
    const data = await res.json();
    setMessage(data.message);
    console.log('res', res);
  };

  return (
    <div className="container mb-3 bg-light p-3">
      <PageTitle title="Upload Financial Data CSV" />
      <input type="file" onChange={handleFileChange} className="form-control mb-3" />
      <button onClick={handleUpload} className="btn btn-primary">Upload</button>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default CsvUploader;
