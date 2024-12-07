'use client'

import { useState, useEffect } from 'react';
import InteractiveRadarGraph from '../../graph/interactive-radar-graph';
import InteractiveTabContentBox from '../../box/InteractiveTabContentBox';

const getRandomColor = () => {
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];
    return colors[Math.floor(Math.random() * colors.length)];
};

const SelectBenefit2 = ({ benefitState, setBenefitState }) => {
    const initialState = {
        categoryValues: [1, 1, 1, 1, 1],
        selectedCategories: [null, null, null, null, null],
        selectedOptions: [null, null, null, null, null],
    };

    const resetContext = () => {
        setBenefitState(initialState);
    };

    const [borderColor, setBorderColor] = useState(getRandomColor());

    const categoryMap = {
        1: '쇼핑',
        2: '생활',
        3: '푸드',
        4: '여행',
        5: '문화',
    };

    const lowerCategoryMap = {
        100: '백화점(더현대, 신세계, 롯데백화점)',
        101: '온라인쇼핑(무신사, 에이블리, 쿠팡)',
        102: '마트(이마트, 홈플러스)',
        200: '주유소(SK, GS칼텍스)',
        201: '통신(SKT, KT, LGU+)',
        202: '대중교통(버스, 지하철, 택시)',
        300: '편의점(CU, GS25)',
        301: '카페(스타벅스, 투썸플레이스)',
        302: '배달(배달의민족, 쿠팡이츠)',
        400: '항공(인터파크 투어, 네이버 항공)',
        401: '렌트(쏘카, 그린카)',
        402: '숙소(야놀자, 여기어때)',
        500: 'OTT(넷플릭스, 티빙)',
        501: '영화(CGV, 롯데시네마)',
        502: '도서(교보문고, 밀리의서재)',
    };

    const labels = Object.values(categoryMap);

    useEffect(() => {
        setBorderColor(getRandomColor());
    }, []);

    const processBenefitState = () => {
        const updatedCategoryValues = [...benefitState.categoryValues];
        const updatedCategories = [...benefitState.selectedCategories];
        const updatedSelectedOptions = [...benefitState.selectedOptions];

        let isUpdated = false;

        Object.values(benefitState).forEach((item) => {
            if (!item || !item.upperCategoryId) return;

            const categoryIndex = item.upperCategoryId - 1;
            if (categoryIndex >= 0 && categoryIndex < updatedCategoryValues.length) {
                updatedCategoryValues[categoryIndex] = 4;
                updatedCategories[categoryIndex] = item.upperCategoryId;
                isUpdated = true;

                if (item.lowerCategoryId) {
                    updatedCategoryValues[categoryIndex] = 5;
                    updatedSelectedOptions[categoryIndex] = item.lowerCategoryId;
                    isUpdated = true;
                }
            }
        });

        if (isUpdated) {
            setBenefitState((prev) => ({
                ...prev,
                categoryValues: updatedCategoryValues,
                selectedCategories: updatedCategories,
                selectedOptions: updatedSelectedOptions,
            }));
        }
    };

    useEffect(() => {
        processBenefitState();
    }, [benefitState]);


    const updateCategoryValue = (index, value) => {
        setBenefitState((prevState) => ({
            ...prevState,
            categoryValues: prevState.categoryValues.map((v, i) => (i === index ? Math.min(value, 5) : v)),
        }));
    };

    const updateCategory = (index, value) => {
        setBenefitState((prevState) => ({
            ...prevState,
            selectedCategories: prevState.selectedCategories.map((v, i) => (i === index ? value : v)),
        }));
    };

    const updateOption = (categoryIndex, option) => {
        setBenefitState((prevState) => ({
            ...prevState,
            selectedOptions: prevState.selectedOptions.map((v, i) => (i === categoryIndex ? option : v)),
        }));
    };

    const [isSelected, setSelected] = useState(false);

    useEffect(() => {
        const selectedOptions = benefitState.selectedOptions;
        for (let selectedOption of selectedOptions) {
            if (selectedOption) {
                setSelected(true);
                return;
            }
        }
        setSelected(false);
    }, [benefitState])


    return (
        <div>
            <div className='flex flex-col items-center space-y-2'>
                <InteractiveRadarGraph
                    labels={labels}
                    datasets={[
                        {
                            label: 'My Dataset',
                            data: benefitState.categoryValues,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        },
                    ]}
                    max={5}
                    min={0}
                    borderColor={borderColor}
                />
                <InteractiveTabContentBox labels={labels} categoryMap={categoryMap} lowerCategoryMap={lowerCategoryMap} data={benefitState.categoryValues.map(value => value - 1)} benefitState={benefitState} updateCategoryValue={updateCategoryValue} updateCategory={updateCategory} updateOption={updateOption} />
            </div>
            <div className='flex justify-end mt-2 pr-4'>
                <button
                    onClick={resetContext}
                    className={`px-4 py-2 bg-red-200 text-white rounded-lg text-xs
                                ${isSelected
                            ? "bg-red-500"
                            : "bg-red-200"
                        }
                        `}> 선택 초기화 </button>
            </div>
        </div>
    );
};

export default SelectBenefit2;
