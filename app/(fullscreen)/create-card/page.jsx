"use client"

import SelectPoint1 from '../../../components/create-card/select-point/SelectPointHeader';
import SelectPoint2 from '../../../components/create-card/select-point/select-point2';
import CreateCardBottom from '../../../components/create-card/create-card-bottom';
import SelectCardImage from '../../../components/create-card/card-detail/select-card-image';
import SelectCardDetail from '../../../components/create-card/card-detail/select-card-detail';
import SelectDesign from '../../../components/create-card/select-design/SelectDesignHeader';
import SelectDesign1 from '../../../components/create-card/select-design/select-design1';
import SelectDesign3 from '../../../components/create-card/select-design/select-design3';
import SelectBenefit1 from '../../../components/create-card/select-benefit/select-benefitHeader';
import SelectBenefit2 from '../../../components/create-card/select-benefit/select-benefit2';
import Terms from '../../../components/create-card/terms-agreement/terms';
import { BenefitProvider } from '../../../components/create-card/select-benefit/BenefitContext';
import CardDetailHeader from '../../../components/create-card/card-detail/CardDetailHeader';
import UserDetailHeader from '../../../components/create-card/user-detail/UserDetailHeader';
import CardApplicantInfo1 from '../../../components/create-card/user-detail/card-applicant-info1';
import IdentityVerification1 from '../../../components/create-card/user-detail/identityVerification1';
import TermsAgreementHeader from '../../../components/create-card/terms-agreement/TermsAgreementHeader';
import InputAddressHeader from '../../../components/create-card/input-address/InputAddressHeader';
import SelectOtherInfo from '../../../components/create-card/input-address/SelectOtherInfo';
import CheckInformationHeader from '../../../components/create-card/check-information/CheckInformationHeader';
import CheckInformation from '../../../components/create-card/check-information/CheckInformation';

import React, { useState } from "react";
import AlertModal from '../../../app/(fullscreen)/create-card/AlertModal';

const CreateCardPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showAlertModal, setShowAlertModal] = useState(false);
  // 1페이지
  const [selectedCardIndex, setSelectedCardIndex] = useState(0); // 카드 번호 상태 관리
  // 2페이지
  const [categoryValues, setCategoryValues] = useState([1, 1, 1, 1, 1]);
  const [selectedOptions, setSelectedOptions] = useState([null, null, null, null, null]);
  // 3페이지
  const [activeOptions, setActiveOptions] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showToast, setShowToast] = useState(false);
  // 4페이지
  const [cardOptions, setCardOptions] = useState({
    cardBrand: 'VISA',
    isAppCard: null,
    isForeignBlocked: false,
    isPostpaidTransport: false,
  });
  // 5페이지
  const [applicantInfo, setApplicantInfo] = useState({
    residenceNumber: '',
    residenceNumber2: '',
    name: '',
    englishName: '',
  });
  const [isVerified, setIsVerified] = useState(false);
  // 6페이지
  const [isAccepted, setAccepted] = useState([false, false, false, false, false, false]);
  // 7페이지
  const [formData, setFormData] = useState({
    deliveryPostalCode: '',
    deliveryAddress: '',
    detailedDeliveryAddress: '',
    residentialPostalCode: '',
    residentialAddress: '',
    detailedResidentialAddress: '',
    paymentHistoryReceiveMethod: '',
    cardPassword: '',
    confirmCardPassword: '',
    emailId: '',
    emailDomain: '',
    phoneNumber: '',
    isSameAsDeliveryAddress: false,
  });



  const submitCardApplication = async () => {

    console.log("Hello Bro");
    try {
      const lowerCategoryMapping = {
        "백화점(더현대, 신세계, 롯데백화점)": 100,
        "온라인쇼핑(쿠팡, G마켓)": 101,
        "마트(이마트, 홈플러스)": 102,
        "주유소(SK, GS칼텍스)": 200,
        "통신(핸드폰 요금)": 201,
        "대중교통(버스, 지하철)": 202,
        "편의점(CU, GS25)": 300,
        "커피(스타벅스, 투썸)": 301,
        "배달(배달의민족, 요기요)": 302,
        "투어(여행 패키지)": 400,
        "차량(렌터카, 차량 대여)": 401,
        "숙소(호텔, 에어비앤비)": 402,
        "OTT(넷플릭스, 유튜브 프리미엄)": 500,
        "영화관(CGV, 롯데시네마)": 501,
        "도서(교보문고, 예스24)": 502,
      };

      console.log(lowerCategoryMapping);

      const mapCategoryToId = (categoryIndex, selectedOption) => {
        // Map upperCategoryIds based on order: 쇼핑 (1), 생활 (2), 푸드 (3), 여행 (4), 문화 (5)
        const upperCategoryId = categoryIndex + 1;


        // 매핑 상태 디버깅
        // if (!lowerCategoryId && selectedOption) {
        //   console.error(`Mapping failed for: ${selectedOption}`);
        // }

        return {
          upperCategoryId,
          // lowerCategoryId,
          benefitRate: Math.min(categoryValues[categoryIndex] - 1, 4), // 할인율 제한 (0-4)
        };
      };


      const cardApplicationData = {
        // 카드 기본 정보
        cardColor: selectedCardIndex,
        cardBrand: cardOptions.cardBrand,
        isAppCard: cardOptions.isAppCard,
        isForeignBlocked: cardOptions.isForeignBlocked,
        isPostpaidTransport: cardOptions.isPostpaidTransport,
        cardPassword: formData.cardPassword,
        cardPasswordConfirm: formData.confirmCardPassword,

        // optionalTerms 값 설정
        optionalTerms: (() => {
          const fifth = isAccepted[4]; // 5번째 값
          const sixth = isAccepted[5]; // 6번째 값
          if (fifth && sixth) return 3;
          if (fifth) return 1;
          if (sixth) return 2;
          return 0;
        })(),
        paymentReceiptMethods: formData.paymentHistoryReceiveMethod,

        // 카드 혜택 정보
        benefits: selectedOptions.map((option, index) => mapCategoryToId(index, option)),


        // 포인트 사용 방법
        isLotto: activeOptions.includes('일일 복권'),
        isPayback: activeOptions.includes('페이백'),
        isPieceStock: activeOptions.includes('조각 투자'),


        // 신청자 정보
        residenceNumber: `${applicantInfo.residenceNumber}${applicantInfo.residenceNumber2}`,
        applicantName: applicantInfo.name,
        englishName: applicantInfo.englishName,
        zipCode: formData.deliveryPostalCode,
        shippingAddress: formData.deliveryAddress,
        shippingDetailAddress: formData.detailedDeliveryAddress,
        applicantEmail: `${formData.emailId}@${formData.emailDomain}`,
        phoneNumber: formData.phoneNumber,
        homeAddress: formData.residentialAddress,
        homeDetailAddress: formData.detailedResidentialAddress
      };

      console.log("Card Application Data:", cardApplicationData);
      console.log("selectedOption:", selectedOptions);

      const response = await fetch('/api/create-card', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cardApplicationData)
      });

      if (!response.ok) {
        throw new Error('카드 신청에 실패했습니다');
      }

      const result = await response.json();
      // 성공 처리 로직 (예: 성공 페이지로 이동)

    } catch (error) {
      setShowAlertModal(true);
    }
  };



  const TOTAL_PAGES = 8;
  const handleNextPage = () => {
    if (currentPage === TOTAL_PAGES) return;

    if (currentPage === 4 && cardOptions.isAppCard === null) {
      setShowAlertModal(true);
      return;
    }
    if (currentPage === 5) {
      const { residenceNumber, residenceNumber2, name, englishName } = applicantInfo;
      if (!residenceNumber || !residenceNumber2 || !name || !englishName || !isVerified) {
        setShowAlertModal(true);
        return;
      }
    }
    if (currentPage === 6) {
      // Check if first 4 items are all true
      const requiredTerms = isAccepted.slice(0, 4);
      if (!requiredTerms.every(term => term === true)) {
        setShowAlertModal(true);
        return;
      }
    }
    if (currentPage === 7) {
      // Exclude isSameAsDeliveryAddress from validation check
      const isFormValid = Object.entries(formData)
          .filter(([key]) => key !== 'isSameAsDeliveryAddress')
          .every(([_, value]) => value !== '');

      if (!isFormValid) {
        setShowAlertModal(true);
        return;
      }
    }
    setCurrentPage((prevPage) => (prevPage < TOTAL_PAGES ? prevPage + 1 : prevPage));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage > 1 ? prevPage - 1 : prevPage);
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      justifyContent: "space-between",
    },
    content: {
      flex: 1,
      overflowY: "auto",
    },
  };

  // 현재 페이지에 따라 렌더링할 콘텐츠
  const renderContent = () => {
    switch (currentPage) {

      case 1:
        return <div>
          <header>
            <SelectDesign onClick={handlePrevPage} />
          </header>
          <SelectDesign1
              selectedCardIndex={selectedCardIndex} // 선택된 카드 인덱스 전달
              onCardChange={setSelectedCardIndex} // 상태 변경 핸들러 전달
          />
          <SelectDesign3 />
        </div>;

      case 2:
        return <div>
          <header>
            <SelectBenefit1 onClick={handlePrevPage} />
          </header>
          <BenefitProvider
              categoryValues={categoryValues}
              setCategoryValues={setCategoryValues}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
          >
            <SelectBenefit2 />
          </BenefitProvider>
        </div>;

      case 3:
        return <div>
          <header>
            <SelectPoint1 onClick={handlePrevPage} />
          </header>
          <SelectPoint2
              activeOptions={activeOptions}
              setActiveOptions={setActiveOptions}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              showToast={showToast}
              setShowToast={setShowToast}
          />
        </div>;

      case 4:
        return <div>
          <header>
            <CardDetailHeader onClick={handlePrevPage} />
          </header>
          {/* 선택된 카드 정보를 이미지로 보여주는 컴포넌트 */}
          <SelectCardImage selectedCardIndex={selectedCardIndex} />
          <SelectCardDetail
              cardOptions={cardOptions}
              setCardOptions={setCardOptions}
          />
        </div>;

      case 5:
        return <div>
          <header>
            <UserDetailHeader onClick={handlePrevPage} />
          </header>
          {/*UserDetail - 사용자 상세 정보 */}
          <CardApplicantInfo1
              applicantInfo={applicantInfo}
              setApplicantInfo={setApplicantInfo}
              isVerified={isVerified}
              setIsVerified={setIsVerified}

          />
          <IdentityVerification1
              isVerified={isVerified}
              setIsVerified={setIsVerified}
          />
        </div>;

      case 6:
        return <div>
          <header>
            <TermsAgreementHeader onClick={handlePrevPage} />
          </header>
          <Terms isAccepted={isAccepted} setAccepted={setAccepted} />
        </div>;

      case 7:
        return <div>
          <header>
            <InputAddressHeader onClick={handlePrevPage} />
          </header>
          {/*InputAddressHeader - 배송지 입력 */}
          <SelectOtherInfo
              formData={formData}
              setFormData={setFormData}
          />
        </div>;

      case 8:
        return <div>
          <header>
            <CheckInformationHeader onClick={handlePrevPage} />
          </header>
          {/*CheckInformationHeader - 입력 정보 확인 */}
          <CheckInformation
              residenceNumber={applicantInfo.residenceNumber}
              residenceNumber2={applicantInfo.residenceNumber2}
              deliveryFullAddress={`${formData.deliveryPostalCode} ${formData.deliveryAddress} ${formData.detailedDeliveryAddress}`}
              residentialFullAddress={`${formData.residentialPostalCode} ${formData.residentialAddress} ${formData.detailedResidentialAddress}`}
              email={`${formData.emailId}@${formData.emailDomain}`}
              phoneNumber={formData.phoneNumber}
              paymentHistoryReceiveMethod={formData.paymentHistoryReceiveMethod}
              isOverseasPaymentBlocked={cardOptions.isForeignBlocked}
              isTransportationEnabled={cardOptions.isPostpaidTransport}
          />
        </div>;
    }
  };


  return (
    <div>
      <div style={styles.content}>{renderContent()}</div>
      <CreateCardBottom
        onClick={currentPage === TOTAL_PAGES ? submitCardApplication : handleNextPage}
        currentPage={currentPage}
        totalPage={TOTAL_PAGES}
      />
      <AlertModal
          isOpen={showAlertModal}
          onClose={() => setShowAlertModal(false)}
          message="모든 항목에 체크를 해주세요"
      />

    </div>
  );
}

export default CreateCardPage;