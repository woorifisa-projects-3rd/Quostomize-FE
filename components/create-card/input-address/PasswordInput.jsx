'use client';

import React, { useState, useEffect } from 'react';

const PasswordInput = ({ onClose, onComplete, isConfirm }) => {
    const [password, setPassword] = useState('');
    const [shuffledNumbers, setShuffledNumbers] = useState([]);
    const MAX_LENGTH = 4;

    useEffect(() => {
        shuffleNumbers();
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
        if (password.length < MAX_LENGTH) {
            setPassword(password + digit);
        }
        if (password.length + 1 === MAX_LENGTH) {
            setTimeout(() => onComplete(password + digit), 300);
        }
    };

    const handleDelete = () => {
        setPassword(password.slice(0, -1));
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
            <div className="w-full h-full md:h-[700px] md:w-[400px] bg-[#192436] flex flex-col items-center md:rounded-2xl">
                <button
                    onClick={onClose}
                    className="self-start text-white mt-6 ml-6 text-2xl hover:opacity-80"
                >
                    ←
                </button>

                <h3 className="text-white text-lg mt-12">
                    {isConfirm}
                </h3>

                <div className="flex justify-center items-start space-x-4 mt-4">
                    {Array(MAX_LENGTH)
                        .fill(0)
                        .map((_, idx) => (
                            <div
                                key={idx}
                                className={`w-3 h-3 rounded-full ${
                                    idx < password.length ? 'bg-gray-300' : 'bg-gray-600'
                                }`}
                            />
                        ))}
                </div>

                <div className="mt-auto mb-24 grid grid-cols-3 gap-12 text-center text-white w-full max-w-[360px] px-8">
                    {shuffledNumbers.slice(0, 9).map((number) => (
                        <button
                            key={`button-${number}`}
                            onClick={() => handleKeyPress(number)}
                            className="text-2xl py-4 hover:opacity-80 transition-opacity"
                        >
                            {number}
                        </button>
                    ))}
                    <div key="empty-space" />
                    <button
                        key={`button-${shuffledNumbers[9]}`}
                        onClick={() => handleKeyPress(shuffledNumbers[9])}
                        className="text-2xl py-4 hover:opacity-80 transition-opacity"
                    >
                        {shuffledNumbers[9]}
                    </button>
                    <button
                        key="delete-button"
                        onClick={handleDelete}
                        className="text-2xl py-4 hover:opacity-80 transition-opacity"
                    >
                        ←
                    </button>
                </div>
            </div>
        </div>
    );
};
export default PasswordInput;