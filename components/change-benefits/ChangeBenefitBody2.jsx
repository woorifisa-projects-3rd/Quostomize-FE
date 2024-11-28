import React from 'react'

import InteractiveTabContentBox from '../box/InteractiveTabContentBox';

const ChangeBenefitBody2 = ({ labels, categoryMap, lowerCategoryMap }) => {
    return (

        <div>
            <InteractiveTabContentBox labels={labels} categoryMap={categoryMap} lowerCategoryMap={lowerCategoryMap} />
        </div>
    )
}

export default ChangeBenefitBody2