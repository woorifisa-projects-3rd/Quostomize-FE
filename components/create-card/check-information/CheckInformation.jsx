'use client';
import React, { useState } from 'react';

const CheckInformation = ({
                              residenceNumber,
                              residenceNumber2,
                              deliveryFullAddress,
                              residentialFullAddress,
                              email,
                              phoneNumber,
                              paymentHistoryReceiveMethod,
                              isOverseasPaymentBlocked,
                              isTransportationEnabled,
                          }) => {
    return (
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* 상단 제목 영역 */}
            <div className="mb-6 sm:mb-10 pl-2 sm:pl-5">
                <div className="space-y-1 sm:space-y-2">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-700">
                        입력하신 정보들을
                    </h1>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-700">
                        확인해주세요!
                    </h2>
                </div>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 sm:py-8">
                <div className="relative space-y-6">
                    {/* 해외원화결제차단신청 */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm md:text-base font-medium text-gray-700">
                            해외원화결제차단신청
                        </span>
                        <div className="flex items-center">
                            {isOverseasPaymentBlocked ? (
                                <div className="flex items-center space-x-1 px-3 py-1.5 bg-blue-100 text-blue-600 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-sm font-medium">선택완료</span>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-1 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full">
                                    <span className="text-sm font-medium">미선택</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 후불교통 기능 신청 */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm md:text-base font-medium text-gray-700">
                            후불교통 기능 신청
                        </span>
                        <div className="flex items-center">
                            {isTransportationEnabled ? (
                                <div className="flex items-center space-x-1 px-3 py-1.5 bg-blue-100 text-blue-600 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-sm font-medium">선택완료</span>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-1 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full">
                                    <span className="text-sm font-medium">미선택</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 주민등록번호 */}
                    <div className="space-y-6 sm:space-y-8">
                        <div className="relative">
                            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-3">
                                주민등록번호
                            </label>
                            <div className="flex items-center space-x-2 sm:space-x-4">
                                <input
                                    type="text"
                                    className="w-full p-3 sm:p-3 text-sm sm:text-base border-2 rounded-xl sm:rounded-xl focus:outline-none"
                                    value={residenceNumber}
                                    disabled
                                />
                                <input
                                    type="text"
                                    className="w-full p-3 sm:p-3 text-sm sm:text-base border-2 rounded-xl sm:rounded-xl focus:outline-none"
                                    value={`${residenceNumber2?.charAt(0)}******`}
                                    disabled
                                />
                            </div>
                        </div>

                        {/* 기타 정보들 */}
                        {[
                            {label: "배송 받을 주소", value: deliveryFullAddress},
                            {label: "자택주소", value: residentialFullAddress},
                            {label: "이메일", value: email},
                            {label: "전화번호", value: phoneNumber},
                            {label: "결제 내역 수신 수단", value: paymentHistoryReceiveMethod}
                        ].map((item, index) => (
                            <div key={index} className="space-y-2">
                            <span className="block text-sm font-medium text-gray-700">
                                {item.label}
                            </span>
                                <input
                                    type="text"
                                    className="w-full p-3 sm:p-3 text-sm sm:text-base border-2 rounded-xl sm:rounded-xl focus:outline-none"
                                    value={item.value}
                                    disabled
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CheckInformation;