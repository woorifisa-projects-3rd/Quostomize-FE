"use client";

import React, { useState, useEffect } from 'react';
import InteractiveRadarGraph from '../../graph/interactive-radar-graph';
import SelectBenefit3 from './select-benefit3';

const getRandomColor = () => {
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];
    return colors[Math.floor(Math.random() * colors.length)];
};

const SelectBenefit2 = () => {
    const [labels, setLabels] = useState(['쇼핑', '생활', '푸드', '여행', '문화']);
    const [data, setData] = useState([1, 1, 1, 1, 1]);
    const [borderColor, setBorderColor] = useState(getRandomColor);

    const handleButtonClick = (index) => {
        setData(prevData => {
            const newData = [...prevData];
            if (newData[index] < 5) {
                newData[index] += 1;
            }
            return newData;
        });
    };

    useEffect(() => {
        setBorderColor(getRandomColor());
    }, []);

    return (
        <div className='flex flex-col justify-center'>
            <InteractiveRadarGraph

                labels={labels}
                datasets={[
                    {
                        label: 'My Dataset',
                        data: data,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    },
                ]}
                max={5}
                min={0}
                onButtonClick={handleButtonClick}
                borderColor={borderColor}

            />
            <SelectBenefit3 labels={labels} data={data.map(item => item - 1)} />
        </div>
    );
};

export default SelectBenefit2;