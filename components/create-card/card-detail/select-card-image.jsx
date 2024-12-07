'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import FlipCard from '../../../components/card/flip-card'

function SelectCardImage({ selectedCardIndex }) {
    // 임시
    const i = selectedCardIndex + 1;

    return (
        <div className="px-6">
            {/* 제목 영역 */}
            <div className="max-w-md mx-auto text-center">
                <h2 className="font3 font-bold">
                    카드 정보를 <span className="color1">선택</span>해 주세요
                </h2>
                <p className="text-sm text-gray-600">카드를 눌러 확인해보세요!</p>
            </div>
            {/* 카드 이미지 */}
            <div className="flex justify-center">
                <FlipCard frontImg={`/cards-images/${i}f.png`} backImg={`/cards-images/${i}b.png`} />
            </div>
        </div>
    )
}

export default SelectCardImage