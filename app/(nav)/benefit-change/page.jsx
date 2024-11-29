"use client"

import ChangeBenefitHeader from "../../../components/change-benefits/ChangeBenefitHeader";
import ChangeBenefitBody1 from "../../../components/change-benefits/ChangeBenefitBody1";
import ChangeBenefitBody2 from "../../../components/change-benefits/ChangeBenefitBody2";
import { BenefitProvider } from "../../../components/create-card/select-benefit/BenefitContext";

const ChangeBenefitsPage = () => {
  return (
    <div>
      <ChangeBenefitHeader />
      <BenefitProvider>
        <ChangeBenefitBody1 />
        <ChangeBenefitBody2 />
      </BenefitProvider>

    </div>
  );
}

export default ChangeBenefitsPage;
