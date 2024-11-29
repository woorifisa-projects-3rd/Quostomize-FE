import React from 'react'

import { useBenefitContext } from '../create-card/select-benefit/BenefitContext';
import SelectBenefit3 from '../create-card/select-benefit/select-benefit3'


const ChangeBenefitBody3 = ({ labels, lowerCategoryMap }) => {

  const { benefitState } = useBenefitContext();

  return (
    <div>
      <SelectBenefit3 labels={labels} lowerCategoryMap={lowerCategoryMap} data={benefitState.categoryValues.map(value => value - 1)} />
    </div>
  )
}

export default ChangeBenefitBody3