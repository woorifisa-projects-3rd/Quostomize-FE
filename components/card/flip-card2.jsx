'use client'

import React, {useState} from 'react';
import '../../FlipCard2.css';

const FlipCard2 = ({ frontImg, backImg }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const handleCardClick = () => {
        setIsFlipped(prevState => !prevState);
    };

    return (
        <div className='card2' onClick={handleCardClick}>
            <div className={`card_box2 ${isFlipped ? 'flipped' : ''}`}>
                <div className="front">
                    <img src={frontImg} alt="앞면" className='card_img'/>
                </div>
                <div className="back">
                    <img src={backImg} alt="뒷면" className='card_img'/>
                </div>
            </div>
        </div>
    );
};

export default FlipCard2;