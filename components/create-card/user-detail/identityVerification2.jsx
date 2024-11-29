'use client';

import React, { useState, useEffect } from 'react';

function VerificationModal({ isOpen, onClose }) {
    const [step, setStep] = useState(1);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [timeLeft, setTimeLeft] = useState(180); // 3분 = 180초
    const [isTimerActive, setIsTimerActive] = useState(false);

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

    const handleVerificationCodeChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        if (value.length <= 6) {
            setVerificationCode(value);
        }
    };

    const requestVerification = () => {
        if (phoneNumber.length === 11) {
            setStep(2);
            setTimeLeft(180);
            setIsTimerActive(true);
        }
    };

    const verifyCode = () => {
        if (verificationCode.length === 6 && timeLeft > 0) {
            onClose(true);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4">
                <div className="border-b border-gray-200 pb-4 mb-6">
                    <h3 className="text-xl font-bold text-gray-800">
                        {step === 1 ? '휴대폰 본인인증' : '인증번호 입력'}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                        {step === 1 
                            ? '휴대폰 번호를 입력해주세요.' 
                            : '수신하신 인증번호 6자리를 입력해주세요.'}
                    </p>
                </div>

                <div className="space-y-6">
                    {step === 1 ? (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                휴대폰 번호
                            </label>
                            <input
                                type="tel"
                                value={phoneNumber}
                                onChange={handlePhoneNumberChange}
                                className="w-full p-4 border-2 rounded-xl bg-gray-50 focus:bg-white 
                                          focus:border-blue-500 outline-none transition-all duration-300"
                                placeholder="'-' 없이 입력해주세요"
                                maxLength={11}
                            />
                            {phoneNumber && phoneNumber.length !== 11 && (
                                <p className="text-red-500 text-sm mt-2">
                                    휴대폰 번호 11자리를 입력해주세요.
                                </p>
                            )}
                        </div>
                    ) : (
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-base font-medium text-gray-700">
                                    인증번호
                                </label>
                                <span className={`text-base font-medium ${
                                    timeLeft < 60 ? 'text-red-500' : 'text-blue-500'
                                }`}>
                                    {formatTime(timeLeft)}
                                </span>
                            </div>
                            <input
                                type="text"
                                value={verificationCode}
                                onChange={handleVerificationCodeChange}
                                className="w-full p-4 border-2 rounded-xl bg-gray-50 focus:bg-white 
                                          focus:border-blue-500 outline-none transition-all duration-300"
                                placeholder="인증번호 6자리 입력"
                                maxLength={6}
                                disabled={timeLeft === 0}
                            />
                            {timeLeft === 0 ? (
                                <p className="text-red-500 text-sm mt-2">
                                    인증 시간이 만료되었습니다. 다시 시도해주세요.
                                </p>
                            ) : verificationCode && verificationCode.length !== 6 && (
                                <p className="text-red-500 text-sm mt-2">
                                    인증번호 6자리를 입력해주세요.
                                </p>
                            )}
                        </div>
                    )}

                    <div className="flex space-x-3 mt-6">
                        <button
                            onClick={() => {
                                setIsTimerActive(false);
                                onClose();
                            }}
                            className="flex-1 py-3 px-4 border-2 border-gray-200 text-gray-700 
                                      rounded-xl hover:bg-gray-50 transition-colors duration-200"
                        >
                            취소
                        </button>
                        <button
                            onClick={step === 1 ? requestVerification : verifyCode}
                            disabled={
                                step === 1 
                                    ? phoneNumber.length !== 11 
                                    : (verificationCode.length !== 6 || timeLeft === 0)
                            }
                            className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-xl 
                                      hover:bg-blue-700 transition-colors duration-200
                                      disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            {step === 1 ? '인증번호 받기' : '확인'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VerificationModal;