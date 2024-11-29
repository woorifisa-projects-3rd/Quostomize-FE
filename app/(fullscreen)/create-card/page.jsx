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



  const TOTAL_PAGES = 8;
  const handleNextPage = () => {
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
        onClick={currentPage < TOTAL_PAGES ? handleNextPage : null}
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