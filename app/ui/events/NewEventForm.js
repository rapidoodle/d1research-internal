'use client';

import Spinner from "@/app/components/Spinner";
import TagsSelectElement from "@/app/components/TagsSelectElement";
import React, { useState, useEffect, useRef } from "react";
import { Bounce, toast } from "react-toastify";
import Select from 'react-select'

export default function NewEventForm({ onEventAdded }) {

    const [companiesOptions, setCompaniesOptions] = useState([]);
    const [tagsOptions, setTagsOptions] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const tagsCreatableSelectRef = useRef(null);

    useEffect(() => {
        const fetchCompanies = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/companies');
                const data = await response.json();
                
                console.log(data);

                const formattedOptions = data.data.map(tag => ({
                    value: tag.company_id,
                    label: tag.company
                }));

                setCompaniesOptions(formattedOptions);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching tags:', error);
                setLoading(false);
            }
        };

        fetchCompanies();

        const fetchTags = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/tags');
                const data = await response.json();
                const formattedOptions = data.data.map(tag => ({
                    value: tag.company_id,
                    label: tag.name
                }));

                setTagsOptions(formattedOptions);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching tags:', error);
                setLoading(false);
            }
        };

        fetchTags();
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        if (!selectedCompany) {
            alert('select company');
            
            setLoading(false);
            
            return;
        }

        if (!selectedTags) {
                alert('select tags');
            
            setLoading(false);
            
            return;
        }

        setLoading(true);

        const friendlyName = e.target.friendlyName.value;
        const description  = e.target.description.value;
        const location     = e.target.location.value;
        const startDate    = e.target.startDate.value;
        const endDate      = e.target.endDate.value;
        const color        = e.target.color.value;
        const tagsString    = selectedTags.map(tag => tag.label).join(', ');


        // Create a new company
        fetch('/api/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                recurrence: '',
                company: selectedCompany,
                allDay: false,
                color: color,
                endDate: endDate,
                description: description,
                assignees: [],
                location: location,
                sharing: 'Members',
                startDate: startDate,
                friendlyName: friendlyName,
                tags: tagsString
            })
        })
        .then(res => res.json())
        .then(data => {
            
            console.log('MALALA', data);

            e.target.friendlyName.value = '';
            e.target.description.value = '';
            e.target.location.value = '';
            e.target.startDate.value = '';
            e.target.endDate.value = '';
            e.target.color.value = '';
            setSelectedTags(null);
            tagsCreatableSelectRef.current.clearSelection();
            onEventAdded();
            setLoading(false);
        })
        .catch(err => {
            toast.error('Something ain\'t right', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            onEventAdded();

            setLoading(false);
        });
    }

    const handleSelectCompany = (selectedOption) => {
        console.log(selectedOption)
        setSelectedCompany(selectedOption.value);
    }

    const handleCreateTag = async (inputValue, setSelectedOption) => {
        setLoading(true);
        try {
            const existingOption = tagsOptions.find(option => option.label === inputValue);
            if (existingOption) {
                alert('Tag already exists');
                setSelectedOption(existingOption);
                setLoading(false);
                return;
            }

            const response = await fetch('/api/tags', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: inputValue }),
            });

            if (!response.ok) {
                throw new Error('Failed to create new tag');
            }

            const newTag = await response.json();
            const newOption = { value: newTag.data.id, label: newTag.data.name };
            setSelectedOption(prev => Array.isArray(prev) ? [...prev, newOption] : [newOption]);
            setSelectedTags(prev => Array.isArray(prev) ? [...prev, newOption] : [newOption]);
            setTagsOptions(prevOptions => [...prevOptions, newOption]);
            setLoading(false);
        } catch (error) {
            console.error('Error creating tag:', error);
            setLoading(false);
        }
    };

    const handleSelectTag = (selectedOptions, setSelectedOption) => {
        setSelectedOption(selectedOptions);
        setSelectedTags(selectedOptions);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <form onSubmit={onSubmit}>

                    <div className="row mb-3">
                            <div className="col-6">
                                <label htmlFor="companySector" className="form-label">Company:</label>
                                <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    isClearable={true}
                                    isSearchable={true}
                                    onChange={handleSelectCompany}
                                    name="color"
                                    options={companiesOptions}
                                />
                            </div>
                            <div className="col-6"></div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="friendlyName" className="form-label">Title</label>
                            <input type="text" className="form-control" id="friendlyName" name="friendlyName" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea className="form-control" id="description" name="description" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="location" className="form-label">Location</label>
                            <input type="text" className="form-control" id="location" name="location" required />
                        </div>
                        <div className="row mb-3">
                            <div className="col-6">
                                <label htmlFor="startDate" className="form-label">Start date:</label>
                                <input type="datetime-local" className="form-control" id="startDate" name="startDate" required />
                            </div>
                            <div className="col-6">
                                <label htmlFor="endDate" className="form-label">End date:</label>
                                <input type="datetime-local" className="form-control" id="endDate" name="endDate" required />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-6">
                                <label htmlFor="color" className="form-label">Color</label>
                                <input type="color" className="form-control" id="color" name="color" required />

                            </div>
                            <div className="col-6">
                                <label htmlFor="eventTags" className="form-label">Tags</label>
                                <TagsSelectElement 
                                    options={tagsOptions} 
                                    onCreate={handleCreateTag} 
                                    ref={tagsCreatableSelectRef}
                                    onSelect={handleSelectTag} 
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary float-end" disabled={loading}>
                            {loading ? <Spinner /> : 'Create'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
