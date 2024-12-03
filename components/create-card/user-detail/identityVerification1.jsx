'use client';

import React, { useState } from 'react';
import IdentityVerification2 from './identityVerification2';

function IdentityVerification1({isVerified, setIsVerified} ) {
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleModalClose = (verified = false) => {
        setIsModalOpen(false);
        if (verified) {
            setIsVerified(true);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-10">
            {/* 본인인증 버튼 */}
            <div className="mt-6">
                <div className="flex items-center justify-between bg-white p-6 rounded-xl border-2 border-gray-200">
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800">
                            신청인 본인인증
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                            {isVerified
                                ? '본인인증이 완료되었습니다.'
                                : '휴대폰 문자로 인증을 진행합니다.'}
                        </p>
                    </div>
                    {isVerified ? (
                        <div className="px-6 py-3 bg-gray-100 rounded-xl text-gray-600 font-semibold flex items-center">
                            <span>인증완료</span>
                            <svg
                                className="w-5 h-5 ml-2"
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
                            className="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold
                    hover:bg-blue-600 shadow-md hover:shadow-lg
                    transition-all duration-200 
                    flex items-center space-x-2"
                        >
                            <span>본인인증 하기</span>
                            <svg
                                className="w-5 h-5"
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

            {/* 인증 모달 */}
            <IdentityVerification2
                isOpen={isModalOpen}
                onClose={handleModalClose}
            />
        </div>
    );
}

export default IdentityVerification1;
