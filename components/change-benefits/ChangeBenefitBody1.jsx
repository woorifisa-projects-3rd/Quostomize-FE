"use client"

import React, { useEffect, useState } from 'react'

import { useBenefitContext } from '../create-card/select-benefit/BenefitContext';
import InteractiveRadarGraph from '../graph/interactive-radar-graph';

const getRandomColor = () => {
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];
    return colors[Math.floor(Math.random() * colors.length)];
};

const ChangeBenefitBody1 = ({ labels }) => {
    const { categoryValues, benefitData } = useBenefitContext();
    const [borderColor, setBorderColor] = useState(getRandomColor());

    const chartRate = benefitData && Array.isArray(benefitData)
        ? benefitData.map(item => item.benefitRate)
        : categoryValues;

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
                        data: chartRate,
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