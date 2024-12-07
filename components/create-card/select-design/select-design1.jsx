'use client'

import React from 'react';
import CarouselCard from '../../card/carousel-card'
import ColorInfo from "../../card/colorInfo";
import GradientText from "../../card/gradientText";

const SelectDesign1 = ({ selectedCardIndex, onCardChange }) => {
    return (
        <div className='flex flex-col items-center font-bold font4'>
            <CarouselCard onCardChange={onCardChange} />
            <span>내가 선택한</span>
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