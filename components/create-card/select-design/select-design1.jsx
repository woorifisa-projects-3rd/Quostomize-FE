'use client'

import React from 'react';
import CarouselCard from '../../card/carousel-card'
import ColorInfo from "../../card/colorInfo";
import GradientText from "../../card/gradientText";

const SelectDesign1 = ({ selectedCardIndex, onCardChange }) => {
    return (
        <div className='flex flex-col items-center font-bold font4'>
            <div className="w-full mx-6 text-center">
                <h2 className="font3 font-bold">
                    카드 색상을 <span className="color1">선택</span>해 주세요
                </h2>
                <p className="text-sm text-gray-600">양옆으로 바꿔가며 카드색상을 선택해보세요!</p>
            </div>
            <CarouselCard onCardChange={onCardChange} />
            <span className='mt-5' >내가 선택한</span>
            <span>{" "}
                <GradientText
                    text={ColorInfo[selectedCardIndex].name}
                    style={ColorInfo[selectedCardIndex].style}
                />
            </span>
        </div >
    )
}
export default SelectDesign1