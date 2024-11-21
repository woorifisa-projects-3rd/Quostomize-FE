'use client'

import React, { useState } from 'react'
import Image from 'next/image'

function SelectCardImage() {
    const tempCard = {
        id: 5,
        name: 'yellow',
        image: '/cards-images/yellow-image.png'
    };

    return (
        <div className="flex flex-col w-full bg-gray-50">
            {/* 제목 영역 */}
            <div className="px-6 pt-6 mb-4">
                <h2 className="text-2xl font-bold text-left text-gray-800">
                    카드정보를 <span className="text-blue-400">선택 </span>해주세요
                </h2>
            </div>
            
            {/* 카드 섹션 */}
            <div className="w-full space-y-2">
                {/* 커스터마이징 카드 텍스트 */}
                <p className="text-xl font-extrabold text-lime-500 text-center">
                    커스터마이징 카드
                </p>
                
                {/* 카드 이미지 */}
                <div className="w-full bg-gray-50">
                    <div className="flex justify-center">
                        <Image
                            src={tempCard.image}
                            alt="Selected card"
                            width={200}
                            height={360}
                            className="transform -rotate-90"
                            priority
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectCardImage