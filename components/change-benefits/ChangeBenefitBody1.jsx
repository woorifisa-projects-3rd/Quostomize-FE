"use client"

import React, { useEffect, useState } from 'react'

import { useBenefitContext } from '../create-card/select-benefit/BenefitContext';
import InteractiveRadarGraph from '../graph/interactive-radar-graph';
import InteractiveTabContentBox from '../box/InteractiveTabContentBox';

const getRandomColor = () => {
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];
    return colors[Math.floor(Math.random() * colors.length)];
};

const ChangeBenefitBody1 = () => {

    const { categoryValues } = useBenefitContext();
    const [borderColor, setBorderColor] = useState(getRandomColor());
    const labels = ['쇼핑', '생활', '푸드', '여행', '문화'];

    useEffect(() => {
        setBorderColor(getRandomColor());
    }, []);


    return (
        <div>
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
        </div>
    )
}

export default ChangeBenefitBody1