import React from 'react'

import { useBenefitContext } from '../create-card/select-benefit/BenefitContext';
import SelectBenefit3 from '../create-card/select-benefit/select-benefit3'


const ChangeBenefitBody3 = ({ labels }) => {

  const { categoryValues } = useBenefitContext();
  
  return (
    <div>
      <SelectBenefit3 labels={labels} data={categoryValues.map(value => value - 1)} />
    </div>
  )
}

export default ChangeBenefitBody3