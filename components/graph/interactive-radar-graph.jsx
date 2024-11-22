'use client';

import { Chart, RadarController, PointElement, LineElement, Tooltip, Legend, RadialLinearScale } from 'chart.js';
import React, { useEffect, useRef } from 'react';

Chart.register(RadarController, PointElement, LineElement, Tooltip, Legend, RadialLinearScale);

const InteractiveRadarGraph = ({ labels, datasets, onButtonClick, borderColor, max, min }) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        if (!chartRef.current) return;

        const ctx = chartRef.current.getContext('2d');
        if (!ctx) return;

        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        chartInstanceRef.current = new Chart(ctx, {
            type: 'radar',
            data: {
                labels,
                datasets: datasets.map(dataset => ({
                    ...dataset,
                    borderColor,
                    clip: { left: 0, top: 0, right: 0, bottom: 0 },
                    data: dataset.data.map(value => Math.min(max, Math.max(min, value))),
                })),
            },
            options: {
                responsive: true,
                scales: {
                    r: {
                        angleLines: { display: false },
                        min: min,
                        max: max,
                        beginAtZero: true,
                        ticks: {
                            stepSize: (max - min) / 5,
                            display: false,
                        },
                        pointLabels: {
                            display: true,
                            font: {
                                size: 15,
                            },
                            color: '#333D4B',
                            padding: 7
                        },
                        backgroundColor: 'rgba(200, 200, 255, 0.1)',
                    },
                },
                plugins: {
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
    }, [labels, datasets, borderColor, max, min]);

    return (
        <div className='flex flex-col justify-between items-center'>
            <div className="relative items-center" style={{ flex: '1 1 auto' }}>
                <canvas style={{ width: '100%', height: '100%' }} ref={chartRef}></canvas>
            </div>
            <div className=" mt-2">
                {labels.map((label, index) => (
                    <button key={index} onClick={() => onButtonClick(index)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition">
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default InteractiveRadarGraph;