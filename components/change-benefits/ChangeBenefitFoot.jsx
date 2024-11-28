
import { Button } from '@headlessui/react'
import React, { useEffect, useState } from 'react'
import SecondAuthModal from '../overlay/SecondAuthModal';
import AlertModal from '../overlay/alertModal';


const ChangeBenefitFoot = ({ exitDirection, modalTitle, buttonText, onChangeBenefit, onReserveBenefit, authSuccess }) => {
    const [isAlertModalOpen, setAlertModalOpen] = useState(false);
    const [isSecondAuthModalOpen, setSecondAuthModalOpen] = useState(false);
    const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
    const [isRetryAuthModalOpen, setRetryAuthModalOpen] = useState(false);

    const handleOpenAlertModal = () => {
        setAlertModalOpen(true);
    };

    const handleCloseAlertModal = () => {
        setAlertModalOpen(false);
    };

    const handleConfirmAlert = () => {
        setAlertModalOpen(false);
        setSecondAuthModalOpen(true);
    };

    const handleCloseSecondAuthModal = () => {
        setSecondAuthModalOpen(false);
    };

    const handleRetryAuth = () => {
        setRetryAuthModalOpen(false);
        setSecondAuthModalOpen(true);
    };

    const handleSuccessClose = () => {
        setSuccessModalOpen(false);
    };

    useEffect(() => {
        if (authSuccess) {
            setSuccessModalOpen(true);
        } else {
            setRetryAuthModalOpen(true);
        }
    }, [authSuccess]);

    const handleButtonClick = () => {
        if (buttonText === '예약하기') {
            onChangeBenefit();
        } else {
            onReserveBenefit();
        }
    };


    const getDescription = () => {
        return buttonText === '예약하기'
            ? '혜택 변경을 예약하시겠습니까?'
            : '변경 사항을 저장하시겠습니까?';
    };



    return (
        <div className='flex flex-col p-4 justify-center items-center'>
            <Button
                className="font-bold font2 w-full rounded bg-blue-600 py-3 px-3 text-white"
                onClick={handleOpenAlertModal}
                direction={exitDirection}
            >
                {buttonText || '저장 하기'}
            </Button>
            <AlertModal
                isOpen={isAlertModalOpen}
                setIsOpen={setAlertModalOpen}
                onClose={() => isAlertModalOpen && handleConfirmAlert()}
                title={modalTitle}
                description={getDescription()}
            />
            <SecondAuthModal
                onClose={handleCloseSecondAuthModal}
                onComplete={handleButtonClick}
                isOpen={isSecondAuthModalOpen}
                isConfirm="2차 인증번호를 입력하세요."
            />

            <AlertModal
                isOpen={isRetryAuthModalOpen}
                setIsOpen={setRetryAuthModalOpen}
                onClose={handleRetryAuth}
                title="인증 실패"
                description="2차 인증번호가 일치하지 않습니다. 다시 입력해주세요."
            />

            <AlertModal
                isOpen={isSuccessModalOpen}
                setIsOpen={setSuccessModalOpen}
                onClose={handleSuccessClose}
                title="변경 신청 완료"
                description="변경 신청이 완료되었습니다."
            />

        </div>
    )
}

export default ChangeBenefitFoot