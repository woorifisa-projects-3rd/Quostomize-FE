"use client"

import ChangeBenefitHeader from "../../../components/change-benefits/ChangeBenefitHeader";
import ChangeBenefitBody1 from "../../../components/change-benefits/ChangeBenefitBody1";
import { BenefitProvider } from "../../../components/create-card/select-benefit/BenefitContext";

const ChangeBenefitsPage = () => {
  return (
    <div>
      <ChangeBenefitHeader />
      <BenefitProvider>
        <ChangeBenefitBody1 />
      </BenefitProvider>



    </div>
  );
}

export default ChangeBenefitsPage;