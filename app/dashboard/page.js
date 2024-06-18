'use client';

import { useState } from 'react';
import CsvUploader from '../ui/dashboard/csvUploadForm';
export default function Page() {

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

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setMessage(data.message);
  };

    return (
      <div className="container mt-5">
        <CsvUploader />
      </div>
    );
  }