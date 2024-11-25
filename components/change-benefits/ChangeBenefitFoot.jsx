
import { Button } from '@headlessui/react'
import React, { useState } from 'react'
import AlertModal from '../overlay/alertModal';


const ChangeBenefitFoot = ({ exitDirection, modalTitle }) => {
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

    return (
        <div className='flex flex-col p-4 justify-center items-center'>
            <Button
                className="font-bold font2 w-full rounded bg-blue-600 py-3 px-3 text-white"
                onClick={handleOpenModal}
                direction={exitDirection}
            >
                혜택 변경 저장하기
            </Button>

            <AlertModal
                isOpen={isModalOpen}
                setIsOpen={setModalOpen}
                onClose={handleConfirmExit}
                title={modalTitle}
                description={
                    <>
                        변경 사항을 저장하시겠습니까?
                        <br />
                        (30일 이후 재 변경 가능)
                    </>
                }
            />
        </div>
    )
}

export default ChangeBenefitFoot