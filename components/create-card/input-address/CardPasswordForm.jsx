'use client';

import React from 'react';

const CardPasswordForm = ({ formData, setPasswordModalOpen, setConfirmPasswordModalOpen, errors }) => {
    return (
        <div className="bg-white shadow-md rounded-xl p-8 space-y-6 mt-10">
            <h3 className="text-xl font-semibold text-gray-800">카드 결제 비밀번호</h3>

            {/* 카드 결제 비밀번호 */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">카드 결제 비밀번호</label>
                <input
                    type="password"
                    value={formData.cardPassword ? '****' : ''}
                    onFocus={() => setPasswordModalOpen(true)}
                    readOnly
                    className="w-full p-3 border rounded-lg"
                    placeholder="비밀번호 입력 (4자리)"
                />
            </div>

            {/* 카드 결제 비밀번호 확인 */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">카드 결제 비밀번호 확인</label>
                <input
                    type="password"
                    value={formData.confirmCardPassword ? '****' : ''}
                    onFocus={() => {
                        if (formData.cardPassword) setConfirmPasswordModalOpen(true);
                    }}
                    readOnly
                    className="w-full p-3 border rounded-lg"
                    placeholder="비밀번호 확인 입력"
                />
                {errors.confirmCardPassword && (
                    <p className="text-red-500 text-sm mt-2">{errors.confirmCardPassword}</p>
                )}
            </div>
        </div>
    );
};

export default CardPasswordForm;
