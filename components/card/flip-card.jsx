'use client'

import React, { useState } from 'react';
import '../../FlipCard.css';

const FlipCard = ({ frontImg, backImg }) => {
    // 카드 뒤집기 상태 관리
    const [isFlipped, setIsFlipped] = useState(false);

    // 카드 클릭 시 뒤집기 상태 변경
    const handleCardClick = () => {
        setIsFlipped(prevState => !prevState);
    };

    return (
        <div className="card" onClick={handleCardClick}>
            <div className={`card_box ${isFlipped ? 'flipped' : ''}`}>
                <div className="front">
                    <img src={frontImg} alt="앞면" />
                </div>
                <div className="back">
                    <img src={backImg} alt="뒷면" />
                </div>
            </div>
        </div>
    );
};

export default FlipCard;