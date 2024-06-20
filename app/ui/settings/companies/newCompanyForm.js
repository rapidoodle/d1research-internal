'use client';
import CreatableSelectElement from "@/app/components/CreatableSelect";
import Spinner from "@/app/components/Spinner";
import React, { useState, useEffect, useRef } from "react";

export default function NewCompanyForm( { onCompanyAdded }) {

    const [options, setOptions] = useState([]);
    const [selectedSector, setSelectedSector] = useState(null);
    const [loading, setLoading] = useState(false);
    const creatableSelectRef = useRef(null);

    useEffect(() => {
        const fetchSectors = async () => {
        setLoading(true);

            try {
                const response = await fetch('/api/sectors');
                const data = await response.json();
                const formattedOptions = data.data.map(sector => ({
                    value: sector.id,
                    label: sector.name
                }));

                console.log(data);
                setOptions(formattedOptions);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching sectors:', error);
                setLoading(false);
            }
        };

        fetchSectors();
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        if (!selectedSector) {
            alert('Please select a sector.');
            setLoading(false);
            return;
          }

          
        setLoading(true);

        const companyName = e.target.companyName.value;
        console.log(selectedSector);
        // Create a new company
        fetch('/api/companies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: companyName,
                sector_id: selectedSector
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.error){
                alert(data.error);
            }else{
                e.target.companyName.value = '';
                setSelectedSector(null);
                creatableSelectRef.current.clearSelection();
                onCompanyAdded();
            }
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
            alert('An error occurred. Please try again later');
            setLoading(false);
        });
    }

    const handleCreateSector = async (inputValue, setSelectedOption) => {
        setLoading(true);
        try {

        // Check for duplicate sector on the client side
        const existingOption = options.find(option => option.label === inputValue);
        if (existingOption) {
            alert('Sector already exists');
            setSelectedOption(existingOption);
            setLoading(false);
            return;
        }

          const response = await fetch('/api/sectors', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: inputValue }),
          });
    
          if (!response.ok) {
            throw new Error('Failed to create new sector');
          }
    
          const newSector = await response.json();
          const newOption = { value: newSector.data.id, label: newSector.data.name };
          setSelectedOption(newOption);
          setSelectedSector(newOption.value);
          setOptions((prevOptions) => [...prevOptions, newOption]);
          setLoading(false);
        } catch (error) {
          console.error('Error creating sector:', error);
          setLoading(false);
        }
      };
      
    const handleSelectSector = (selectedOption, setSelectedOption) => {
        console.log(selectedOption.value)
        setSelectedOption(selectedOption);
        setSelectedSector(selectedOption.value);
    }


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
                            <input type="text" className="form-control" id="companyName" name="companyName" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="companySector" className="form-label">Sector</label>                
                            <CreatableSelectElement 
                                options={options} 
                                onCreate={ handleCreateSector } 
                                ref={creatableSelectRef}
                                onSelect={ handleSelectSector } 
                            />
                        </div>            
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? <Spinner /> : 'Create'}
                        </button>
                    </form>
                </div>


            </div>
        </div>
    )
}
