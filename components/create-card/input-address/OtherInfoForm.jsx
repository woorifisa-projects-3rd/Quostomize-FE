'use client';

import React from 'react';
import { BsInfoCircle } from 'react-icons/bs';
import { IoWarningOutline } from 'react-icons/io5';

const OtherInfoForm = ({ formData, handleInputChange, validateField, errors }) => {
    return (
        <>
            {/* 전화번호 */}
            <div className="relative">
                <label className="block text-base font-medium text-gray-700 mb-3">전화번호</label>
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
                    className={`w-full p-3 border-2 rounded-xl transition-all duration-300 outline-none ${
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
                <label className="block text-base font-medium text-gray-700 mb-3">
                    결제 내역 수신 수단 <BsInfoCircle className="inline-block ml-1 text-gray-400 text-sm" />
                </label>
                <select
                    name="paymentHistoryReceiveMethod"
                    value={formData.paymentHistoryReceiveMethod}
                    onChange={handleInputChange}
                    className={`w-full p-3 border-2 rounded-xl transition-all duration-300 outline-none ${
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
