'use client';

import CreatableSelectElement from "@/app/components/CreatableSelectElement";
import Spinner from "@/app/components/Spinner";
import TagsSelectElement from "@/app/components/TagsSelectElement";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";

export default function NewCompanyForm({ onCompanyAdded }) {

    const [sectorOptions, setSectorOptions] = useState([]);
    const [tagsOptions, setTagsOptions] = useState([]);
    const [selectedSector, setSelectedSector] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const sectorCreatableSelectRef = useRef(null);
    const tagsCreatableSelectRef = useRef(null);

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

                setSectorOptions(formattedOptions);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching sectors:', error);
                setLoading(false);
            }

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

        fetchSectors();
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        if (!selectedSector) {
            alert('Please select a sector.');
            setLoading(false);
            return;
        }

        if (!selectedTags) {
            alert('Please add a tag.');
            setLoading(false);
            return;
        }

        setLoading(true);

        const companyName    = e.target.companyName.value;
        const tagsString     = selectedTags.map(tag => tag.label).join(', ');
        const companyNameUrl = companyName.toLowerCase().replace(/\s+/g, '_');


        // Create a new company
        fetch('/api/companies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: companyName,
                sector_id: selectedSector,
                template: false,
                sharing: "MEMBERS",
                tags: tagsString,
                member_permission: 8
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                e.target.companyName.value = '';
                setSelectedSector(null);
                setSelectedTags(null);
                sectorCreatableSelectRef.current.clearSelection();
                tagsCreatableSelectRef.current.clearSelection();
                onCompanyAdded();
            }
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
            alert('An error occurred. Please try again later', err);
            setLoading(false);
        });
    }

    const handleCreateSector = async (inputValue, setSelectedOption) => {
        setLoading(true);
        try {
            const existingOption = sectorOptions.find(option => option.label === inputValue);
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
            setSectorOptions((prevOptions) => [...prevOptions, newOption]);
            setLoading(false);
        } catch (error) {
            console.error('Error creating sector:', error);
            setLoading(false);
        }
    };

    const handleSelectSector = (selectedOption, setSelectedOption) => {
        setSelectedOption(selectedOption);
        setSelectedSector(selectedOption.value);
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
                        <div className="mb-3">
                            <label htmlFor="companyName" className="form-label">Company Name</label>
                            <input type="text" className="form-control" id="companyName" name="companyName" required />
                        </div>
                        <div className="row mb-3">
                            <div className="col-6">
                                <label htmlFor="companySector" className="form-label">Sector</label>
                                <CreatableSelectElement 
                                    options={sectorOptions} 
                                    onCreate={handleCreateSector} 
                                    ref={sectorCreatableSelectRef}
                                    onSelect={handleSelectSector} 
                                />
                            </div>
                            <div className="col-6">
                                <label htmlFor="companyTags" className="form-label">Tags</label>
                                <TagsSelectElement 
                                    options={tagsOptions} 
                                    onCreate={handleCreateTag} 
                                    ref={tagsCreatableSelectRef}
                                    onSelect={handleSelectTag} 
                                />
                            </div>
                        </div>
                        <Button type="submit" className="mt-4 float-end" disabled={loading}>
                            <FontAwesomeIcon icon={faSave} className="me-1" /> {loading ? <Spinner /> : 'Create'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
