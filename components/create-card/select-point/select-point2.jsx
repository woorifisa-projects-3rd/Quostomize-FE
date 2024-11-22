'use client'

import React, { useState } from 'react'
import SelectPointUsageBox from '../../box/select-point-usage-box'
import Icons from '../../../public/icons/icons'
import Toast from '../../overlay/toast';

function SelectPoint2() {
    const [activeOptions, setActiveOptions] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [showToast, setShowToast] = useState(false);

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
            description: '매 카드 결제일에 페이백을 진행합니다. (단, 현금화 비율은 80 %)',
            icon: Icons.payback
        }
    ]

    const handleBoxClick = (index) => {
        // 잘못된 선택 (페이백과 조각 투자 선택 시 오류 메시지)
        if (selectoptions[index].title === '페이백' && activeOptions.includes('조각 투자')) {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);  // 3초 후 토스트 사라짐
            return;
        }
        if (selectoptions[index].title === '조각 투자' && activeOptions.includes('페이백')) {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);  // 3초 후 토스트 사라짐
            return;
        }

        // 선택 항목 토글
        if (activeOptions.includes(selectoptions[index].title)) {
            setActiveOptions(activeOptions.filter(option => option !== selectoptions[index].title));
        } else {
            setActiveOptions([...activeOptions, selectoptions[index].title]);
        }
    }

    const handleBoxHover = (index) => {
        setHoveredIndex(index);
    }

    return (
        <div className="flex flex-col justify-center w-full p-5 space-y-5">
            {selectoptions.map((option, index) => (
                <SelectPointUsageBox
                    key={index}
                    title={option.title}
                    description={option.description}
                    icon={option.icon}
                    isActive={activeOptions.includes(option.title)}
                    isHovered={index === hoveredIndex}
                    onBoxClick={() => handleBoxClick(index)}
                    onBoxHover={() => handleBoxHover(index)}
                />
            ))}

            <Toast
                isOpen={showToast}
                message="페이백과 조각 투자 항목은 동시에 선택할 수 없습니다."
            />
        </div>
    )
}

export default SelectPoint2;
