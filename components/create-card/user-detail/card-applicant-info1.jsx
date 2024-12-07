'use client';

import React, { useState } from 'react';
import { IoWarningOutline } from 'react-icons/io5';

function CardApplicantInfo1({ applicantInfo, setApplicantInfo }) {

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    // 주민번호 첫 번째 부분 입력 처리
    const handleResidenceNumber1Change = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        if (value.length <= 6) {
            setApplicantInfo({
                ...applicantInfo,
                residenceNumber: value,
            });
            validateField('residenceNumber', value);
        }
    };

    // 주민번호 두 번째 부분 입력 처리
    const handleResidenceNumber2Change = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        if (value.length <= 7) {
            setApplicantInfo({
                ...applicantInfo,
                residenceNumber2: value,
            });
            validateField('residenceNumber2', value);
        }
    };

    // 영문 이름 입력 처리
    const handleEnglishNameChange = (e) => {
        const value = e.target.value.replace(/[^A-Za-z\s]/g, '').toUpperCase();
        setApplicantInfo({
            ...applicantInfo,
            englishName: value,
        });
        validateField('englishName', value);
    };

    // 필드별 유효성 검사
    const validateField = (field, value) => {
        const newErrors = { ...errors };

        switch (field) {
            case 'residenceNumber':
                if (value.length !== 6) {
                    newErrors[field] =
                        '주민등록번호 앞자리 6자리를 입력해주세요.';
                } else {
                    delete newErrors[field];
                }
                break;
            case 'residenceNumber2':
                if (value.length !== 7) {
                    newErrors[field] =
                        '주민등록번호 뒷자리 7자리를 입력해주세요.';
                } else {
                    delete newErrors[field];
                }
                break;
            case 'name':
                if (!value.trim()) {
                    newErrors[field] = '이름을 입력해주세요.';
                } else {
                    delete newErrors[field];
                }
                break;
            case 'englishName':
                if (!value.trim()) {
                    newErrors[field] = '영문 이름을 입력해주세요.';
                } else {
                    delete newErrors[field];
                }
                break;
        }

        setErrors(newErrors);
    };

    const handleBlur = (field) => {
        setTouched({ ...touched, [field]: true });
        validateField(field, applicantInfo[field]);
    };

    const handleSubmit = () => {
        // 모든 필드 검증
        const allFields = [
            'residenceNumber',
            'residenceNumber2',
            'name',
            'englishName',
        ];
        let isValid = true;

        allFields.forEach((field) => {
            validateField(field, applicantInfo[field]);
            if (!applicantInfo[field]) isValid = false;
        });

        return isValid;
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* 상단 제목 영역 */}
            <div className="mb-6 sm:mb-10 pl-2 sm:pl-5">
                <div className="space-y-1 sm:space-y-2">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-700">
                        신청하시는 분의
                    </h1>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-700">
                        정보를 입력해주세요!
                    </h2>
                </div>
            </div>

            {/* 입력 폼 영역 */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 sm:py-8">
                <div className="border-b border-gray-400 pb-3 sm:pb-4 mb-6 sm:mb-8">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                        신청인 정보
                    </h3>
                </div>

                {/* 주민등록번호 입력 */}
                <div className="space-y-6 sm:space-y-8">
                    <div className="relative">
                        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-3">
                            주민등록번호
                        </label>
                        <div className="flex items-center space-x-2 sm:space-x-4">
                            <input
                                type="text"
                                value={applicantInfo.residenceNumber}
                                onChange={handleResidenceNumber1Change}
                                onBlur={() => handleBlur('residenceNumber')}
                                className={`w-full sm:w-40 p-3 sm:p-3 text-sm sm:text-base border-2 rounded-xl sm:rounded-xl focus:outline-none
																	${
                                                                        touched.residenceNumber &&
                                                                        errors.residenceNumber
                                                                            ? 'border-red-500 bg-red-50'
                                                                            : 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white'
                                                                    }`}
                                placeholder="입력해주세요"
                                maxLength={6}
                            />
                            <span className="text-gray-400 text-xl font-light">
                                -
                            </span>
                            <input
                                type="password"
                                value={applicantInfo.residenceNumber2}
                                onChange={handleResidenceNumber2Change}
                                onBlur={() => handleBlur('residenceNumber2')}
                                className={`w-full sm:w-40 p-3 sm:p-3 text-sm sm:text-base border-2 rounded-xl sm:rounded-xl focus:outline-none
																	${
                                                                        touched.residenceNumber2 &&
                                                                        errors.residenceNumber2
                                                                            ? 'border-red-500 bg-red-50'
                                                                            : 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white'
                                                                            
                                                                    }`}
                                placeholder="*******"
                                maxLength={7}
                            />
                        </div>
                        {touched.residenceNumber && errors.residenceNumber && (
                            <div className="flex items-center mt-2 ml-2 text-red-500">
                                <IoWarningOutline className="mr-1 text-base" />
                                <p className="text-sm">
                                    {errors.residenceNumber}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* 이름 입력 */}
                    <div className="relative">
                        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-3">
                            이름
                        </label>
                        <input
                            type="text"
                            value={applicantInfo.name}
                            onChange={(e) => {
                                setApplicantInfo({
                                    ...applicantInfo,
                                    name: e.target.value,
                                });
                                validateField('name', e.target.value);
                            }}
                            onBlur={() => handleBlur('name')}
                            className={`w-full p-3 sm:p-3 text-sm sm:text-base border-2 rounded-xl sm:rounded-xl transition-all duration-300 outline-none 
															${
                                                                touched.name &&
                                                                errors.name
                                                                    ? 'border-red-500 bg-red-50'
                                                                    : 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white'
                                                            }`}
                            placeholder="이름을 입력해주세요"
                        />
                        {touched.name && errors.name && (
                            <div className="flex items-center mt-2 ml-2 text-red-500">
                                <IoWarningOutline className="mr-1 text-base" />
                                <p className="text-sm">{errors.name}</p>
                            </div>
                        )}
                    </div>

                    {/* 영문 이름 입력 */}
                    <div className="relative">
                        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-3">
                            영문 이름
                        </label>
                        <input
                            type="text"
                            value={applicantInfo.englishName}
                            onChange={handleEnglishNameChange}
                            onBlur={() => handleBlur('englishName')}
                            className={`w-full p-3 sm:p-3 text-sm sm:text-base border-2 rounded-xl sm:rounded-xl transition-all duration-300 outline-none ${
                                touched.englishName && errors.englishName
                                    ? 'border-red-500 bg-red-50'
                                    : 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white'
                            }`}
                            placeholder="영문 이름을 입력해주세요"
                        />
                        {touched.englishName && errors.englishName && (
                            <div className="flex items-center mt-2 ml-2 text-red-500">
                                <IoWarningOutline className="mr-1 text-base" />
                                <p className="text-sm">{errors.englishName}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardApplicantInfo1;
