'use client';

import React from 'react';

const EmailForm = ({ formData, handleInputChange, handleBlur, errors }) => {
    return (
        <div className="relative">
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-3">
                이메일
            </label>
            <div className="flex items-center space-x-2 sm:space-x-4">
                <input
                    type="text"
                    name="emailId"
                    value={formData.emailId}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('emailId')}
                    className={`min-w-0 w-full sm:w-40 p-3 sm:p-3 text-sm sm:text-base border-2 rounded-xl sm:rounded-xl focus:outline-none text-ellipsis ${
                        errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white'
                    }`}
                    placeholder="예: quostomize"
                    style={{ textOverflow: 'ellipsis' }}
                />
                <span className="text-gray-400 text-xl font-light flex-shrink-0">@</span>
                <input
                    type="text"
                    name="emailDomain"
                    value={formData.emailDomain}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('emailDomain')}
                    className={`min-w-0 w-full sm:w-40 p-3 sm:p-3 text-sm sm:text-base border-2 rounded-xl sm:rounded-xl focus:outline-none text-ellipsis ${
                        errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white'
                    }`}
                    placeholder="직접입력"
                    style={{ textOverflow: 'ellipsis' }}
                />
                <select
                    name="emailDomain"
                    value={formData.emailDomain}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('emailDomain')}
                    className={`min-w-0 w-full sm:w-40 p-3 sm:p-3 text-sm sm:text-base border-2 rounded-xl sm:rounded-xl focus:outline-none ${
                        errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white'
                    }`}
                    style={{ textOverflow: 'ellipsis' }}
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