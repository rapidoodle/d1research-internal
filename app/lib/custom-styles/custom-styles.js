import chroma from "chroma-js";

const color = chroma('#2F5651');

export const customSelectStyle = {
    option: (provided, state) => {
      const color = chroma('#2F5651');
      return {
        ...provided,
        backgroundColor: state.isDisabled
          ? undefined
          : state.isSelected
          ? '#2F5651'
          : state.isFocused
          ? color.alpha(0.8).css()
          : undefined,
        color: state.isFocused || state.isSelected ? '#fff' : provided.color,
        ':active': {
          ...provided[':active'],
          backgroundColor: !state.isDisabled
            ? state.isSelected
              ? '#2F5651'
              : color
            : undefined,
        },
      };
    },
    singleValue: (provided, state) => ({
      ...provided,
      color: state.isSelected ? '#2F5651' : provided.color,
    }),
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? '#2F5651' : provided.borderColor,
      boxShadow: state.isFocused ? '0 0 0 1px #2F5651' : provided.boxShadow,
      '&:hover': {
        borderColor: '#2F5651',
      },
    }),
    multiValue: (provided, state) => ({
      ...provided,
      backgroundColor: '#2F5651',
      color: '#fff',
    }),
    multiValueLabel: (provided, state) => ({
      ...provided,
      color: '#fff',
    }),
    multiValueRemove: (provided, state) => ({
      ...provided,
      color: '#fff',
      ':hover': {
        backgroundColor: '#2F5651',
        color: '#fff',
      },
    }),
};
  
export const customTableSelectStyle = {
  option: (provided, state) => {
    const color = chroma('#2F5651');
    return {
      ...provided,
      backgroundColor: state.isDisabled
        ? undefined
        : state.isSelected
        ? '#2F5651'
        : state.isFocused
        ? color.alpha(0.8).css()
        : undefined,
      color: state.isFocused || state.isSelected ? '#fff' : provided.color,
      ':active': {
        ...provided[':active'],
        backgroundColor: !state.isDisabled
          ? state.isSelected
            ? '#2F5651'
            : color
          : undefined,
      },
      fontSize: '12px',  // Added font size
      padding: '2px 5px',  // Reduced padding
    };
  },
  singleValue: (provided, state) => ({
    ...provided,
    color: state.isSelected ? '#2F5651' : provided.color,
    fontSize: '13px',  // Added font size
    padding: '0',  // Removed padding
    margin: '0',  // Removed margin
  }),
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? '#2F5651' : provided.borderColor,
    boxShadow: state.isFocused ? '0 0 0 1px #2F5651' : provided.boxShadow,
    '&:hover': {
      borderColor: '#2F5651',
    },
    width: '90px',  // Adjust the width as needed
    height: '25px',  // Set height
    padding: '0',  // Removed padding
    minHeight: '25px',  // Ensured minimum height
    paddingTop: '0',  // Removed padding
    marginTop: '0',  // Removed margin
  }),
  valueContainer: (provided) => ({
    ...provided,
    paddingLeft: '5px',  // Removed padding
    paddingTop: '0',  // Removed padding
    paddingBottom: '0',  // Removed padding
    margin: '0',  // Removed margin
  }),
  input: (provided) => ({
    ...provided,
    margin: '0',  // Removed margin
    padding: '0',  // Removed padding
    width: '90px',  // Adjust the width as needed
  }),
  multiValue: (provided, state) => ({
    ...provided,
    backgroundColor: '#2F5651',
    color: '#fff',
    fontSize: '10px',  // Added font size
    height: '24px',  // Adjusted height to fit better
    padding: '0 2px',  // Reduced padding
    margin: '1px',  // Reduced margin
  }),
  multiValueLabel: (provided, state) => ({
    ...provided,
    color: '#fff',
    fontSize: '10px',  // Added font size
    padding: '0',  // Removed padding
  }),
  multiValueRemove: (provided, state) => ({
    ...provided,
    color: '#fff',
    ':hover': {
      backgroundColor: '#2F5651',
      color: '#fff',
    },
    fontSize: '10px',  // Added font size
    padding: '0',  // Removed padding
  }),
  menu: (provided) => ({
    ...provided,
    width: '80px',  // Adjust the width of the dropdown menu as needed
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: '0',  // Removed padding
  }),
  clearIndicator: (provided) => ({
    ...provided,
    padding: '0',  // Removed padding
  }),
};
