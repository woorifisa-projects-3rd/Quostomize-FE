'use client';
import { useState } from 'react';

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
        <div className="w-full max-w-3xl mx-auto px-6">
            <div className="mb-8">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                        입력하신 정보들을
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                        확인해주세요!
                    </h2>
                </div>
            </div>

            <div className="bg-white shadow-md rounded-xl p-4 md:p-8 space-y-6">
                <div className="relative space-y-6">
                    {/* 해외원화결제차단신청 */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm md:text-base font-medium text-gray-700">
                            해외원화결제차단신청
                        </span>
                        <div className={`relative w-12 h-7 rounded-full transition-colors duration-300 ${isOverseasPaymentBlocked ? 'bg-blue-500' : 'bg-gray-200'}`}>
                            <div className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${isOverseasPaymentBlocked ? 'translate-x-5' : 'translate-x-0'}`} />
                            <input type="checkbox" className="opacity-0 w-0 h-0" checked={isOverseasPaymentBlocked} readOnly />
                        </div>
                    </div>

                    {/* 후불교통 기능 신청 */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm md:text-base font-medium text-gray-700">
                            후불교통 기능 신청
                        </span>
                        <div className={`relative w-12 h-7 rounded-full transition-colors duration-300 ${isTransportationEnabled ? 'bg-blue-500' : 'bg-gray-200'}`}>
                            <div className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${isTransportationEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                            <input type="checkbox" className="opacity-0 w-0 h-0" checked={isTransportationEnabled} readOnly />
                        </div>
                    </div>

                    {/* 주민등록번호 */}
                    <div className="space-y-2">
                        <span className="block text-sm font-medium text-gray-700">주민등록번호</span>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                className="flex-1 p-2 md:p-3 border-2 rounded-xl bg-gray-50"
                                value={residenceNumber}
                                disabled
                            />
                            <input
                                type="text"
                                className="flex-1 p-2 md:p-3 border-2 rounded-xl bg-gray-50"
                                value={`${residenceNumber2?.charAt(0)}******`}
                                disabled
                            />
                        </div>
                    </div>

                    {/* 기타 정보들 */}
                    {[
                        { label: "배송 받을 주소", value: deliveryFullAddress },
                        { label: "자택주소", value: residentialFullAddress },
                        { label: "이메일", value: email },
                        { label: "전화번호", value: phoneNumber },
                        { label: "결제 내역 수신 수단", value: paymentHistoryReceiveMethod }
                    ].map((item, index) => (
                        <div key={index} className="space-y-2">
                            <span className="block text-sm font-medium text-gray-700">
                                {item.label}
                            </span>
                            <input
                                type="text"
                                className="w-full p-2 md:p-3 border-2 rounded-xl bg-gray-50"
                                value={item.value}
                                disabled
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CheckInformation;