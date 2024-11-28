'use client'

import { useBenefitContext } from './BenefitContext';
import { useState, useEffect } from 'react';
import InteractiveRadarGraph from '../../graph/interactive-radar-graph';
import SelectBenefit3 from './select-benefit3';
import InteractiveTabContentBox from '../box/InteractiveTabContentBox';

const getRandomColor = () => {
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];
    return colors[Math.floor(Math.random() * colors.length)];
};

const SelectBenefit2 = () => {
    const { categoryValues } = useBenefitContext();
    const [borderColor, setBorderColor] = useState(getRandomColor());
    const labels = ['쇼핑', '생활', '푸드', '여행', '문화'];

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
            <InteractiveTabContentBox />
            <SelectBenefit3 labels={labels} data={categoryValues.map(value => value - 1)} />
        </div>
    );
};

export default SelectBenefit2;
