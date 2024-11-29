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

const CreateCardPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0); // 카드 번호 상태 관리

  const [activeOptions, setActiveOptions] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showToast, setShowToast] = useState(false);

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
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [isConfirmPasswordModalOpen, setConfirmPasswordModalOpen] = useState(false);


  const TOTAL_PAGES = 8;
  const handleNextPage = () => {
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
          <BenefitProvider>
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
          <SelectCardDetail />
        </div>;

      case 5:
        return <div>
          <header>
            <UserDetailHeader onClick={handlePrevPage} />
          </header>
          {/*UserDetail - 사용자 상세 정보 */}
          <CardApplicantInfo1 />
          <IdentityVerification1 />
        </div>;

      case 6:
        return <div>
          <header>
            <TermsAgreementHeader onClick={handlePrevPage} />
          </header>
          <Terms />
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
              errors={errors}
              setErrors={setErrors}
              touched={touched}
              setTouched={setTouched}
              isPasswordModalOpen={isPasswordModalOpen}
              setPasswordModalOpen={setPasswordModalOpen}
              isConfirmPasswordModalOpen={isConfirmPasswordModalOpen}
              setConfirmPasswordModalOpen={setConfirmPasswordModalOpen}
          />
        </div>;

      case 8:
        return <div>
          <header>
            <CheckInformationHeader onClick={handlePrevPage} />
          </header>
          {/*CheckInformationHeader - 입력 정보 확인 */}
          <CheckInformation/>
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

    </div>
  );
}

export default CreateCardPage;