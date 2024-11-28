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
        const selectedOption = selectoptions[index].title;

        // 페이백과 조각 투자 항목 선택 시 오류 메시지
        if (
            (selectedOption === '페이백' && activeOptions.includes('조각 투자')) ||
            (selectedOption === '조각 투자' && activeOptions.includes('페이백'))
        ) {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);

            // 페이백과 조각 투자 둘 중 하나만 선택되게 하기
            if (selectedOption === '페이백') {
                // '페이백'만 활성화하고 '조각 투자'는 비활성화
                setActiveOptions(['페이백', ...activeOptions.filter(option => option !== '조각 투자')]);
            } else if (selectedOption === '조각 투자') {
                // '조각 투자'만 활성화하고 '페이백'은 비활성화
                setActiveOptions(['조각 투자', ...activeOptions.filter(option => option !== '페이백')]);
            }
            return;
        }

        // '일일 복권'은 독립적으로 작동하게 하기
        if (selectedOption === '일일 복권') {
            // 일일 복권을 선택하거나 해제할 때는 다른 항목에 영향을 주지 않도록 처리
            if (activeOptions.includes('일일 복권')) {
                setActiveOptions(activeOptions.filter(option => option !== '일일 복권'));
            } else {
                setActiveOptions([...activeOptions, '일일 복권']);
            }
        } else {
            // 페이백과 조각 투자 외의 항목에 대해서만 기존 로직 적용
            if (activeOptions.includes(selectedOption)) {
                setActiveOptions(activeOptions.filter(option => option !== selectedOption));
            } else {
                setActiveOptions([...activeOptions, selectedOption]);
            }
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
