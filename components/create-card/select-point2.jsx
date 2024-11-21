"use client"

import React, { useState } from 'react'
import SelectPointUsageBox from '../box/select-point-usage-box'
import Icons from '../../public/icons/icons'

function SelectPoint2() {
    const [activeIndex, setActiveIndex] = useState(-1)
    const [hoveredIndex, setHoveredIndex] = useState(-1)

    const selectoptions = [
        {
            title: '일일 복권',
            description: '매일 자정 추첨을 통해 당첨자에게 1만 포인트를 드립니다.',
            icon: Icons.lotto
        },
        {
            title: '조각 투자',
            description: '설정해 놓은 선호 주식을 조각투자로 매수합니다.',
            icon: Icons.stockpiece
        },
        {
            title: '페이백',
            description: '매 카드 결제일에 페이백을 진행합니다. (단, 현금화 비율은 80 %) ',
            icon: Icons.payback
        }
    ]

    const handleBoxClick = (index) => {
        setActiveIndex(index === activeIndex ? -1 : index)
    }

    const handleBoxHover = (index) => {
        setHoveredIndex(index)
    }

    return (
        <div className="flex flex-col justify-center w-full p-6">
            {selectoptions.map((option, index) => (
                <SelectPointUsageBox
                    key={index}
                    title={option.title}
                    description={option.description}
                    icon={option.icon}
                    isActive={index === activeIndex}
                    isHovered={index === hoveredIndex}
                    onBoxClick={() => handleBoxClick(index)}
                    onBoxHover={() => handleBoxHover(index)}
                />
            ))}
        </div>
    )
}

export default SelectPoint2