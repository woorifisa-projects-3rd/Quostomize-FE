'use client';

import { Chart, BarController, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import React, { useEffect, useRef } from 'react';

Chart.register(BarController, BarElement, Tooltip, Legend, CategoryScale, LinearScale, ChartDataLabels);

// 애니메이션 적용
const BenefitChartV1 = () => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        if (!chartRef.current) return;

        const ctx = chartRef.current.getContext('2d');
        if (!ctx) return;

        // 데이터와 색상 설정
        const chartDataVersions = [
            {
                labels: [''],
                datasets: [
                    {
                        label: '쇼핑',
                        data: [20],
                        backgroundColor: '#a8e1ff',
                    },
                    {
                        label: '생활',
                        data: [20],
                        backgroundColor: '#88c5ff',
                    },
                    {
                        label: '푸드',
                        data: [20],
                        backgroundColor: '#67a9ff'
                    },
                    {
                        label: '여행',
                        data: [20],
                        backgroundColor: '#438ff6',
                    },
                    {
                        label: '문화',
                        data: [20],
                        backgroundColor: '#0075d9',
                    },
                ],
            },
            {
                labels: [''],
                datasets: [
                    {
                        label: '쇼핑',
                        data: [20],
                        backgroundColor: '#a8e1ff',
                    },
                    {
                        label: '생활',
                        data: [50],
                        backgroundColor: '#88c5ff',
                    },
                    {
                        label: '여행',
                        data: [30],
                        backgroundColor: '#438ff6',
                    },
                ],
            },
            {
                labels: [''],
                datasets: [
                    {
                        label: '쇼핑',
                        data: [15],
                        backgroundColor: '#a8e1ff',
                    },
                    {
                        label: '푸드',
                        data: [40],
                        backgroundColor: '#67a9ff'
                    },
                    {
                        label: '여행',
                        data: [15],
                        backgroundColor: '#438ff6',
                    },
                    {
                        label: '문화',
                        data: [30],
                        backgroundColor: '#0075d9',
                    },
                ],
            },
        ];

        // Chart.js 초기화
        chartInstanceRef.current = new Chart(ctx, {
            type: 'bar',
            data: chartDataVersions[0], // 첫 번째 데이터셋
            options: {
                responsive: true,
                indexAxis: 'y', // 가로형 그래프 설정
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function (tooltipItem) {
                                return `${tooltipItem.dataset.label}: ${tooltipItem.raw}%`;
                            },
                        },
                    },
                    legend: {
                        display: false, // 범례 숨기기
                    },
                    datalabels: {
                        color: 'white',
                        font: {
                            weight: 'bold',
                            size: 12,
                        },
                        align: 'center',
                        anchor: 'center',
                        formatter: function (value, context) {
                            return context.dataset.label; // 레이블 이름 표시
                        },
                    },
                },
                scales: {
                    x: {
                        stacked: true, // x축에서 스택 활성화
                        beginAtZero: true,
                        display: false, // x축 숨기기
                    },
                    y: {
                        stacked: true, // y축에서 스택 활성화
                        display: false, // y축 숨기기
                    },
                },
            },
        });

        let currentVersion = 0;
        const interval = setInterval(() => {
            currentVersion = (currentVersion + 1) % chartDataVersions.length; // 데이터셋 순환
            chartInstanceRef.current.data = chartDataVersions[currentVersion];
            chartInstanceRef.current.update(); // 차트 업데이트
        }, 3500);

        return () => {
            if (chartInstanceRef.current) {
                clearInterval(interval); // 컴포넌트 unmount 시 interval 정리
                chartInstanceRef.current.destroy();
            }
        };
    }, []); // 빈 배열로 useEffect 한번만 실행

    return (
        <div style={{ position: 'relative', width: '500px', height: '100px' }}>
            <canvas ref={chartRef} style={{ width: '100%', height: '100%' }}></canvas>
        </div>
    );
};

export default BenefitChartV1;