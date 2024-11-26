'use client'

import React, { useState } from 'react'
import { BsInfoCircle } from "react-icons/bs"

function SelectCardForm() {
    const [cardOptions, setCardOptions] = useState({
        cardBrand: 'VISA',
        isAppCard: null,
        isForeignBlocked: false,
        isPostpaidTransport: false
    });
    const [showEcoAlert, setShowEcoAlert] = useState(false);

    const handleAppCardSelect = (isApp) => {
        setCardOptions({...cardOptions, isAppCard: isApp});
        if (isApp) {
            setShowEcoAlert(true);
            setTimeout(() => setShowEcoAlert(false), 4000);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto px-6 py-8">
            <div className="space-y-8">
                {/* 카드 브랜드 선택 */}
                <div>
                    <div className="flex items-center mb-2">
                        <span className="text-sm">카드 브랜드</span>
                        <BsInfoCircle className="ml-1 text-gray-400 text-sm" />
                    </div>
                    <select 
                        className="w-full p-3 border rounded-lg bg-white text-base hover:border-blue-500 transition-colors duration-300"
                        value={cardOptions.cardBrand}
                        onChange={(e) => setCardOptions({...cardOptions, cardBrand: e.target.value})}
                    >
                        <option value="VISA">VISA(국내외겸용)</option>
                    </select>
                </div>

                {/* 앱카드 발급 여부 */}
                <div>
                    <div className="flex items-center mb-2">
                        <span className="text-sm">앱카드 발급 여부</span>
                        <BsInfoCircle className="ml-1 text-gray-400 text-sm" />
                    </div>
                    <div className="flex gap-8">
                        <button
                            onClick={() => handleAppCardSelect(true)}
                            className={`flex-1 py-3 rounded-lg text-base font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                                cardOptions.isAppCard === true 
                                ? 'bg-blue-500 text-white hover:bg-blue-600' 
                                : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                            }`}
                        >
                            앱카드 신청
                        </button>
                        <button
                            onClick={() => handleAppCardSelect(false)}
                            className={`flex-1 py-3 rounded-lg text-base font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                                cardOptions.isAppCard === false 
                                ? 'bg-blue-500 text-white hover:bg-blue-600' 
                                : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                            }`}
                        >
                            실물카드만
                        </button>
                    </div>
                </div>

                {/* 부가서비스 선택 */}
                <div>
                    <div className="flex items-center mb-4">
                        <span className="text-sm">부가서비스 이용 여부</span>
                        <BsInfoCircle className="ml-1 text-gray-400 text-sm" />
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between py-2 group">
                            <span className="text-base group-hover:text-blue-500 transition-colors duration-300">해외원화 결제차단 신청</span>
                            <button 
                                onClick={() => setCardOptions({
                                    ...cardOptions, 
                                    isForeignBlocked: !cardOptions.isForeignBlocked
                                })}
                                className="relative w-12 h-7 rounded-full transition-all duration-300 hover:shadow-md"
                                style={{ backgroundColor: cardOptions.isForeignBlocked ? '#2563eb' : '#e5e7eb' }}
                            >
                                <span 
                                    className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-all duration-300 ${
                                        cardOptions.isForeignBlocked ? 'translate-x-5' : 'translate-x-0'
                                    }`}
                                />
                            </button>
                        </div>
                        <div className="flex items-center justify-between py-2 group">
                            <span className="text-base group-hover:text-blue-500 transition-colors duration-300">후불교통 기능 신청</span>
                            <button 
                                onClick={() => setCardOptions({
                                    ...cardOptions, 
                                    isPostpaidTransport: !cardOptions.isPostpaidTransport
                                })}
                                className="relative w-12 h-7 rounded-full transition-all duration-300 hover:shadow-md"
                                style={{ backgroundColor: cardOptions.isPostpaidTransport ? '#2563eb' : '#e5e7eb' }}
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
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-50 rounded-lg shadow-lg p-6 z-50">
                    <div className="flex flex-col items-center">
                        <span className="text-4xl mb-3"><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Hatching%20Chick.png" alt="Hatching Chick" width="100" height="100" /></span>
                        <p className="text-lg font-medium text-yellow-500">당신은 환경을 지켰어요!</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SelectCardForm