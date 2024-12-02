"use client"

import ChangeBenefitHeader from "../../../components/change-benefits/ChangeBenefitHeader";
import ChangeBenefitBody1 from "../../../components/change-benefits/ChangeBenefitBody1";
import ChangeBenefitBody2 from "../../../components/change-benefits/ChangeBenefitBody2";
import ChangeBenefitBody3 from "../../../components/change-benefits/ChangeBenefitBody3";
import ChangeBenefitFoot from "../../../components/change-benefits/ChangeBenefitFoot";
import { useEffect, useState } from "react";

const ChangeBenefitsPage = () => {

  const [benefitState, setBenefitState] = useState();
  const [error, setError] = useState(null);
  const [cardSequenceId, setCardSequenceId] = useState(null);
  const [buttonText, setButtonText] = useState('');
  const [authSuccess, setAuthSuccess] = useState(null);
  const [authTrigger, setAuthTrigger] = useState(0);


  const categoryMap = {
    1: '쇼핑',
    2: '생활',
    3: '푸드',
    4: '여행',
    5: '문화',
  };

  const lowerCategoryMap = {
    100: '백화점(더현대, 신세계, 롯데백화점)',
    101: '온라인쇼핑(무신사, 에이블리, 쿠팡)',
    102: '마트(이마트, 홈플러스)',
    200: '주유소(SK, GS칼텍스)',
    201: '통신(SKT, KT, LGU+)',
    202: '대중교통(버스, 지하철, 택시)',
    300: '편의점(CU, GS25)',
    301: '카페(스타벅스, 투썸플레이스)',
    302: '배달(배달의민족, 쿠팡이츠)',
    400: '항공(인터파크 투어, 네이버 항공)',
    401: '렌트(쏘카, 그린카)',
    402: '숙소(야놀자, 여기어때)',
    500: 'OTT(넷플릭스, 티빙)',
    501: '영화(CGV, 롯데시네마)',
    502: '도서(교보문고, 밀리의서재)',
  };

  const labels = Object.values(categoryMap);

  // 예약 or 변경
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

      const responsedata = await response.json();

      if (responsedata.data && responsedata.data) {

        setButtonText(responsedata.data);
      };

    } catch (error) {
      setError(error.message);
    }
  };

  // 기존 정보 get
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

      const transformedData = transformBenefitData(data.data);

      const updatedState = {
        categoryValues: transformedData.map(item => item.benefitRate),
        selectedCategories: transformedData.map(item => item.upperCategoryId),
        selectedOptions: transformedData.map(item => item.lowerCategoryId),
      };
      setBenefitState(updatedState);

      console.log('Updated benefitState:', updatedState);
      setCardSequenceId(data.data[0].cardSequenceId);
    } catch (error) {
      setError(error.message);
    }
  };

  // fetch 할 때 data 변환
  const transformBenefitData = (data) => {
    return data.map(item => ({
      ...item,
      benefitRate: item.benefitRate + 1,
    }));
  };

  // patch 할때 공통적으로 쓰이는 부분
  const updateBenefit = async (url, cardSequenceId, authCode) => {
    const { categoryValues, selectedCategories, selectedOptions } = benefitState;

    const date = new Date();
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const dd = String(date.getDate()).padStart(2, '0');

    const formattedDate = `${yyyy}-${mm}-${dd}`;


    const requestBody = selectedCategories.map((upperCategoryId, index) => ({
      benefitEffectiveDate: formattedDate,
      benefitRate: categoryValues[index],
      isActive: true,
      cardSequenceId,
      upperCategoryId,
      lowerCategoryId: selectedOptions[index],
      secondaryAuthCode: authCode,
    }));

    console.log("Request Body:", JSON.stringify(requestBody));

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        cache: "no-store",
        body: JSON.stringify(requestBody),
      });
      console.log("Request Body:", JSON.stringify(requestBody));
      console.log(response);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(errorText);

      }

      const responseText = await response.text();
      if (!responseText) {
        throw new Error("Empty response body");
      }

      const result = JSON.parse(responseText);
      console.log(result);

      setAuthSuccess(result.status === 400 ? "400" : "200");

      setAuthTrigger(prev => prev + 1);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleBenefitChange = (cardSequenceId, authCode) => {
    updateBenefit(`/api/benefit-change/change`, cardSequenceId, authCode);
  };

  const handleBenefitReserve = (cardSequenceId, authCode) => {
    updateBenefit(`/api/benefit-change/reserve`, cardSequenceId, authCode);
  };

  // 사용자 입력에 따라 update
  const updateCategory = (index, value) => {
    setBenefitState((prevState) => ({
      ...prevState,
      categoryValues: prevState.categoryValues.map((v, i) => (i === index ? Math.min(value, 5) : v)),
    }));
  };

  const updateOption = (categoryIndex, option) => {
    setBenefitState((prevState) => ({
      ...prevState,
      selectedOptions: prevState.selectedOptions.map((v, i) => (i === categoryIndex ? option : v)),
    }));
  };

  const resetContext = () => {
    setBenefitState({
      categoryValues: [1, 1, 1, 1, 1],
      selectedCategories: [null, null, null, null, null],
      selectedOptions: [null, null, null, null, null],
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchBenefitData();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (cardSequenceId) {
      getChangerabledate(cardSequenceId);
    }
  }, [cardSequenceId]);



  if (error) {
    return <div>문제가 발생했습니다. 다시 시도해 주세요: {error}</div>
  }

  if (!benefitState) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>

      <ChangeBenefitHeader />

      <ChangeBenefitBody1 labels={labels} benefitState={benefitState} />
      <ChangeBenefitBody2 labels={labels} benefitState={benefitState} categoryMap={categoryMap} lowerCategoryMap={lowerCategoryMap} updateCategory={updateCategory} updateOption={updateOption} />
      <ChangeBenefitBody3 labels={labels} benefitState={benefitState} resetContext={resetContext} lowerCategoryMap={lowerCategoryMap} />

      <span className="flex justify-center"> 포인트 혜택은 30일 마다 변경이 가능하며 변경 수수료 1,000 원이 익월 청구됩니다.</span>


      <ChangeBenefitFoot modalTitle="혜택 변경" exitDirection="/my-card" buttonText={buttonText} onChangeBenefit={handleBenefitChange}
        onReserveBenefit={handleBenefitReserve} authSuccess={authSuccess} cardSequenceId={cardSequenceId} authTrigger={authTrigger} />

    </div>
  );
}
export default ChangeBenefitsPage;
