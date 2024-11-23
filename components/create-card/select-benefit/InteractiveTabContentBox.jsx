'use client'

import React, { useState } from 'react';
import { useBenefitContext } from './BenefitContext';
import Icons from '../../../public/icons/icons';

const InteractiveTabContentBox = () => {
    const { updateCategory, updateOption } = useBenefitContext();
    const [activeTab, setActiveTab] = useState(0);

    const categories = ['쇼핑', '생활', '푸드', '여행', '문화'];
    const options = [
        [
            { text: '백화점(더현대, 신세계, 롯데백화점)', icon: Icons.departmentstore },
            { text: '온라인쇼핑(무신사, 에이블리, 쿠팡)', icon: Icons.online },
            { text: '마트(이마트, 홈플러스)', icon: Icons.mart }
        ],
        [
            { text: '주유소(SK, GS칼텍스)', icon: Icons.oil },
            { text: '통신(SKT, KT, LGU+)', icon: Icons.telephone },
            { text: '대중교통(버스, 지하철, 택시)', icon: Icons.transportation }
        ],
        [
            { text: '편의점(CU, GS25)', icon: Icons.conveniencestore },
            { text: '카페(스타벅스, 투썸플레이스)', icon: Icons.cafe },
            { text: '배달(배달의민족, 쿠팡이츠)', icon: Icons.delivery }
        ],
        [
            { text: '항공(인터파크 투어, 네이버 항공)', icon: Icons.airplane },
            { text: '렌트(쏘카, 그린카)', icon: Icons.rent },
            { text: '숙소(야놀자, 여기어때)', icon: Icons.hotel }
        ],
        [
            { text: 'OTT(넷플릭스, 티빙)', icon: Icons.ott },
            { text: '영화(CGV, 롯데시네마)', icon: Icons.movie },
            { text: '도서(교보문고, 밀리의서재)', icon: Icons.books }
        ]
    ];

    const handleTabClick = (index) => {
        setActiveTab(index);
        updateCategory(index, 4);
    };

    const handleOptionSelect = (option) => {
        updateCategory(activeTab, 5);
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
                    {options[activeTab].map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleOptionSelect(option)}
                            className="flex w-full p-4 text-left rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <img
                                src={option.icon}
                                alt={option.text}
                                className="w-12 h-12 mr-4 object-cover rounded"
                            />
                            <span className="text-gray-700">{option.text}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InteractiveTabContentBox;
