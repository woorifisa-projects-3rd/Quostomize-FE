'use client';

import React, { useState, useEffect } from 'react';
import ModalHeader from "./modalComponent/modalHeader"
import ModalData from "./modalComponent/modalData"
import ChevronButton from "./modalComponent/chevronButton"


const CheckModal = ({ onClose, setNumber, number1 }) => {
    const [shuffledNumbers, setShuffledNumbers] = useState([]);
    const MAX_LENGTH = 6;

    useEffect(() => {
        shuffleNumbers();
        setNumber([])
    }, []);

    const shuffleNumbers = () => {
        const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
        for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }
        setShuffledNumbers(numbers);
    };

    const handleKeyPress = (digit) => {
        if (number1.length < MAX_LENGTH) {
            const immediatedData = [...number1]
            immediatedData.push(digit)
            setNumber(immediatedData);
        }
        if (number1.length + 1 === MAX_LENGTH) {
            setTimeout(() => onClose(false), 100);
        }
    };

    const handleDelete = () => {
        const immediatedData = [...number1]
        immediatedData.pop()
        setNumber(immediatedData);
    };

    return (
        <div className="absolute inset-0 flex justify-center items-center z-50">
            <div className="w-[576px] bg-[#192436] h-full flex flex-col items-center">
                <ChevronButton onClick={() => onClose()} classNameProps={`self-start text-white mt-4 ml-4`}>←</ChevronButton>
                <h3 className="text-white text-lg mt-20 mb-6" />
                <ModalHeader maxLength={MAX_LENGTH} number1={number1}></ModalHeader>
                <div className="mt-40 grid grid-cols-3 gap-16 text-center text-white w-full max-w-[400px]" >
                    {shuffledNumbers.slice(0, 9).map((number, index) => (
                        <div key={`button-${number}`}>
                            <ModalData number={number} onClick={() => handleKeyPress(number)}></ModalData>
                        </div>
                    ))}
                    <div key="empty-space" />
                    <ChevronButton onClick={() => handleKeyPress(shuffleNumbers[9])} classNameProps={`text-2xl`}>{shuffledNumbers[9]}</ChevronButton>
                    <ChevronButton onClick={() => handleDelete()} classNameProps={`text-2xl`}>←</ChevronButton>
                </div>
            </div>
        </div>
    );
};

export default CheckModal;