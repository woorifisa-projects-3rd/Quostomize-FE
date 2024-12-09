import React, { useState, useEffect } from 'react';
import Icons from '../../public/icons/icons';

const InteractiveTabContentBox = ({
    categoryMap,
    lowerCategoryMap,
    benefitState,
    data,
    updateOption,
    updateCategory,
    updateCategoryValue,
}) => {
    const [activeTab, setActiveTab] = useState(0);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(Array(5).fill(null));
    const [isInitialized, setIsInitialized] = useState(false);

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
            setSelectedOptionIndex((prev) => {
                const updated = [...prev];
                updated[index] = null;
                return updated;
            });
            updateOption(index, null);
            updateCategory(index, null);
            updateCategoryValue(index, 1);
        } else {
            setActiveTab(index);
            setSelectedOptionIndex((prev) => {
                const updated = [...prev];
                updated[index] = 0;
                return updated;
            });
            updateOption(index, options[index][0]);
            updateCategory(index, categoryKeys[index]);
            updateCategoryValue(index, 5);
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

    useEffect(() => {
        if (!isInitialized) {
            setActiveTab(0);
            updateCategory(0, categoryKeys[0]);
            setSelectedOptionIndex((prev) => {
                const updated = [...prev];
                updated[0] = 0;
                return updated;
            });
            updateOption(0, options[0][0]);
            updateCategoryValue(0, 5);
            setIsInitialized(true);
        }
    }, []);

    return (
        <div className='w-full'>
            <div className="px-8 flex w-full justify-between relative border-b border-gray-200">
                {categories.map((category, index) => (
                    <button
                        key={index}
                        onClick={() => handleTabClick(index)}
                        className={`relative z-10 px-4 py-3 font1 font-bold transition-all text-center rounded-t-md ${activeTab === index || benefitState.categoryValues[index] >= 4
                            ? 'bg-white text-blue-600 shadow-[0_0_10px_2px_rgba(59,130,246,0.5)]'
                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                            }`}
                        style={{
                            minWidth: '1rem',
                            zIndex: activeTab === index ? 20 : 10,
                            background: activeTab === index
                                ? 'linear-gradient(to top, #ffffff, #f0faff)'
                                : undefined,
                        }}
                    >
                        <div className="text-sm">{category}</div>
                        <div className="text-sm text-blue-600 mt-1">{data[index]} %</div>
                    </button>
                ))}
            </div>

            <p className='flex justify-center mt-2 text-xs text-gray-500'>선택된 옵션을 한번 더 클릭하면<span className='font-bold ml-1'>전체 옵션</span>에 대해서 혜택을 받을 수 있어요!</p>
            <div className="h-[14rem] mt-3 px-6 bg-white border border-t-0 border-gray-200">
                {activeTab !== null ? (
                    <div className="space-y-4">
                        {mappedOptions[activeTab].map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleOptionSelect(index)}
                                className={`flex w-full h-12 items-center p-4 rounded-lg transition-all ${selectedOptionIndex[activeTab] === index
                                    ? 'bg-blue-50 border border-blue-500'
                                    : 'hover:bg-gray-50'
                                    }`}
                            >
                                <div className="flex-shrink-0 w-10 h-10 mr-4 flex items-center justify-center">
                                    <img
                                        src={optionicon[activeTab][index]}
                                        alt={option}
                                        className="w-10 h-10 object-contain"
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className="font1 font-semibold text-gray-700">
                                        {option}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="h-full flex items-center justify-center">
                        <p className="text-gray-400 font1">혜택 탭을 눌러 카드 혜택을 선택해주세요</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InteractiveTabContentBox;