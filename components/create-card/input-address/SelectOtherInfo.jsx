'use client';

import React, {useEffect, useState} from 'react';
import AddressForm from './AddressForm';
import EmailForm from './EmailForm';
import OtherInfoForm from './OtherInfoForm';
import CardPasswordForm from './CardPasswordForm';
import PasswordInput from './PasswordInput';

const SelectOtherInfo = ({formData, setFormData, cardOptions}) => {
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
    const [isConfirmPasswordModalOpen, setConfirmPasswordModalOpen] = useState(false);


    const validateField = (field, value) => {
        const newErrors = { ...errors };

        switch (field) {
            case 'email': {
                const email = `${formData.emailId}@${formData.emailDomain}`;
                if (!formData.emailId && !formData.emailDomain) {
                    newErrors[field] = '이메일 주소를 모두 입력해주세요.';
                } else if (!formData.emailId) {
                    newErrors[field] = '이메일 아이디를 입력해주세요.';
                } else if (!formData.emailDomain) {
                    newErrors[field] = '이메일 도메인을 입력해주세요.';
                }else if (!/^[^\s@]+@[^\s@]+\.(com|net)$/.test(email)) {
                    newErrors[field] = '유효한 이메일 주소를 입력해주세요. (예: example@domain.com 또는 example@domain.net)';
                }else {
                    delete newErrors[field];
                }
                break;
            }
            case 'phoneNumber':
                if (!/^\d{11}$/.test(value)) {
                    newErrors[field] = '휴대폰 번호를 입력해 주세요';
                } else {
                    delete newErrors[field];
                }
                break;
            case 'confirmCardPassword':
                if (value !== formData.cardPassword) {
                    newErrors[field] = '비밀번호가 일치하지 않습니다.';
                } else {
                    delete newErrors[field];
                }
                break;
            default:
                if (!value.trim()) {
                    newErrors[field] = '필수 항목을 입력해주세요.';
                } else {
                    delete newErrors[field];
                }
                break;
        }
        setErrors(newErrors);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => {
            const updatedFormData = { ...prev, [name]: value };

            // 입력 즉시 유효성 검사 실행
            if (name === 'emailId' || name === 'emailDomain') {
                const email = `${name === 'emailId' ? value : updatedFormData.emailId}@${name === 'emailDomain' ? value : updatedFormData.emailDomain}`;

                // 이메일 유효성 검사
                if (!updatedFormData.emailId && !updatedFormData.emailDomain) {
                    setErrors(prev => ({ ...prev, email: '이메일 주소를 모두 입력해주세요.' }));
                } else if (!updatedFormData.emailId) {
                    setErrors(prev => ({ ...prev, email: '이메일 아이디를 입력해주세요.' }));
                } else if (!updatedFormData.emailDomain) {
                    setErrors(prev => ({ ...prev, email: '이메일 도메인을 입력해주세요.' }));
                } else if (/^[^\s@]+@[^\s@]+\.(com|net)$/.test(email)) {
                    setErrors(prev => {
                        const newErrors = { ...prev };
                        delete newErrors.email;
                        return newErrors;
                    });
                }
            } else {
                // 다른 필드들의 유효성 검사
                switch (name) {
                    case 'phoneNumber':
                        if (/^\d{11}$/.test(value)) {
                            setErrors(prev => {
                                const newErrors = { ...prev };
                                delete newErrors[name];
                                return newErrors;
                            });
                        }
                        break;
                    case 'confirmCardPassword':
                        if (value === updatedFormData.cardPassword) {
                            setErrors(prev => {
                                const newErrors = { ...prev };
                                delete newErrors[name];
                                return newErrors;
                            });
                        }
                        break;
                    default:
                        if (value.trim()) {
                            setErrors(prev => {
                                const newErrors = { ...prev };
                                delete newErrors[name];
                                return newErrors;
                            });
                        }
                }
            }

            return updatedFormData;
        });
    };


    const handleBlur = (field) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
        if (field === 'emailId' || field === 'emailDomain') {
            validateField('email', `${formData.emailId}@${formData.emailDomain}`);
        } else {
            validateField(field, formData[field]);
        }
    };


    const handleCheckSameAddress = (e) => {
        const isChecked = e.target.checked;
        setFormData((prev) => ({
            ...prev,
            isSameAsDeliveryAddress: isChecked,
            residentialPostalCode: isChecked ? prev.deliveryPostalCode : '',
            residentialAddress: isChecked ? prev.deliveryAddress : '',
            detailedResidentialAddress: isChecked ? prev.detailedDeliveryAddress : '',
        }));
    };

    const handlePasswordComplete = (password) => {
        setFormData((prev) => ({ ...prev, cardPassword: password }));
        setPasswordModalOpen(false);
        setTimeout(() => setConfirmPasswordModalOpen(true));
    };

    const handleConfirmPasswordComplete = (password) => {
        if (password === formData.cardPassword) {
            setFormData((prev) => ({ ...prev, confirmCardPassword: password }));
            setErrors((prev) => ({ ...prev, confirmCardPassword: '' }));
        } else {
            setErrors((prev) => ({
                ...prev,
                confirmCardPassword: '비밀번호가 일치하지 않습니다.',
            }));
        }
        setConfirmPasswordModalOpen(false);
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* 상단 제목 영역 */}
            <div className="mb-6 sm:mb-10 pl-2 sm:pl-5">
                <div className="space-y-1 sm:space-y-2">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-700">
                        카드 사용을 위해
                    </h1>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-700">
                        나머지 정보를 입력해주세요!
                    </h2>
                </div>
            </div>


            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 sm:py-8 mb-8">
                <div className="border-b border-gray-400 pb-3 sm:pb-4 mb-6 sm:mb-8">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                        주소
                    </h3>
                </div>
                <div className="space-y-6 sm:space-y-8">
                    {!cardOptions.isAppCard && (
                        <AddressForm
                            type="delivery"
                            formData={formData}
                            setFormData={setFormData}
                            handleInputChange={handleInputChange}
                            handleBlur={handleBlur}
                            errors={errors}
                            cardOptions={cardOptions}
                        />)}
                    <AddressForm
                        type="residential"
                        formData={formData}
                        setFormData={setFormData}
                        handleInputChange={handleInputChange}
                        handleBlur={handleBlur}
                        errors={errors}
                        isSameAsDeliveryAddress={formData.isSameAsDeliveryAddress}
                        handleCheckSameAddress={handleCheckSameAddress}
                        isApplicant={true}
                        cardOptions={cardOptions}
                    />
                </div>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 sm:py-8 mb-8">
                <div className="border-b border-gray-400 pb-3 sm:pb-4 mb-6 sm:mb-8">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                        기타정보
                    </h3>
                </div>
                <div className="space-y-6">
                    <EmailForm
                        formData={formData}
                        handleInputChange={handleInputChange}
                        validateField={validateField}
                        handleBlur={handleBlur}
                        errors={errors}
                    />
                    <OtherInfoForm
                        formData={formData}
                        handleInputChange={handleInputChange}
                        validateField={validateField}
                        errors={errors}
                    />
                </div>
            </div>

            <CardPasswordForm
                formData={formData}
                setPasswordModalOpen={setPasswordModalOpen}
                setConfirmPasswordModalOpen={setConfirmPasswordModalOpen}
                errors={errors}
            />

            {isPasswordModalOpen && (
                <PasswordInput
                    onClose={() => setPasswordModalOpen(false)}
                    onComplete={handlePasswordComplete}
                    isConfirm={'카드 비밀번호를 눌러주세요'}
                />
            )}

            {isConfirmPasswordModalOpen && (
                <PasswordInput
                    onClose={() => setConfirmPasswordModalOpen(false)}
                    onComplete={handleConfirmPasswordComplete}
                    isConfirm={'카드 비밀번호를 한 번 더 눌러주세요'}
                />
            )}
        </div>
    );
};

export default SelectOtherInfo;
