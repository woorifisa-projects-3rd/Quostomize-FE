'use client';

import React, { useState, useEffect } from 'react';
import ErrorModal from '../user-detail/ErrorModal';

function VerificationModal({ isOpen, onClose }) {
    const [step, setStep] = useState(1);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [timeLeft, setTimeLeft] = useState(180); // 3분 = 180초
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [isRequesting, setIsRequesting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isErrorModalOpen, setErrorModalOpen] = useState(false);

    useEffect(() => {
        let timer;
        if (isTimerActive && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setStep(1);
            setVerificationCode('');
            setIsTimerActive(false);
        }
        return () => clearInterval(timer);
    }, [isTimerActive, timeLeft]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handlePhoneNumberChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        if (value.length <= 11) {
            setPhoneNumber(value);
        }
    };

    const formatPhoneNumber = (number) => {
        if (number.length <= 3) return number;
        if (number.length <= 7) return `${number.slice(0, 3)}-${number.slice(3)}`;
        return `${number.slice(0, 3)}-${number.slice(3, 7)}-${number.slice(7)}`;
    };

    const handleVerificationCodeChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        if (value.length <= 6) {
            setVerificationCode(value);
        }
    };

    const requestVerificationCode = async () => {
        if (phoneNumber.length === 11 && !isRequesting) {
            setIsRequesting(true);
            try {
                const response = await fetch('/api/create-card/requestMessage', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ phone: phoneNumber, certificationNumber: "" }),
                });

                if (response.status === 204) {
                    setStep(2);
                    setVerificationCode('');
                    setTimeLeft(180);
                    setIsTimerActive(true);
                } else {
                    throw new Error('인증번호 요청에 실패했습니다. 다시 시도해주세요.');
                }
            } catch (error) {
                setErrorMessage(error.message);
                setErrorModalOpen(true);
            } finally {
                setIsRequesting(false);
            }
        }
    };

    const verifyCode = async () => {
        if (verificationCode.length === 6 && timeLeft > 0) {
            try {
                const response = await fetch('/api/create-card/authorizingAuthNumber', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ phone: phoneNumber, certificationNumber: verificationCode }),
                });
    
                if (response.ok) {
                    onClose(true);
                } else {
                    const errorData = await response.json();
                    throw new Error(errorData.message || '인증번호 확인에 실패했습니다. 다시 시도해주세요.');
                }
            } catch (error) {
                setErrorMessage(error.message);
                setErrorModalOpen(true);
                setStep(1);
            }
        }
    }
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-5">
            <div className="bg-white rounded-2xl w-full max-w-md mx-auto p-2">
                {/* 모달 헤더 */}
                <div className="p-4 sm:p-6 border-b border-gray-200">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                        {step === 1 ? '휴대폰 본인인증' : '인증번호 입력'}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                        {step === 1 
                            ? '휴대폰 번호를 입력해주세요.' 
                            : '수신하신 인증번호 6자리를 입력해주세요.'}
                    </p>
                </div>

                {/* 모달 본문 */}
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                    {step === 1 ? (
                        <div>
                            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                                휴대폰 번호
                            </label>
                            <input
                                type="tel"
                                value={formatPhoneNumber(phoneNumber)}
                                onChange={handlePhoneNumberChange}
                                className="w-full p-3 sm:p-4 text-sm sm:text-base border-2 rounded-xl 
                                        bg-gray-50 focus:bg-white focus:border-blue-500 
                                        outline-none transition-all duration-300"
                                placeholder="'-' 없이 입력해주세요"
                                maxLength={13}
                            />
                            {phoneNumber && phoneNumber.length !== 11 && (
                                <p className="text-red-500 text-xs sm:text-sm mt-2">
                                    휴대폰 번호 11자리를 입력해주세요.
                                </p>
                            )}
                        </div>
                    ) : (
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-sm sm:text-base font-medium text-gray-700">
                                    인증번호
                                </label>
                                <span className={`text-sm sm:text-base font-medium ${
                                    timeLeft < 60 ? 'text-red-500' : 'text-blue-500'
                                }`}>
                                    {formatTime(timeLeft)}
                                </span>
                            </div>
                            <input
                                type="text"
                                value={verificationCode}
                                onChange={handleVerificationCodeChange}
                                className="w-full p-3 sm:p-4 text-sm sm:text-base border-2 rounded-xl 
                                        bg-gray-50 focus:bg-white focus:border-blue-500 
                                        outline-none transition-all duration-300"
                                placeholder="인증번호 6자리 입력"
                                maxLength={6}
                                disabled={timeLeft === 0}
                            />
                            {timeLeft === 0 ? (
                                <p className="text-red-500 text-xs sm:text-sm mt-2">
                                    인증 시간이 만료되었습니다. 다시 시도해주세요.
                                </p>
                            ) : verificationCode && verificationCode.length !== 6 && (
                                <p className="text-red-500 text-xs sm:text-sm mt-2">
                                    인증번호 6자리를 입력해주세요.
                                </p>
                            )}
                        </div>
                    )}

                    {/* 버튼 영역 */}
                    <div className="flex space-x-3 mt-6">
                        <button
                            onClick={() => {
                                setIsTimerActive(false);
                                onClose();
                            }}
                            className="flex-1 py-2.5 sm:py-3 px-4 border-2 border-gray-200 
                                    text-sm sm:text-base text-gray-700 rounded-xl 
                                    hover:bg-gray-50 transition-colors duration-200"
                        >
                            취소
                        </button>
                        <button
                            onClick={step === 1 ? requestVerificationCode : verifyCode}
                            disabled={step === 1 
                                ? phoneNumber.length !== 11 
                                : (verificationCode.length !== 6 || timeLeft === 0)}
                            className="flex-1 py-2.5 sm:py-3 px-4 text-sm sm:text-base 
                                    bg-blue-500 text-white rounded-xl 
                                    hover:bg-blue-600 transition-colors duration-200 
                                    disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            {step === 1 ? '인증번호 받기' : '확인'}
                        </button>
                    </div>
                </div>
            </div>
            <ErrorModal
                message={errorMessage}
                isOpen={isErrorModalOpen}
                onClose={() => setErrorModalOpen(false)}
            />
        </div>
    );
}

export default VerificationModal;