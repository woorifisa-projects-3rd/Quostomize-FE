'use client'

import React, { useState } from 'react';
import CarouselCard from '../../card/carousel-card'
import ColorInfo from "../../card/colorInfo";
import GradientText from "../../card/gradientText";

const SelectDesign1 = ({ selectedCardIndex, onCardChange }) => {

    // const handleCardChange = (index) => {
    //     setCurrentColorIndex(index);
    // };

    return (
        <div className='flex flex-col items-center gap-4 font-bold font4'>
            <CarouselCard onCardChange={handleCardChange} />
            <span>내가 선택한 {" "}
                <GradientText
                    text={ColorInfo[currentColorIndex].name}
                    style={ColorInfo[currentColorIndex].style}
                    />
            </span>
        </div >
    )
}

export default SelectDesign1