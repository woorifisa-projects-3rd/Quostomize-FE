'use client';

import React, { useState } from 'react';
import IdentityVerification2 from './identityVerification2';

function IdentityVerification1({isVerified, setIsVerified}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalClose = (verified = false) => {
        setIsModalOpen(false);
        if (verified) {
            setIsVerified(true);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-4 mb-4 sm:px-6 lg:px-8">
            {/* 본인인증 버튼 */}
            <div className="mt-4 sm:mt-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between 
                            bg-white p-4 sm:p-6 rounded-xl shadow-lg
                            space-y-4 sm:space-y-0">
                    <div className="flex-1">
                        <h4 className="text-base sm:text-lg font-semibold text-gray-800">
                            신청인 본인인증
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1">
                            {isVerified
                                ? '본인인증이 완료되었습니다.'
                                : '휴대폰 문자로 인증을 진행합니다.'}
                        </p>
                    </div>
                    <div className="flex justify-end">
                        {isVerified ? (
                            <div className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3
                                        bg-gray-300 rounded-lg text-gray-800 
                                        font-semibold flex items-center justify-center
                                        text-sm sm:text-base">
                                <span>인증완료</span>
                                <svg
                                    className="w-4 h-4 sm:w-5 sm:h-5 ml-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 
                                        bg-blue-400 text-white rounded-lg font-semibold
                                        hover:bg-blue-500 shadow-md hover:shadow-lg
                                        transition-all duration-200 
                                        flex items-center justify-center sm:justify-start
                                        text-sm sm:text-base"
                            >
                                <span>본인인증 하기</span>
                                <svg
                                    className="w-4 h-4 sm:w-5 sm:h-5 ml-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* 인증 모달 */}
            <IdentityVerification2
                isOpen={isModalOpen}
                onClose={handleModalClose}
            />
        </div>
    );
}

export default IdentityVerification1;