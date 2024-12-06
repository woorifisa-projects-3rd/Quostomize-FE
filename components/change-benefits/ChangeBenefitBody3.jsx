import React from 'react'

import SelectBenefit3 from '../create-card/select-benefit/select-benefit3'


const ChangeBenefitBody3 = ({ labels, lowerCategoryMap, benefitState, resetContext }) => {

  return (
    <div>
      <SelectBenefit3 labels={labels} benefitState={benefitState} lowerCategoryMap={lowerCategoryMap} resetContext={resetContext} data={benefitState.categoryValues.map(value => value - 1)} />
    </div>
  )
}

export default ChangeBenefitBody3