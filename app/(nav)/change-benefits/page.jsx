"use client"

import ChangeBenefitHeader from "../../../components/change-benefits/ChangeBenefitHeader";
import ChangeBenefitBody1 from "../../../components/change-benefits/ChangeBenefitBody1";
import ChangeBenefitBody2 from "../../../components/change-benefits/ChangeBenefitBody2";
import ChangeBenefitBody3 from "../../../components/change-benefits/ChangeBenefitBody3";
import { BenefitProvider } from "../../../components/create-card/select-benefit/BenefitContext";

const ChangeBenefitsPage = () => {
  const labels = ['쇼핑', '생활', '푸드', '여행', '문화'];

  return (
    <div>
      <ChangeBenefitHeader />
      <BenefitProvider>
        <ChangeBenefitBody1 labels={labels} />
        <ChangeBenefitBody2 labels={labels} />
        <ChangeBenefitBody3 labels={labels} />

      </BenefitProvider>


    </div>
  );
}

export default ChangeBenefitsPage;