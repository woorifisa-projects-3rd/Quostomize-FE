'use client'

import React, { useState, useEffect } from 'react'
import RadarGraph from '../graph/radar-graph'

const BenefitGraphData = () => {

    const chartDataVersions = [
        {
            labels: ['쇼핑', '생활', '푸드', '여행', '문화'],
            datasets: [
                {
                    label: '',
                    data: [100, 100, 100, 100, 100],
                    fill: true,
                    borderColor: '#FF9B9B',
                    backgroundColor: 'rgba(255, 155, 155, 0.2)',
                    borderWidth: 10,
                },
            ],
        },
        {
            labels: ['쇼핑', '생활', '푸드', '여행', '문화'],
            datasets: [
                {
                    label: '',
                    data: [60, 100, 20, 40, 0],
                    fill: true,
                    backgroundColor: 'rgba(255, 107, 107, 0.2)',
                    borderColor: '#FFA500',
                    borderWidth: 10,
                },
            ],
        },
        {
            labels: ['쇼핑', '생활', '푸드', '여행', '문화'],
            datasets: [
                {
                    label: '',
                    data: [60, 20, 100, 40, 80],
                    fill: true,
                    backgroundColor: 'rgba(123, 158, 255, 0.2)',
                    borderColor: '#7B9EFF',
                    borderWidth: 10,
                },
            ],
        },
        {
            labels: ['쇼핑', '생활', '푸드', '여행', '문화'],
            datasets: [
                {
                    label: '',
                    data: [100, 60, 20, 40, 80],
                    fill: true,
                    backgroundColor: 'rgba(255, 107, 107, 0.2)',
                    borderColor: '#FF6B6B',
                    borderWidth: 10,
                },
            ],
        },
        {
            labels: ['쇼핑', '생활', '푸드', '여행', '문화'],
            datasets: [
                {
                    label: '',
                    data: [60, 100, 100, 80, 60],
                    fill: true,
                    backgroundColor: 'rgba(139, 195, 74, 0.2)',
                    borderColor: '#8BC34A',
                    borderWidth: 10,
                },
            ],
        },
    ];

    const [currentDataIndex, setCurrentDataIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDataIndex((prevIndex) => (prevIndex + 1) % chartDataVersions.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <RadarGraph>{chartDataVersions[currentDataIndex]}</RadarGraph>
    )
}

export default BenefitGraphData