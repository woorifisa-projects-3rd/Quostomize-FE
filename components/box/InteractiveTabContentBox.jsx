import React, { useState } from 'react';
import { useBenefitContext } from '../create-card/select-benefit/BenefitContext';
import Icons from '../../public/icons/icons';

const InteractiveTabContentBox = () => {
    const { updateCategory, updateOption, categoryValues, selectedOptions } = useBenefitContext();
    const [activeTab, setActiveTab] = useState(null);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(Array(5).fill(null));

    const categories = ['쇼핑', '생활', '푸드', '여행', '문화'];
    const options = [
        [
            '백화점(더현대, 신세계, 롯데백화점)',
            '온라인쇼핑(무신사, 에이블리, 쿠팡)',
            '마트(이마트, 홈플러스)',
        ],
        [
            '주유소(SK, GS칼텍스)',
            '통신(SKT, KT, LGU+)',
            '대중교통(버스, 지하철, 택시)',
        ],
        [
            '편의점(CU, GS25)',
            '카페(스타벅스, 투썸플레이스)',
            '배달(배달의민족, 쿠팡이츠)',
        ],
        [
            '항공(인터파크 투어, 네이버 항공)',
            '렌트(쏘카, 그린카)',
            '숙소(야놀자, 여기어때)',
        ],
        [
            'OTT(넷플릭스, 티빙)',
            '영화(CGV, 롯데시네마)',
            '도서(교보문고, 밀리의서재)',
        ],
    ];

    const optionicon = [
        [Icons.departmentstore, Icons.online, Icons.mart],
        [Icons.oil, Icons.telephone, Icons.transportation],
        [Icons.conveniencestore, Icons.cafe, Icons.delivery],
        [Icons.airplane, Icons.rent, Icons.hotel],
        [Icons.ott, Icons.movie, Icons.books],
    ];

    const handleTabClick = (index) => {
        if (activeTab === index) {
            setActiveTab(null);
            updateCategory(index, 1);
            setSelectedOptionIndex((prev) => {
                const updated = [...prev];
                updated[index] = null;
                return updated;
            });
            updateOption(index, null);
        } else {
            setActiveTab(index);
            updateCategory(index, 4);
        }
    };

    const handleOptionSelect = (optionIndex) => {
        if (activeTab !== null) {
            if (selectedOptionIndex[activeTab] === optionIndex) {
                updateCategory(activeTab, 4);
                updateOption(activeTab, null);
                setSelectedOptionIndex((prev) => {
                    const updated = [...prev];
                    updated[activeTab] = null;
                    return updated;
                });
            } else {
                updateCategory(activeTab, 5);
                updateOption(activeTab, options[activeTab][optionIndex]);
                setSelectedOptionIndex((prev) => {
                    const updated = [...prev];
                    updated[activeTab] = optionIndex;
                    return updated;
                });
            }
        }
    };

    return (
        <div className="w-full max-w-2xl">
            <div className="px-14 w-full flex justify-between border-b border-gray-200">
                {categories.map((category, index) => (
                    <button
                        key={index}
                        onClick={() => handleTabClick(index)}
                        className={`px-4 py-2 font-bold transition-colors ${categoryValues[index] >= 4
                            ? 'text-white bg-blue-500 rounded-lg border-b-2 border-blue-500'
                            : 'text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <div className="p-8 bg-white border border-t-0 border-gray-200">
                {activeTab !== null && (
                    <div className="space-y-4">
                        {options[activeTab].map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleOptionSelect(index)}
                                className={`flex w-full p-4 text-left rounded-lg transition-colors ${selectedOptionIndex[activeTab] === index
                                    ? 'bg-blue-50 border-blue-500'
                                    : 'hover:bg-gray-50'
                                    }`}
                            >
                                <div className="w-12 h-12 mr-4 flex items-center justify-center">
                                    <img
                                        src={optionicon[activeTab][index]}
                                        alt={option}
                                        className="w-12 h-12 object-contain"
                                    />
                                </div>
                                <span className="text-gray-700">{option}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
};

export default InteractiveTabContentBox;
