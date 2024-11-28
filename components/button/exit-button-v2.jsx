import React, { useState } from "react";
import { X } from "lucide-react";
import AlertModal from "../overlay/alertModal";

function ExitButtonV2({ direction }) {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleConfirmExit = () => {
        setModalOpen(false);
        if (direction) {
            window.location.href = direction;
        }
    };

    return (
        <div>
            {/* 나가기 버튼 */}
            <button
                onClick={handleOpenModal}
                size={45}
                className="transistion-colors hover:text-gray-400 text-gray-700 rounded-full focus:outline-none"
            >
                <X size={45} className="transition-colors hover:text-gray-400" />
            </button>

            <AlertModal
                isOpen={isModalOpen}
                setIsOpen={setModalOpen}
                onClose={handleConfirmExit}
                title="나의 카드"
                description="정말 나가시겠습니까?"
            />
        </div>
    );
}

export default ExitButtonV2;
