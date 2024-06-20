'use client';
import React, { useState, forwardRef, useImperativeHandle } from "react";
import CreatableSelect from 'react-select/creatable';

const CreatableSelectElement = forwardRef(({ options, onCreate, onSelect }, ref) => {
  const [selectedOption, setSelectedOption] = useState(null);

  useImperativeHandle(ref, () => ({
    clearSelection() {
      setSelectedOption(null);
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
      height: 'calc(1.5em + 0.75rem + 2px)',
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
    setSelectedOption(newValue);
    onSelect(newValue, setSelectedOption);
  };

  const handleCreate = (inputValue) => {
    onCreate(inputValue, setSelectedOption);
  };

  return (
    <>
      <CreatableSelect
        isClearable
        onChange={handleChange}
        onCreateOption={handleCreate}
        options={options}
        value={selectedOption}
        styles={customStyles}
        classNamePrefix="react-select"
      />
    </>
  );
});

CreatableSelectElement.displayName = 'CreatableSelectElement';

export default CreatableSelectElement;
