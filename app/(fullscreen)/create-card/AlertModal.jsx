// components/common/AlertModal.jsx
import React from 'react';
import Icons from '../../../public/icons/icons';

const AlertModal = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-none"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-xl w-[80%] max-w-xs transform transition-all">
                <div className="px-6 pt-8 pb-5 mx-1">
                    {/* Icon and Message with better centering */}
                    <div className="flex items-center justify-center mb-3">
                        <img
                            src={Icons.exclamation}
                            alt="경고"
                            className="w-9 h-9 an mr-3"
                        />
                        <p className="text-lg font-bold text-gray-700">
                            {message}
                        </p>
                    </div>

                    {/* Button */}
                    <button
                        onClick={onClose}
                        className="w-full mt-5 px-4 py-2 sm:py-2 bg-blue-400 text-white rounded-xl
                                font-semibold hover:bg-blue-500 transition-colors
                                active:scale-[0.98] transform duration-100 text-lg
                                shadow-md hover:shadow-lg"
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AlertModal;