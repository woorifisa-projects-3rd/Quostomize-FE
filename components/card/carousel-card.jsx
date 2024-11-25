'use client'

import React, { useEffect, useRef, useState } from 'react'
import '../../Carousel.css'

const CarouselCard = ({ onCardChange }) => {
    const [angle, setAngle] = useState(0);
    const sceneRef = useRef(null);
    const carouselRef = useRef(null);

    const rotateAngle = 360 / 5;
    const radian = (rotateAngle / 2) * Math.PI / 180;
    const colTz = Math.round((210 / 2) / Math.tan(radian));

    // 초기 카드 각도 설정
    useEffect(() => {
        const cards = carouselRef.current.children;
        Array.from(cards).forEach((el, idx) => {
            el.style.transform = `rotateY(${rotateAngle * idx}deg) translateZ(${colTz}px)`;
        });
    }, [colTz, rotateAngle]);

    const calculateFrontCardIndex = (currentAngle) => {
        const normalizedAngle = ((currentAngle % 360) + 360) % 360;
        return Math.round(normalizedAngle / rotateAngle) % 5;
    };

    // 각도가 변경될 때마다 현재 카드 번호를 부모 컴포넌트에 전달
    useEffect(() => {
        const currentIndex = calculateFrontCardIndex(angle);
        onCardChange(currentIndex);
    }, [angle, onCardChange]);

    const handlePrev = () => {
        setAngle((prev) => prev - rotateAngle);
    };

    const handleNext = () => {
        setAngle((prev) => prev + rotateAngle);
    };

    return (
        <div className='carousel-container'>
            <button className="pre-btn" onClick={handlePrev}>
                &#60;
            </button>

            <div className="scene" ref={sceneRef}>
                <div
                    className={`carousel`}
                    ref={carouselRef}
                    style={{
                        transform: `rotateY(${-angle}deg)`
                    }}
                >
                    {Array.from({ length: 5 }, (_, idx) => {
                        const cardNumber = idx + 1;
                        return (
                            <div key={cardNumber} className="carousel-card">
                                <img
                                    src={`/cards-images/${cardNumber}f.png`}
                                    alt={`Card ${cardNumber}`}
                                />
                            </div>
                        );
                    })}
                </div>
            </div >

            <button className="next-btn" onClick={handleNext}>
                &#62;
            </button>
        </div>
    )
}

export default CarouselCard