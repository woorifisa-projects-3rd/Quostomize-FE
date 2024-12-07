import React from 'react'

import InteractiveTabContentBox from '../box/InteractiveTabContentBox';

const ChangeBenefitBody2 = ({ labels, benefitState, categoryMap, lowerCategoryMap, updateCategoryValue, updateCategory, updateOption }) => {


    return (

        <div className='w-full'>
            <InteractiveTabContentBox labels={labels} categoryMap={categoryMap} lowerCategoryMap={lowerCategoryMap} data={benefitState.categoryValues.map(value => value - 1)} benefitState={benefitState} updateCategoryValue={updateCategoryValue} updateCategory={updateCategory} updateOption={updateOption} />
        </div>
    )
}

export default ChangeBenefitBody2