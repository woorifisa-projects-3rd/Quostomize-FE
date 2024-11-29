'use client'

import React, { useState } from 'react';
import CarouselCard from '../../card/carousel-card'

const SelectDesign1 = ({ selectedCardIndex, onCardChange }) => {

    const colorInfo = [
        {
            name: '리눅스 퍼플',
            gradient: 'animate-gradient-purple',
            style: {
                backgroundImage: 'linear-gradient(-45deg, #a855f7, #6366f1, #a855f7, #6366f1)',
            }
        },
        {
            name: '인텔리 블랙',
            gradient: 'animate-gradient-black',
            style: {
                backgroundImage: 'linear-gradient(-45deg, #5555f7, #536d94, #445063, #000000)',
            }
        },
        {
            name: '젠킨스 레드',
            gradient: 'animate-gradient-red',
            style: {
                backgroundImage: 'linear-gradient(-45deg, #f7555d, #f17f63, #f75855, #ff0000)',
            }
        },
        {
            name: '스프링 그린',
            gradient: 'animate-gradient-green',
            style: {
                backgroundImage: 'linear-gradient(-45deg, #22c55e, #15803d, #22c55e, #15803d)',
            }
        },
        {
            name: '리액트 실버',
            gradient: 'animate-gradient-milk',
            style: {
                backgroundImage: 'linear-gradient(-45deg, #c0c0c0, #99bbff, #d4d4d4, #99bbff)',
            }
        }
    ];

    return (
        <div className="flex flex-col items-center gap-4 font-bold font4">
            {/* onCardChange를 CarouselCard에 그대로 전달 */}
            <CarouselCard onCardChange={onCardChange}/>
            <span>
                내가 선택한{' '}
                <span
                    className="text-transparent bg-clip-text animate-gradient-text bg-[length:400%_400%]"
                    style={colorInfo[selectedCardIndex].style}
                >
                    {colorInfo[selectedCardIndex].name}
                </span>
            </span>

            <style jsx global>{`
                @keyframes gradient-text {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }

                .animate-gradient-text {
                    animation: gradient-text 3s ease infinite;
                }
            `}</style>
        </div>
    );
};

export default SelectDesign1