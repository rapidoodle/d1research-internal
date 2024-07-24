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
  