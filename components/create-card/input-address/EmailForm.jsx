'use client';

import React from 'react';

const EmailForm = ({ formData, handleInputChange, handleBlur, errors }) => {
    return (
        <div className="relative">
            <label className="block text-base font-medium text-gray-700 mb-3">이메일</label>
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    name="emailId"
                    value={formData.emailId}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('emailId')}
                    className={`w-[30%] p-3 border-2 rounded-xl transition-all duration-300 outline-none ${
                        errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white'
                    }`}
                    placeholder="예: quostomize"
                />
                <span className="text-gray-400 text-xl font-light">@</span>
                <input
                    type="text"
                    name="emailDomain"
                    value={formData.emailDomain}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('emailDomain')}
                    className={`w-[30%] p-3 border-2 rounded-xl transition-all duration-300 outline-none ${
                        errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white'
                    }`}
                    placeholder="직접입력"
                />
                <select
                    name="emailDomain"
                    value={formData.emailDomain}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('emailDomain')}
                    className={`w-[30%] p-3 border-2 rounded-xl transition-all duration-300 outline-none ${
                        errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white'
                    }`}
                >
                    <option value="">직접입력</option>
                    <option value="naver.com">naver.com</option>
                    <option value="gmail.com">gmail.com</option>
                    <option value="daum.net">daum.net</option>
                    <option value="hanmail.net">hanmail.net</option>
                    <option value="nate.com">nate.com</option>
                </select>
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
        </div>
    );
};

export default EmailForm;
