'use client';

import React, {useEffect, useState} from 'react';
import AddressForm from './AddressForm';
import EmailForm from './EmailForm';
import OtherInfoForm from './OtherInfoForm';
import CardPasswordForm from './CardPasswordForm';
import PasswordInput from './PasswordInput';

const SelectOtherInfo = ({formData, setFormData}) => {
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
    const [isConfirmPasswordModalOpen, setConfirmPasswordModalOpen] = useState(false);


    const validateField = (field, value) => {
        const newErrors = { ...errors };

        switch (field) {
            case 'emailId':
            case 'emailDomain':
                if (!formData.emailId || !formData.emailDomain) {
                    newErrors.email = '이메일 주소를 모두 입력해주세요.';
                } else {
                    delete newErrors.email;
                }
                break;
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
        setFormData((prev) => ({ ...prev, [name]: value }));
        validateField(name, value);
    };

    const handleBlur = (field) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
        validateField(field, formData[field]);
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
        setTimeout(() => setConfirmPasswordModalOpen(true), 300);
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
        <div className="w-full max-w-2xl mx-auto px-5 py-10">
            <div className="mb-10 pl-5">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-gray-900">카드 사용을 위해</h1>
                    <h2 className="text-3xl font-bold text-gray-900">나머지 정보를 입력해주세요!</h2>
                </div>
            </div>

            <div className="bg-white shadow-md rounded-xl p-8 space-y-6">
                <h3 className="text-xl font-semibold text-gray-800">주소</h3>
                <AddressForm
                    type="delivery"
                    formData={formData}
                    setFormData={setFormData}
                    handleInputChange={handleInputChange}
                    handleBlur={handleBlur}
                    // handleSearchAddress={handleSearchAddress}
                    errors={errors}
                />
                <AddressForm
                    type="residential"
                    formData={formData}
                    setFormData={setFormData}
                    handleInputChange={handleInputChange}
                    handleBlur={handleBlur}
                    // handleSearchAddress={handleSearchAddress}
                    errors={errors}
                    isSameAsDeliveryAddress={formData.isSameAsDeliveryAddress}
                    handleCheckSameAddress={handleCheckSameAddress}
                />
            </div>

            <div className="bg-white shadow-md rounded-xl p-8 space-y-6 mt-10">
                <h3 className="text-xl font-semibold text-gray-800">기타정보</h3>
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
