'use client';
import React, { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import CreatableSelect from 'react-select/creatable';

const TagsSelectElement = forwardRef(({ options, onCreate, onSelect, selectedTags }, ref) => {
  
  const [selectedOptions, setSelectedOptions] = useState(selectedTags);

  useEffect(() => {
    setSelectedOptions(selectedTags);
    console.log(selectedTags);
  }, [selectedTags]);

  useImperativeHandle(ref, () => ({
    clearSelection() {
      setSelectedOptions(null);
    }
  }));

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? '#80bdff' : '#ced4da',
      boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(0,123,255,.25)' : provided.boxShadow,
      '&:hover': {
        borderColor: state.isFocused ? '#80bdff' : '#ced4da',
      },
      paddingLeft: '0.75rem',
      minHeight: '38px',
      borderRadius: '0.25rem',
    }),
    input: (provided) => ({
      ...provided,
      margin: '0',
      paddingTop: '0',
      paddingBottom: '0',
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: '0',
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      padding: '0',
    }),
  };

  const handleChange = (newValue) => {
    setSelectedOptions(newValue);
    onSelect(newValue, setSelectedOptions);
  };

  const handleCreate = (inputValue) => {
    onCreate(inputValue, setSelectedOptions);
  };

  return (
    <>
      <CreatableSelect
        isClearable
        onChange={handleChange}
        onCreateOption={handleCreate}
        options={options}
        value={selectedTags}
        isMulti
        styles={customStyles}
        classNamePrefix="react-select"
      />
    </>
  );
});

TagsSelectElement.displayName = 'TagsSelectElement';

export default TagsSelectElement;
