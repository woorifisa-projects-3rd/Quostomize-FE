// components/common/alertModal.jsx
import React from 'react';
import Icons from '../../../public/icons/icons';

const AlertModal = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-xl w-[90%] max-w-md transform transition-all">
                <div className="p-8 pt-10">
                    {/* Icon and Message with better centering */}
                    <div className="flex items-center justify-center pl-2 mb-4">
                        <img
                            src={Icons.exclamation}
                            alt="경고"
                            className="w-10 h-10 animate-bounce mr-4"
                        />
                        <p className="text-lg font-bold text-gray-800">
                            {message}
                        </p>
                    </div>

                    {/* Button */}
                    <button
                        onClick={onClose}
                        className="w-full mt-8 px-4 py-3 bg-blue-500 text-white rounded-xl
                                 font-semibold hover:bg-blue-600 transition-colors
                                 active:scale-[0.98] transform duration-100
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