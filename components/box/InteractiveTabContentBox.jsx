import React, { useState } from 'react';
import Icons from '../../public/icons/icons';

const InteractiveTabContentBox = ({ labels, categoryMap, lowerCategoryMap, benefitState, data, updateOption, updateCategory, updateCategoryValue }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(Array(5).fill(null));

    const categoryKeys = [1, 2, 3, 4, 5];
    const categories = Object.values(categoryMap);
    const options = [
        [100, 101, 102],
        [200, 201, 202],
        [300, 301, 302],
        [400, 401, 402],
        [500, 501, 502],
    ];

    const mappedOptions = options.map((categoryGroup) =>
        categoryGroup.map((categoryId) => lowerCategoryMap[categoryId])
    );

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
            updateCategoryValue(index, 1);

            setSelectedOptionIndex((prev) => {
                const updated = [...prev];
                updated[index] = null;
                return updated;
            });
            updateOption(index, null);
        } else {
            setActiveTab(index);
            updateCategory(index, categoryKeys[index]);
            updateCategoryValue(index, 4);
        }
    };

    const handleOptionSelect = (optionIndex) => {
        if (activeTab !== null) {
            if (selectedOptionIndex[activeTab] === optionIndex) {
                updateCategoryValue(activeTab, 4);
                updateOption(activeTab, null);
                setSelectedOptionIndex((prev) => {
                    const updated = [...prev];
                    updated[activeTab] = null;
                    return updated;
                });
            } else {
                updateCategoryValue(activeTab, 5);
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
            <div className="px-8 py-2 mb-1 w-full flex justify-between items-center border-b border-gray-200">
                {categories.map((category, index) => (
                    <React.Fragment key={index}>
                        <button
                            key={index}
                            onClick={() => handleTabClick(index)}
                            className={`flex flex-col items-center font-bold transition-colors ${benefitState.categoryValues[index] >= 4}`}
                            style={{
                                color: (activeTab === index || benefitState.categoryValues[index] >= 4) ? 'black' : '#D1D5DB',
                            }}
                        >
                            <div className="text-sm"
                                style={{
                                    letterSpacing: '0.1em'
                                }}>{category}</div>
                            <div className="text-sm text-blue-600 mt-1">{data[index]} %</div>
                        </button>
                        {index < categories.length - 1 && (
                            <div className="h-8 border-l border-gray-300"></div>
                        )}
                    </React.Fragment>

                ))}
            </div>
            <div className="p-4 bg-white border border-t-0 border-gray-200">
                {activeTab !== null && (
                    <div className="space-y-4">
                        {mappedOptions[activeTab].map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleOptionSelect(index)}
                                className={`flex w-full px-4 items-center text-left rounded-lg transition-colors ${selectedOptionIndex[activeTab] === index
                                    ? 'bg-blue-50 border-blue-500'
                                    : 'hover:bg-gray-50'
                                    }`}
                            >
                                <div className="w-10 h-10 mr-4 flex items-center justify-center">
                                    <img
                                        src={optionicon[activeTab][index]}
                                        alt={option}
                                        className="w-10 h-10 object-contain"
                                    />
                                </div>
                                <span className="text-xs text-gray-700">{option}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

        </div >
    );
};

export default InteractiveTabContentBox;
