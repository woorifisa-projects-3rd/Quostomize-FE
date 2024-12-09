"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { BsInfoCircle } from 'react-icons/bs';

function SelectCardForm({ cardOptions, setCardOptions }) {
    const [showEcoAlert, setShowEcoAlert] = useState(false);
    const [ecoAlertTimeout, setEcoAlertTimeout] = useState(null);

    // Set default values for cardOptions
    React.useEffect(() => {
        setCardOptions({
            ...cardOptions,
            isForeignBlocked: true,
            isPostpaidTransport: true,
        });
    }, []); // Empty dependency array ensures this runs only on mount

    const handleAppCardSelect = (isApp) => {
        setCardOptions({ ...cardOptions, isAppCard: isApp });

        if (isApp) {
            if (ecoAlertTimeout) clearTimeout(ecoAlertTimeout);
            setShowEcoAlert(true);
            const timeout = setTimeout(() => setShowEcoAlert(false), 1500);
            setEcoAlertTimeout(timeout);
        } else {
            setShowEcoAlert(false);
            if (ecoAlertTimeout) clearTimeout(ecoAlertTimeout);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto px-6">
            <div className="space-y-8">
                {/* 카드 브랜드 선택 */}
                <div>
                    <div className="flex items-center mb-3 relative group">
                        <span className="text-sm">카드 브랜드</span>
                        <BsInfoCircle className="ml-1 text-gray-400 text-sm cursor-pointer group-hover:text-blue-500" />
                        <div className="absolute bottom-full mb-2 left-0 bg-white p-2 shadow-lg rounded-md hidden group-hover:block">
                            <p className="text-xs text-gray-600">VISA와 MASTERCARD는 국내외 겸용 카드로, </p>
                            <p className="text-xs text-gray-600">국제 결제 시 편리합니다.</p>
                        </div>
                    </div>
                    <select
                        className="w-full p-3 border rounded-lg bg-white text-base hover:border-blue-500 transition-colors duration-300 focus:outline-none"
                        value={cardOptions.cardBrand}
                        onChange={(e) =>
                            setCardOptions({
                                ...cardOptions,
                                cardBrand: e.target.value,
                            })
                        }
                    >
                        <option value="VISA">VISA(국내외겸용)</option>
                        <option value="MASTERCARD">MASTERCARD(국내외겸용)</option>
                    </select>
                </div>

                {/* 앱카드 발급 여부 */}
                <div>
                    <div className="flex items-center mb-3 relative group">
                        <span className="text-sm">앱카드 발급 여부</span>
                        <BsInfoCircle className="ml-1 text-gray-400 text-sm cursor-pointer group-hover:text-blue-500" />
                        <div className="absolute bottom-full mb-2 left-0 bg-white p-2 shadow-lg rounded-md hidden group-hover:block">
                            <p className="text-xs text-gray-600">앱카드는 실물 카드 없이 휴대폰에서 카드 사용이 가능합니다.</p>
                        </div>
                    </div>
                    <div className="flex gap-5">
                        <button
                            onClick={() => handleAppCardSelect(true)}
                            className={`flex-1 py-2 rounded-lg text-base font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                                cardOptions.isAppCard === true
                                    ? 'bg-blue-400 text-white hover:bg-blue-500'
                                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                            }`}
                        >
                            앱카드 신청
                        </button>
                        <button
                            onClick={() => handleAppCardSelect(false)}
                            className={`flex-1 py-2 rounded-lg text-base font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                                cardOptions.isAppCard === false
                                    ? 'bg-blue-400 text-white hover:bg-blue-500'
                                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                            }`}
                        >
                            실물카드만
                        </button>
                    </div>
                </div>

                {/* 부가서비스 선택 */}
                <div>
                    <div className="flex items-center mb-1 relative group">
                        <span className="text-xs">부가서비스 이용 여부</span>
                        <BsInfoCircle className="ml-1 text-gray-400 text-sm cursor-pointer group-hover:text-blue-500" />
                        <div className="absolute bottom-full mb-2 left-0 bg-white p-2 shadow-lg rounded-md hidden group-hover:block">
                            <p className="text-xs text-gray-600">부가서비스는 해외 결제 차단 및 후불 교통카드 기능을 포함합니다.</p>
                        </div>
                    </div>
                    <div className="space-y-0">
                        <div className="flex items-center justify-between py-2 group">
                            <span className="text-base group-hover:text-blue-500 transition-colors duration-300">
                                해외원화 결제차단 신청
                            </span>
                            <button
                                onClick={() =>
                                    setCardOptions({
                                        ...cardOptions,
                                        isForeignBlocked: !cardOptions.isForeignBlocked,
                                    })
                                }
                                className="relative w-12 h-7 rounded-full transition-all duration-300 hover:shadow-md"
                                style={{
                                    backgroundColor: cardOptions.isForeignBlocked
                                        ? '#2563eb'
                                        : '#e5e7eb',
                                }}
                            >
                                <span
                                    className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-all duration-300 ${
                                        cardOptions.isForeignBlocked ? 'translate-x-5' : 'translate-x-0'
                                    }`}
                                />
                            </button>
                        </div>
                        <div className="flex items-center justify-between py-2 group">
                            <span className="text-base group-hover:text-blue-500 transition-colors duration-300">
                                후불교통 기능 신청
                            </span>
                            <button
                                onClick={() =>
                                    setCardOptions({
                                        ...cardOptions,
                                        isPostpaidTransport: !cardOptions.isPostpaidTransport,
                                    })
                                }
                                className="relative w-12 h-7 rounded-full transition-all duration-300 hover:shadow-md"
                                style={{
                                    backgroundColor: cardOptions.isPostpaidTransport
                                        ? '#2563eb'
                                        : '#e5e7eb',
                                }}
                            >
                                <span
                                    className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-all duration-300 ${
                                        cardOptions.isPostpaidTransport ? 'translate-x-5' : 'translate-x-0'
                                    }`}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 환경 보호 알림창 */}
            {showEcoAlert && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 z-50">
                    <div className="flex flex-col items-center">
                        <Image
                            src="/images/esg.jpg"
                            alt="Hatching Chick"
                            width={120}
                            height={120}
                        />
                        <p className="text-base font-bold text-lime-600 mt-1 whitespace-nowrap">
                            당신은 환경을 지켰어요!
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SelectCardForm;
