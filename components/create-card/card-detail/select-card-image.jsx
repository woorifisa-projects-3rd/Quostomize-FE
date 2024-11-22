'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import FlipCard from '../../../components/card/flip-card'

function SelectCardImage() {
    // 임시
    const i = 1;

    return (
        <div>
            {/* 제목 영역 */}
            <div className="px-6 pt-6 mb-4">
                <h2 className="font3 font-bold text-left">
                    카드정보를 <span className="color1">선택</span>해 주세요
                </h2>
            </div>
            {/* 카드 이미지 */}
            <div className="flex justify-center">
                <FlipCard frontImg={`/cards-images/${i}f.png`} backImg={`/cards-images/${i}b.png`} />
            </div>
        </div>
    )
}

export default SelectCardImage