'use client';

import { Chart, RadarController, PointElement, LineElement, Tooltip, Legend, RadialLinearScale } from 'chart.js';
import React, { useEffect, useRef } from 'react';

Chart.register(RadarController, PointElement, LineElement, Tooltip, Legend, RadialLinearScale);

const RadarGraph = ({ children }) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        if (!chartRef.current) return;

        const ctx = chartRef.current.getContext('2d');
        if (!ctx) return;

        const { labels, datasets } = children; // children에서 필요한 데이터 추출
        chartInstanceRef.current = new Chart(ctx, {
            type: 'radar',
            data: {
                labels, // 레이블 데이터
                datasets, // 데이터셋
            },
            options: {
                responsive: true,
                scales: {
                    r: {
                        angleLines: { display: false },
                        beginAtZero: true,
                        ticks: {
                            stepSize: 20,
                            display: false,
                        },
                        pointLabels: {
                            display: true,
                            font: {
                                size: 13,
                            },
                            color: '#333D4B',
                            padding: 7
                        },
                        backgroundColor: 'rgba(200, 200, 255, 0.1)',

                    },
                },
                plugins: {
                    datalabels: {
                        color: 'white',
                        font: {
                            weight: 'bold',
                            size: 10,
                        },
                        formatter: function (value) {
                            return value;
                        },
                    },
                    tooltip: {
                        callbacks: {
                            label: function (tooltipItem) {
                                return `${tooltipItem.dataset.label}: ${tooltipItem.raw}%`
                            }
                        }
                    },
                    legend: {
                        display: false,
                    },
                },
            },
        });

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [children]);

    return (
        <div style={{ position: 'relative', width: '280px', height: '280px' }}>
            <canvas ref={chartRef} style={{ width: '100%', height: '100%' }}></canvas>
        </div>
    );
};

export default RadarGraph;