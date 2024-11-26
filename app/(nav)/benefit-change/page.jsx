"use client"

import ChangeBenefitHeader from "../../../components/change-benefits/ChangeBenefitHeader";
import ChangeBenefitBody1 from "../../../components/change-benefits/ChangeBenefitBody1";
import ChangeBenefitBody2 from "../../../components/change-benefits/ChangeBenefitBody2";
import ChangeBenefitBody3 from "../../../components/change-benefits/ChangeBenefitBody3";
import ChangeBenefitFoot from "../../../components/change-benefits/ChangeBenefitFoot";
import { BenefitProvider } from "../../../components/create-card/select-benefit/BenefitContext";
import { useEffect, useState } from "react";

const ChangeBenefitsPage = () => {
  const labels = ['쇼핑', '생활', '푸드', '여행', '문화'];

  const [benefitData, setBenefitData] = useState(null);
  const [error, setError] = useState(null);
  const [cardSequenceId, setCardSequenceId] = useState(null);

  const getChangerabledate = async (cardSequenceId) => {
    try {
      const response = await fetch(`/api/benefit-change/changerable?cardSequenceId=${cardSequenceId}`,
        {
          method: "GET",
          cache: "no-store",
          headers: {
            "Content-type": "application/json"
          },
          credentials: "include",
        });

      if (!response.ok) {

        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBenefitData(data.data);
      console.log('Received benefitData:', data.data);
    } catch (error) {
      console.error('Error - 혜택 변경 페이지: ', error.message);
      setError(error.message);
    }
  }

  const fetchBenefitData = async () => {
    try {
      const response = await fetch('/api/benefit-change', {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {

        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBenefitData(data.data);
      setCardSequenceId(data.data[0].cardSequenceId);
      console.log('Received benefitData:', data.data);
    } catch (error) {
      console.error('Error - 혜택 변경 페이지: ', error.message);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchBenefitData();
  }, []);

  useEffect(() => {
    if (cardSequenceId) {
      getChangerabledate(cardSequenceId);
    }
  }, [cardSequenceId]);

  useEffect(() => {
    if (!benefitData) {
      return
    }
  }, [])

  if (error) {
    return <div>문제가 발생했습니다. 다시 시도해 주세요: {error}</div>
  }

  if (!benefitData) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <ChangeBenefitHeader />
      <BenefitProvider>
        <ChangeBenefitBody1 labels={labels} benefitData={benefitData} />
        <ChangeBenefitBody2 labels={labels} benefitData={benefitData} />
        <ChangeBenefitBody3 labels={labels} benefitData={benefitData} />
      </BenefitProvider>
      <ChangeBenefitFoot modalTitle="혜택 변경" exitDirection="/my-card" />

    </div>
  );
}

export default ChangeBenefitsPage;