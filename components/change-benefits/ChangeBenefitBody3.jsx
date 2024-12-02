import React from 'react'

import SelectBenefit3 from '../create-card/select-benefit/select-benefit3'


const ChangeBenefitBody3 = ({ labels, lowerCategoryMap, benefitState }) => {

  return (
    <div>
      <SelectBenefit3 labels={labels} benefitState={benefitState} lowerCategoryMap={lowerCategoryMap} data={benefitState.categoryValues.map(value => value - 1)} />
    </div>
  )
}

export default ChangeBenefitBody3