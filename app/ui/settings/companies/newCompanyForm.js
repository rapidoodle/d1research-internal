'use client';

import { useState } from 'react';

export default function NewCompanyForm() {
  const [companyName, setCompanyName] = useState('');
  const [companySector, setCompanySector] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/companies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: companyName,
          sector: companySector
        })
      });

      const data = await response.json();

      if (data.error) {
        alert(data.error);
      } else {
        alert('Company created successfully');
        setCompanyName('');
        setCompanySector('');
      }
    } catch (error) {
      console.error('Error creating company:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <h1 className="text-center">Create a new company</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="companyName" className="form-label">Company Name</label>
              <input
                type="text"
                className="form-control"
                id="companyName"
                name="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="companySector" className="form-label">Sector</label>
              <input
                type="text"
                className="form-control"
                id="companySector"
                name="companySector"
                value={companySector}
                onChange={(e) => setCompanySector(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}
