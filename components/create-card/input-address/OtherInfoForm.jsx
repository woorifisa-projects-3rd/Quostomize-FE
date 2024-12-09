'use client';

import React from 'react';
import { BsInfoCircle } from 'react-icons/bs';
import { IoWarningOutline } from 'react-icons/io5';

const OtherInfoForm = ({ formData, handleInputChange, validateField, errors }) => {
    return (
        <>
            {/* 전화번호 */}
            <div className="relative">
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-3">
                    전화번호
                </label>
                <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, '');
                        if (value.length <= 11) {
                            handleInputChange({ target: { name: 'phoneNumber', value } });
                            validateField('phoneNumber', value);
                        }
                    }}
                    className={`w-full p-3 sm:p-3 text-sm sm:text-base border-2 rounded-xl sm:rounded-xl transition-all duration-300 outline-none ${
                        errors.phoneNumber ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white'
                    }`}
                    placeholder="'-'없이 입력해주세요"
                />
                {errors.phoneNumber && (
                    <div className="flex items-center mt-2 text-red-500">
                        <IoWarningOutline className="mr-2 text-lg" />
                        <p className="text-sm">{errors.phoneNumber}</p>
                    </div>
                )}
            </div>

            {/* 결제 내역 수신 수단 */}
            <div className="relative">
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-3 relative group">
                    결제 내역 수신 수단
                    <BsInfoCircle
                        className="inline-block ml-1 text-gray-400 text-sm cursor-pointer group-hover:text-blue-500"
                    />
                    <div
                        className="absolute bottom-full mb-2 left-0 bg-white p-2 shadow-lg rounded-md hidden group-hover:block">
                        <p className="text-xs text-gray-600">결제 내역은 이메일, 문자, 우편 셋 중 하나로 전송 됩니다.</p>
                    </div>
                </label>
                <select
                    name="paymentHistoryReceiveMethod"
                    value={formData.paymentHistoryReceiveMethod}
                    onChange={handleInputChange}
                    className={`w-full p-3 sm:p-3 text-sm sm:text-base border-2 rounded-xl sm:rounded-xl transition-all duration-300 outline-none ${
                        errors.paymentHistoryReceiveMethod ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white'
                    }`}
                >
                    <option value="" disabled>
                        선택해주세요
                    </option>
                    <option value="이메일">이메일</option>
                    <option value="문자">문자</option>
                    <option value="우편">우편</option>
                </select>
            </div>
        </>
    );
};

export default OtherInfoForm;
