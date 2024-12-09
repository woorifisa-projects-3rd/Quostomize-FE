'use client';

import React from 'react';

const ErrorModal = ({ message, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-[280px] sm:max-w-xs mx-auto 
                            p-4 sm:p-6 text-center shadow-xl transform transition-all">
                <div className="mb-2 sm:mb-3">
                    <h3 className="text-lg font-bold text-red-500">
                        인증번호 오류
                    </h3>
                </div>
                
                <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 
                            px-2 sm:px-4 break-keep">
                    {message}
                </p>

                <button
                    onClick={onClose}
                    className="w-full py-2.5 sm:py-3
                            bg-blue-400 text-white text-sm sm:text-base 
                            rounded-xl font-medium
                            hover:bg-blue-600 
                            transition-colors duration-200
                            shadow-md hover:shadow-lg"
                >
                    확인
                </button>
            </div>
        </div>
    );
};

export default ErrorModal;