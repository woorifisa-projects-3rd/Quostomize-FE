'use client'

import React, {useState} from 'react';
import { useBenefitContext } from './BenefitContext';

const InteractiveTabContentBox = () => {
    const { updateCategory, updateOption } = useBenefitContext();
    const [activeTab, setActiveTab] = useState(0);

    const categories = ['쇼핑', '생활', '푸드', '여행', '문화'];
    const options = [
        '온라인 쇼핑 5% 추가 적립',
        '생활 서비스 3% 추가 적립',
        '식당 및 카페 4% 추가 적립',
        '여행 상품 5% 추가 적립',
        '문화 시설 3% 추가 적립'
    ];

    const handleTabClick = (index) => {
        setActiveTab(index);
        updateCategory(index, 4); // 탭 선택시 해당 카테고리 값을 4로 설정
    };

    const handleOptionSelect = (option) => {
        updateCategory(activeTab, 5); // 옵션 선택시 해당 카테고리 값을 5로 설정
        updateOption(activeTab, option);
    };

    return (
        <div className="w-full max-w-2xl">
            <div className="px-14 w-full flex justify-between border-b border-gray-200">
                {categories.map((category, index) => (
                    <button
                        key={index}
                        onClick={() => handleTabClick(index)}
                        className={`px-4 py-2 font-bold transition-colors ${activeTab === index
                            ? 'text-blue-600 border-b-2 border-blue-600 bg-gray-50'
                            : 'text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <div className="p-8 bg-white border border-t-0 border-gray-200">
                <div className="space-y-4">
                    {options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleOptionSelect(option)}
                            className="w-full p-4 text-left rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InteractiveTabContentBox;
