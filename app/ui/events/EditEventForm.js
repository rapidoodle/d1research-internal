'use client';

import TagsSelectElement from "@/app/components/TagsSelectElement";
import React, { useState, useEffect, useRef } from "react";
import Select from 'react-select'
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { Editor } from "@tinymce/tinymce-react";
import ButtonSpinner from "@/app/components/ButtonSpinner";

export default function EditEventForm({ onEventAdded, event, handleSave }) {

    const [companiesOptions, setCompaniesOptions] = useState([]);
    const [tagsOptions, setTagsOptions] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const tagsCreatableSelectRef = useRef(null);
    const [description, setDescription] = useState("");

    useEffect(() => {
        const fetchCompanies = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/companies');
                const data = await response.json();

                const formattedOptions = data.data.map(company => ({
                    value: company.company_id,
                    tags: company.tags,
                    label: company.company
                }));

                setCompaniesOptions(formattedOptions);
                setLoading(false);

                if(event){

                    //set event values
                    const selectedCompany = formattedOptions.find(company => company.value === event.company_id);
                    setSelectedCompany(selectedCompany);

                    setDescription(event.description);
                    setSelectedTags(event.tags.split(',').map(tag => ({ value: tag, label: tag })));
                }
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
                    value: tag.id,
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
    }, [event]);

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
        const description = e.target.description.value;
        const location = e.target.location.value;
        const startDate = e.target.startDate.value;
        const tagsString = selectedTags.map(tag => tag.label).join(', ');
    
        var eventData = {
            recurrence: false,
            company: selectedCompany,
            allDay: false,
            description: description,
            assignees: [],
            location: location,
            sharing: 'Members',
            startDate: startDate,
            friendlyName: friendlyName,
            tags: tagsString
        };

        if(event){
            eventData.id = event.id;
        }
    
        const method = event ? 'PATCH' : 'POST';
    
        fetch('/api/events', {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData)
        })
        .then(res => res.json())
        .then(data => {
            e.target.friendlyName.value = '';
            e.target.location.value = '';
            e.target.startDate.value = '';
            setSelectedTags([]);
            setDescription('');
            tagsCreatableSelectRef.current.clearSelection();
            onEventAdded();
            setLoading(false);

            console.log('update response: ', data);
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        });
    };

    useEffect(() => {
        if (handleSave) {
            document.getElementById('editEventForm').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
    }, [handleSave]);

    

    const handleSelectCompany = (selectedOption) => {
        setSelectedCompany(selectedOption.value);
        
        // parse selectedOption.tags from comma separated string to array of objects and remove white spaces
        const tags = selectedOption.tags.split(',').map(tag => tag.trim());
        
        //find each tag in tagsOptions and add all tags to selectedTags
        const newTags = tags.map(tag => tagsOptions.find(option => option.label === tag));

        // add new tags to selectedTags
        setSelectedTags(newTags);

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
                    <form onSubmit={onSubmit} id="editEventForm">

                    <div className="row mb-3">
                            <div className="col-6">
                                <label htmlFor="companySector" className="form-label">Company:</label>
                                <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    isClearable={true}
                                    isSearchable={true}
                                    onChange={handleSelectCompany}
                                    value={selectedCompany}
                                    name="color"
                                    options={companiesOptions}
                                />
                            </div>
                            <div className="col-6"></div>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <label htmlFor="friendlyName" className="form-label">Title</label>
                                <input type="text" className="form-control" id="friendlyName" name="friendlyName" required defaultValue={event?.friendly_name} />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <Editor 
                                name="description"
                                id="description"
                                value={description}
                                onEditorChange={(content) => setDescription(content)}/>
                        </div>
                        <div className="row mb-3">
                            <div className="col-6">
                                <label htmlFor="startDate" className="form-label">Event date:</label>
                                <input type="date" className="form-control" id="startDate" name="startDate" required value={event && new Date(event.start_date).toISOString().split('T')[0]} />
                            </div>
                            <div className="col-6">
                                <label htmlFor="location" className="form-label">Location</label>
                                <input type="text" className="form-control" id="location" name="location" required  defaultValue={event?.location}/>
                            </div>
                            {/* <div className="col-6">
                                <label htmlFor="endDate" className="form-label">End date:</label>
                                <input type="datetime-local" className="form-control" id="endDate" name="endDate" required />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-6">
                                <label htmlFor="color" className="form-label">Color</label>
                                <input type="color" className="form-control" id="color" name="color" required />

                            </div> */}
                        </div>

                        <div className="row">
                                <div className="col">
                                    <label htmlFor="eventTags" className="form-label">Tags</label>
                                    <TagsSelectElement 
                                        options={tagsOptions} 
                                        onCreate={handleCreateTag} 
                                        ref={tagsCreatableSelectRef}
                                        onSelect={handleSelectTag} 
                                        selectedTags={selectedTags}
                                    />
                                </div>
                            </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
