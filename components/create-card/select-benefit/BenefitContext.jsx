'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';

const BenefitContext = createContext(undefined);

export function BenefitProvider({ children, benefitData }) {
  const [categoryValues, setCategoryValues] = useState([1, 1, 1, 1, 1]);
  const [selectedOptions, setSelectedOptions] = useState([null, null, null, null, null]);


  useEffect(() => {
    if (benefitData && Array.isArray(benefitData)) {
      const updatedCategoryValues = [1, 1, 1, 1, 1];


      benefitData.forEach((item, index) => {
        if (item.upperCategoryId) {
          updatedCategoryValues[item.upperCategoryId - 1] = 4;
        }
        if (item.lowerCategoryId) {
          if (updatedCategoryValues[item.lowerCategoryId - 1] !== 4) {
            updatedCategoryValues[item.upperCategoryId - 1] = 5;
          }
          setSelectedOptions(prev => {
            const newOptions = [...prev];
            newOptions[index] = item.lowerCategoryId;
            return newOptions;
          });
        }
      });
      setCategoryValues(updatedCategoryValues);
    }
  }, [benefitData]);

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
  console.log('benefitData:', benefitData);

  return (
    <BenefitContext.Provider value={{
      categoryValues,
      selectedOptions,
      updateCategory,
      updateOption,
      resetContext,
      benefitData
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