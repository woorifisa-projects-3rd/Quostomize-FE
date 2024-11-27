'use client';
import { useState } from 'react';

const CheckInformation = () => {
    const [formData, setFormData] = useState({
        residenceNumber: '',
        residenceNumber2: '',
        name: '',
        englishName: '',
        deliveryFullAddress: '', // 우편번호 + 도로명주소 + 상세주소
        residentialFullAddress: '', // 우편번호 + 도로명주소 + 상세주소
        email: '', // emailId + @ + emailDomain
        phoneNumber: '',
        paymentHistoryReceiveMethod: '',
        isOverseasPaymentBlocked: true,
        isTransportationEnabled: true
    });

    return (
        <div className="w-full max-w-2xl mx-auto px-5 py-10">
            <div className="mb-10 pl-5">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-gray-900">
                        입력하신 정보들을
                    </h1>
                    <h2 className="text-3xl font-bold text-gray-900">
                        확인해주세요!
                    </h2>
                </div>
            </div>

            {/* 정보 확인 박스 */}
            <div className="bg-white shadow-md rounded-xl p-8 space-y-6">
                <div className="relative">
                    {/* 해외원화결제차단신청 */}
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-base font-medium text-gray-700">
                            해외원화결제차단신청
                        </span>
                        <div className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${formData.isOverseasPaymentBlocked ? 'bg-blue-500' : 'bg-gray-200'}`}>
                            <div className={`absolute w-6 h-6 bg-white rounded-full shadow transition-transform duration-300 ${formData.isOverseasPaymentBlocked ? 'translate-x-5' : 'translate-x-0'}`} />
                            <input type="checkbox" className="opacity-0 w-0 h-0" checked={formData.isOverseasPaymentBlocked} readOnly />
                        </div>
                    </div>

                    {/* 후불교통 기능 신청 */}
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-base font-medium text-gray-700">
                            후불교통 기능 신청
                        </span>
                        <div className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${formData.isTransportationEnabled ? 'bg-blue-500' : 'bg-gray-200'}`}>
                            <div className={`absolute w-6 h-6 bg-white rounded-full shadow transition-transform duration-300 ${formData.isTransportationEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                            <input type="checkbox" className="opacity-0 w-0 h-0" checked={formData.isTransportationEnabled} readOnly />
                        </div>
                    </div>

                    {/* 주민등록번호 */}
                    <div className="mb-4">
                        <span className="block text-sm text-gray-600 mb-1">주민등록번호</span>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                className="w-1/2 p-3 border-2 rounded-xl bg-gray-50"
                                value={formData.residenceNumber}
                                disabled
                            />
                            <input
                                type="text"
                                className="w-1/2 p-3 border-2 rounded-xl bg-gray-50"
                                value={`${formData.residenceNumber2?.charAt(0)}******`}
                                disabled
                            />
                        </div>
                    </div>

                    {/* 기타 정보들 */}
                    {[
                        { label: "배송 받을 주소", value: formData.deliveryFullAddress },
                        { label: "자택주소", value: formData.residentialFullAddress },
                        { label: "이메일", value: formData.email },
                        { label: "전화번호", value: formData.phoneNumber },
                        { label: "결제 내역 수신 수단", value: formData.paymentHistoryReceiveMethod }
                    ].map((item, index) => (
                        <div key={index} className="mb-4">
                            <span className="block text-sm text-gray-600 mb-1">
                                {item.label}
                            </span>
                            <input
                                type="text"
                                className="w-full p-3 border-2 rounded-xl bg-gray-50"
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