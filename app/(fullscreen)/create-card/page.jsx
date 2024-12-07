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
import CardDetailHeader from '../../../components/create-card/card-detail/CardDetailHeader';
import UserDetailHeader from '../../../components/create-card/user-detail/UserDetailHeader';
import CardApplicantInfo1 from '../../../components/create-card/user-detail/card-applicant-info1';
import IdentityVerification1 from '../../../components/create-card/user-detail/identityVerification1';
import TermsAgreementHeader from '../../../components/create-card/terms-agreement/TermsAgreementHeader';
import InputAddressHeader from '../../../components/create-card/input-address/input-addressHeader';
import SelectOtherInfo from '../../../components/create-card/input-address/SelectOtherInfo';
import CheckInformationHeader from '../../../components/create-card/check-information/CheckInformationHeader';
import CheckInformation from '../../../components/create-card/check-information/CheckInformation';
import Icons from '../../../public/icons/icons';
import React, { useState, useEffect } from "react";
import AlertModal from '../../../app/(fullscreen)/create-card/AlertModal';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

const CreateCardPage = () => {
  const router = useRouter();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [idempotencyKey, setIdempotencyKey] = useState(null);

  useEffect(() => {
    // 최초 페이지 로드 시 멱등성 키를 생성하고 상태에 저장
    if (!idempotencyKey) {
      setIdempotencyKey(uuidv4());
    }
  }, [idempotencyKey]);


  // 1페이지
  const [selectedCardIndex, setSelectedCardIndex] = useState(0); // 카드 번호 상태 관리
  // 2페이지
  const [benefitState, setBenefitState] = useState({
    categoryValues: [1, 1, 1, 1, 1],
    selectedCategories: [null, null, null, null, null],
    selectedOptions: [null, null, null, null, null],
  });
  // 3페이지
  const [activeOptions, setActiveOptions] = useState(['일일 복권']);
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


  const mapCategoryToId = (categoryIndex, selectedOption) => {
    const upperCategoryId = categoryIndex + 1;

    // Handle both object and numeric values in selectedOption
    const lowerCategoryId =
      typeof selectedOption === "object" ? selectedOption?.id : selectedOption;

    const benefitRate = benefitState.categoryValues[categoryIndex]
      ? Math.min(benefitState.categoryValues[categoryIndex] - 1, 4) // 할인율 제한 (0-4)
      : 0; // 기본값 0

    return {
      upperCategoryId,
      lowerCategoryId: lowerCategoryId || null,
      benefitRate,
    };
  };

  const paymentMethodMapping = {
    "이메일": 0,
    "문자": 1,
    "우편": 2,
  };


  const submitCardApplication = async () => {

    try {

      const cardApplicationData = {
        // 카드 기본 정보
        cardColor: selectedCardIndex,
        cardBrand: cardOptions.cardBrand === 'VISA' ? 1 : cardOptions.cardBrand,
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
        paymentReceiptMethods: paymentMethodMapping[formData.paymentHistoryReceiveMethod] ?? 0, // 기본값 이메일(0)


        // 카드 혜택 정보
        benefits: benefitState.selectedOptions.map((option, index) => mapCategoryToId(index, option)),

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

      const response = await fetch("/api/create-card", {
        method: 'POST',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': idempotencyKey,
        },
        credentials: 'include',
        body: JSON.stringify(cardApplicationData)
      });

      if (response.status !== 201) {
        const errorData = await response.json();
        console.error("API Error Response:", errorData);
        throw new Error('카드 신청에 실패했습니다: ' + (errorData.message || 'Unknown error'));
      }
      const result = await response.json();
      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(false);
        router.push('/home');
      }, 4000);

    } catch (error) {
      console.log("Hello boy");
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
    // if (currentPage === 5) {
    //   const { residenceNumber, residenceNumber2, name, englishName } = applicantInfo;
    //   if (!residenceNumber || !residenceNumber2 || !name || !englishName || !isVerified) {
    //     setShowAlertModal(true);
    //     return;
    //   }
    // }
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
          <SelectBenefit2
            benefitState={benefitState}
            setBenefitState={setBenefitState}
          />
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
      {showSuccessAlert && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-50 rounded-lg shadow-lg p-6 z-50">
          <div className="flex flex-col items-center">
            <span className="text-4xl mb-3">
              <img src={Icons.eco} alt="Success Icon" width="100" height="100" />
            </span>
            <p className="text-lg font-medium text-blue-500">카드 신청이 완료되었습니다</p>
          </div>
        </div>
      )}

    </div>
  );
}

export default CreateCardPage;