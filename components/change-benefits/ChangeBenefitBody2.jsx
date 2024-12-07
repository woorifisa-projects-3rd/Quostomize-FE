import React from 'react'

import InteractiveTabContentBox from '../box/InteractiveTabContentBox';

const ChangeBenefitBody2 = ({ labels, benefitState, categoryMap, lowerCategoryMap, updateCategoryValue, updateCategory, updateOption }) => {


    return (

        <div>
            <InteractiveTabContentBox labels={labels} benefitState={benefitState} updateCategoryValue={updateCategoryValue} updateCategory={updateCategory} updateOption={updateOption} categoryMap={categoryMap} lowerCategoryMap={lowerCategoryMap} />
            
        </div>
    )
}

export default ChangeBenefitBody2