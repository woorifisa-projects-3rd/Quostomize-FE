'use client'

import React, { useEffect, useState } from 'react';
import './Scroll.css';

const Scroll = ({ zIndex = 9999 }) => {
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        // 10초 후 opacity를 0으로 설정
        const timer = setTimeout(() => {
            setOpacity(0);
        }, 10000); // 10000ms = 10초

        // 컴포넌트 언마운트 시 타이머 정리
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '50px',
                left: '0',
                width: '100%',
                height: '100px',
                zIndex,
                opacity, // 상태로 관리된 opacity 적용
                transition: 'opacity 0.2s ease-out', // 부드러운 전환 효과
                pointerEvents: 'none',
            }}
        >
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <span className="scroll-span" style={{ animationDelay: '0s', top: '0' }}></span>
                <span className="scroll-span" style={{ animationDelay: '0.15s', top: '16px' }}></span>
                <span className="scroll-span" style={{ animationDelay: '0.3s', top: '32px' }}></span>
            </div>
        </div>
    );
};

export default Scroll;
