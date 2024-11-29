'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';

const BenefitContext = createContext(undefined);

export function BenefitProvider({ children, benefitData }) {
  const [benefitState, setBenefitState] = useState({
    categoryValues: [1, 1, 1, 1, 1],
    selectedCategories: [null, null, null, null, null],
    selectedOptions: [null, null, null, null, null],
  });

  useEffect(() => {
    console.log(benefitData);

    if (!benefitData) {
      return;
    }

    const updatedCategoryValues = [...benefitState.categoryValues];
    const updatedCategories = [...benefitState.selectedCategories];
    const updatedSelectedOptions = [...benefitState.selectedOptions];

    benefitData.forEach((item) => {
      console.log(item);

      const categoryIndex = item.upperCategoryId - 1;


      if (categoryIndex >= 0 && categoryIndex < updatedCategoryValues.length) {
        if (item.upperCategoryId) {
          updatedCategoryValues[categoryIndex] = 4;
          updatedCategories[categoryIndex] = item.upperCategoryId;
        }
        if (item.lowerCategoryId) {
          if (updatedCategoryValues[item.lowerCategoryId - 1] !== 4) {
            updatedCategoryValues[categoryIndex] = 5;
          }
          updatedSelectedOptions[categoryIndex] = item.lowerCategoryId;
        }
      }
      console.log(updatedCategoryValues);
      console.log(updatedCategories);
      console.log(updatedSelectedOptions);

      setBenefitState((prev) => {
        return {
          ...prev,
          categoryValues: updatedCategoryValues,
          selectedCategories: updatedCategories,
          selectedOptions: updatedSelectedOptions,
        }
      })
    })
  }, [benefitData]);

 


  const updateCategory = (index, value) => {
    setBenefitState((prevState) => ({
      ...prevState,
      categoryValues: prevState.categoryValues.map((v, i) => (i === index ? Math.min(value, 5) : v)),
    }));
  };

  const updateOption = (categoryIndex, option) => {
    setBenefitState((prevState) => ({
      ...prevState,
      selectedOptions: prevState.selectedOptions.map((v, i) => (i === categoryIndex ? option : v)),
    }));
  };

  const resetContext = () => {
    setBenefitState({
      categoryValues: [1, 1, 1, 1, 1],
      selectedCategories: [null, null, null, null, null],
      selectedOptions: [null, null, null, null, null],
    });
  }

  return (
    <BenefitContext.Provider value={{
      benefitState,
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