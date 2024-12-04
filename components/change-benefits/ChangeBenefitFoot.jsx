
import { Button } from '@headlessui/react'
import React, { useEffect, useState } from 'react'
import SecondAuthModal from '../overlay/SecondAuthModal';
import AlertModal from '../overlay/alertModal';
import Toast from '../overlay/toast';


const ChangeBenefitFoot = ({ exitDirection, modalTitle, buttonText, onChangeBenefit, onReserveBenefit, authSuccess, cardSequenceId, authTrigger, isButtonDisabled }) => {
    const [modalState, setModalState] = useState({
        isAlertModalOpen: false,
        isSecondAuthModalOpen: false,
        isSuccessModalOpen: false,
        isRetryAuthModalOpen: false,
    });
    const [isToastOpen, setIsToastOpen] = useState(false);
    const [isButtonDisabledState, setIsButtonDisabledState] = useState(false);

    const handleConfirmAlert = () => {
        setModalState(prevState => ({ ...prevState, isAlertModalOpen: false, isSecondAuthModalOpen: true }));
    };

    const handleCloseSecondAuthModal = () => {
        setModalState(prevState => ({ ...prevState, isSecondAuthModalOpen: false }));
    };

    const handleRetryAuth = () => {
        setModalState(prevState => ({ ...prevState, isRetryAuthModalOpen: false, isSecondAuthModalOpen: true }));
    };

    const handleSuccessClose = () => {
        setModalState(prevState => ({ ...prevState, isSuccessModalOpen: false }));
        if (exitDirection) {
            window.location.href = exitDirection;
        }
    };

    useEffect(() => {
        if (authSuccess === null) return;
        setModalState(prevState => ({
            ...prevState,
            isSuccessModalOpen: authSuccess !== "400",
            isRetryAuthModalOpen: authSuccess === "400",
        }));
    }, [authTrigger]);

    const handleAuthCompleteAndChange = (authCode) => {
        if (cardSequenceId && authCode) {

            if (buttonText === '예약하기') {
                onReserveBenefit(cardSequenceId, authCode);
            } else {
                onChangeBenefit(cardSequenceId, authCode);
            }
            setModalState(prevState => {
                return {
                    ...prevState,
                    isSuccessModalOpen: true
                }
            }
            )
            setTimeout(() => {
                setModalState(prevState => ({
                    ...prevState,
                    isSecondAuthModalOpen: false,
                }));
            }, 500);

        } else {

            setModalState(prevState => ({
                ...prevState,
                isRetryAuthModalOpen: true,
                isSecondAuthModalOpen: false,
            }));

        }
    };

    const updateIsSuccessModalOpen = () => {
        setModalState((prev) => {
            return {
                ...prev,
                isSuccessModalOpen: false,
            }
        })
    };

    const updateIsAlertModalOpen = () => {
        setModalState((prev) => {
            return {
                ...prev,
                isAlertModalOpen: false,
            }
        })
    };

    const updateRetryAuthModalOpen = () => {
        setModalState((prev) => {
            return {
                ...prev,
                isRetryAuthModalOpen: false,
            }
        })
    };

    const handleButtonClick = () => {
        setModalState(prevState => ({ ...prevState, isSecondAuthModalOpen: true }));
    };

    const handleClick = () => {
        const disabled = isButtonDisabled();
        if (disabled) {
            setIsToastOpen(true);
            setTimeout(() => {
                setIsToastOpen(false);
            }, 3000);
        } else {
            handleButtonClick();
        }
        setIsButtonDisabledState(disabled);
    };


    const getDescription = () => {
        return buttonText === '예약하기'
            ? '혜택 변경을 예약하시겠습니까?'
            : '변경 사항을 저장하시겠습니까?';
    };



    return (
        <div>
            <div className='flex flex-col p-4 justify-center items-center'>
                <Button
                    className={`font-bold font2 w-full rounded py-3 px-3 ${isButtonDisabled() ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-blue-600 text-white'}`}
                    onClick={handleClick}
                    direction={exitDirection}
                >
                    {buttonText || '저장 하기'}
                </Button>
                <Toast isOpen={isToastOpen} message="최소 1 개 이상의 혜택을 선택해주세요." />
            </div>

            <div>
                <AlertModal
                    isOpen={modalState.isAlertModalOpen}
                    setIsOpen={updateIsAlertModalOpen}
                    onClose={handleConfirmAlert}
                    title={modalTitle}
                    description={getDescription()}
                />
                <SecondAuthModal
                    onClose={handleCloseSecondAuthModal}
                    onComplete={handleAuthCompleteAndChange}
                    isOpen={modalState.isSecondAuthModalOpen}
                    isConfirm="2차 인증번호를 입력하세요."
                />

                <AlertModal
                    isOpen={modalState.isRetryAuthModalOpen}
                    setIsOpen={updateRetryAuthModalOpen}
                    onClose={handleRetryAuth}
                    title="인증 실패"
                    description="2차 인증번호가 일치하지 않습니다. 다시 입력해주세요."
                />

                <AlertModal
                    isOpen={modalState.isSuccessModalOpen}
                    setIsOpen={updateIsSuccessModalOpen}
                    onClose={handleSuccessClose}
                    title="변경 신청 완료"
                    description="변경 신청이 완료되었습니다."
                    exitDirection="/my-card"
                />

            </div>
        </div>

    )
}

export default ChangeBenefitFoot