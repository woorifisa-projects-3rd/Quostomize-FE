'use client'

import React, { useState } from 'react';
import CarouselCard from '../../card/carousel-card'

const SelectDesign1 = () => {

    const textColorClasses = ['text-purple', 'text-black', 'text-red', 'text-green', 'text-milk'];
    const colorNames = ['리눅스 퍼플', '인텔리 블랙', '젠킨스 레드', '스프링 그린', '오라클 밀크'];
    const [currentColorIndex, setCurrentColorIndex] = useState(0);
    const handleCardChange = (index) => {
        setCurrentColorIndex(index);
    };

    return (
        <div className='flex flex-col items-center gap-4 font3'>
            <CarouselCard onCardChange={handleCardChange} />
            <span>내가 선택한 {" "}<strong className={`${textColorClasses[currentColorIndex]}`}>{colorNames[currentColorIndex]}</strong></span>
        </div >
    )
}

export default SelectDesign1