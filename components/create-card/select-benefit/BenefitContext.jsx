'use client'

import React, { createContext, useContext, useState } from 'react';

const BenefitContext = createContext(undefined);

export function BenefitProvider({ children }) {
  const [categoryValues, setCategoryValues] = useState([1, 1, 1, 1, 1]);
  const [selectedOptions, setSelectedOptions] = useState([null, null, null, null, null]);

  const updateCategory = (index, value) => {
    setCategoryValues(prev => {
      const newValues = [...prev];
      newValues[index] = Math.min(value, 5);
      return newValues;
    });
  };

  const updateOption = (categoryIndex, option) => {
    setSelectedOptions(prev => {
      const newOptions = [...prev];
      newOptions[categoryIndex] = option;
      return newOptions;
    });
  };

  const resetContext = () => {
    setCategoryValues([1, 1, 1, 1, 1]);
    setSelectedOptions([null, null, null, null, null]);
  }

  return (
    <BenefitContext.Provider value={{
      categoryValues,
      selectedOptions,
      updateCategory,
      updateOption,
      resetContext
    }}>
      {children}
    </BenefitContext.Provider>
  );
}

export const useBenefitContext = () => {
  const context = useContext(BenefitContext);
  if (!context) {
    throw new Error('useBenefitContext must be used within a BenefitProvider');
  }
  return context;
};