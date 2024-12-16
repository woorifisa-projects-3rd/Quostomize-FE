import React, { useState } from "react";
import { X } from "lucide-react";
import AlertModal from "../overlay/alertModal";
import { useRouter } from "next/navigation";

function ExitButton({ direction, title, description }) {
    const [isModalOpen, setModalOpen] = useState(false);
    const router = useRouter();

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleConfirmExit = () => {
        setModalOpen(false);
        if (direction) {
            router.push(direction);
        }
    };

    return (
        <div className="flex items-center">
            {/* 나가기 버튼 */}
            <button
                onClick={handleOpenModal}
                size={35}
                className="transistion-colors hover:text-gray-400 text-gray-700 rounded-full focus:outline-none"
            >
                <X size={35} className="transition-colors hover:text-gray-400" />
            </button>

            <AlertModal
                isOpen={isModalOpen}
                setIsOpen={setModalOpen}
                onClose={handleConfirmExit}
                title={title}
                description={description}
            />
        </div>
    );
}

export default ExitButton;
