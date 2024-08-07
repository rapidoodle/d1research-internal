'use client';
import { useEffect, useState } from 'react';

const CsvUploader = ({ onFileUploaded, isSave, setLoading }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      setMessage('');
      setError(false);
    } else {
      setFile(null);
      setMessage('Please select a valid CSV file.');
      setError(true);
    }
  };


  // Use useEffect to call handleUpload when isSave is true
  useEffect(() => {
    console.log(isSave);
    if (isSave) {
      const handleUpload = async () => {
        if (!file) {
          setMessage('Please select a file first.');
          return;
        }
    
        setLoading(true);
    
        console.log('Uploading file...');
        try {
          const formData = new FormData();
          formData.append('file', file);
    
          const res = await fetch('/api/financial-data', {
            method: 'POST',
            body: formData,
          });
          console.log('res', res);
          if(res.ok){
            const data = await res.json();
            setMessage(data.message);
            onFileUploaded();
          }
        } catch (error) {
          console.error('Error:', error);
          setMessage('An error occurred while uploading the file.');
        } finally {
          setLoading(false);
        }
      };

      handleUpload();
    }
  }, [isSave]);

  return (
    <div className="container-fluid mb-3 bg-light p-3">
      <input type="file" onChange={handleFileChange} className="form-control mb-3" />
      {message && <p className="text-danger mt-3">{message}</p>}
    </div>
  );
};

export default CsvUploader;
