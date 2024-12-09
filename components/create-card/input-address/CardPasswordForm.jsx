'use client';

import React from 'react';

const CardPasswordForm = ({ formData, setPasswordModalOpen, setConfirmPasswordModalOpen, errors }) => {
    return (
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 sm:py-8 mb-8">
            <div className="border-b border-gray-400 pb-3 sm:pb-4 mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                    카드결제비밀번호
                </h3>
            </div>
            <div className="space-y-6">
                <>
                    {/* 카드 결제 비밀번호 */}
                    <div className="relative">
                        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-3">
                            카드 결제 비밀번호
                        </label>
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
                    <div className="relative">
                        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-3">
                            카드 결제 비밀번호 확인
                        </label>
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
                </>
            </div>
        </div>

            );
            };

            export default CardPasswordForm;
