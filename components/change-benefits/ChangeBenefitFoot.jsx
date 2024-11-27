
import { Button } from '@headlessui/react'
import React, { useState } from 'react'
import AlertModal from '../overlay/alertModal';


const ChangeBenefitFoot = ({ exitDirection, modalTitle, buttonText }) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleConfirmExit = () => {
        setModalOpen(false);
        if (exitDirection) {
            window.location.href = exitDirection;
        }
    };

    const getDescription = () => {
        if (buttonText === '예약하기') {
            return '혜택 변경을 예약하시겠습니까?'
        } else if (buttonText === '저장하기') {
            return '변경 사항을 저장하시겠습니까?'
        } else {
            return '변경 사항을 저장하시겠습니까?'
        }
    }

    return (
        <div className='flex flex-col p-4 justify-center items-center'>
            <Button
                className="font-bold font2 w-full rounded bg-blue-600 py-3 px-3 text-white"
                onClick={handleOpenModal}
                direction={exitDirection}
            >
                {buttonText || '저장 하기'}
            </Button>

            <AlertModal
                isOpen={isModalOpen}
                setIsOpen={setModalOpen}
                onClose={handleConfirmExit}
                title={modalTitle}
                description={getDescription()}
            />
        </div>
    )
}

export default ChangeBenefitFoot