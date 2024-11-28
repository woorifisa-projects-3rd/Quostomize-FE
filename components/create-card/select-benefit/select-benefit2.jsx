'use client'

import { useBenefitContext } from './BenefitContext';
import { useState, useEffect } from 'react';
import InteractiveRadarGraph from '../../graph/interactive-radar-graph';
import SelectBenefit3 from './select-benefit3';
import InteractiveTabContentBox from '../../box/InteractiveTabContentBox';

const getRandomColor = () => {
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];
    return colors[Math.floor(Math.random() * colors.length)];
};

const SelectBenefit2 = () => {
    const { categoryValues } = useBenefitContext();
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

    return (
        <div className='flex flex-col items-center space-y-8'>
            <InteractiveRadarGraph
                labels={labels}
                datasets={[
                    {
                        label: 'My Dataset',
                        data: categoryValues,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    },
                ]}
                max={5}
                min={0}
                borderColor={borderColor}
            />
            <InteractiveTabContentBox categoryMap={categoryMap} lowerCategoryMap={lowerCategoryMap} />
            <SelectBenefit3 labels={labels} lowerCategoryMap={lowerCategoryMap} data={categoryValues.map(value => value - 1)} />
        </div>
    );
};

export default SelectBenefit2;
