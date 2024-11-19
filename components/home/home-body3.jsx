"use client";

import MyFullButton from '../button/full-button'
import BenefitBox from '../box/benefit-box'
import 'material-icons/iconfont/material-icons.css';

const HomeBody3 = () => {
    const benefits = [
        {
            icon: "shopping_bag",  // 쇼핑 아이콘
            category: "쇼핑",
            description: "나만의 스타일을 온오프라인에서"
        },
        {
            icon: "card_giftcard",  // 포인트 아이콘
            category: "상품",
            description: "어디서나 이동하고 부담없이 연락할 수 있는"
        },
        {
            icon: "fastfood",  // 음식 아이콘
            category: "푸드",
            description: "맛있는 선택과 함께하는"
        },
        {
            icon: "airplane_ticket",  // 여행 아이콘
            category: "여행",
            description: "떠나고 싶은 순간, 나에게 딱 맞는"
        },
        {
            icon: "movie",  // 문화 아이콘
            category: "문화",
            description: "취향을 담은 여가생활을 지원하는"
        }
    ];

    return (
        <div className='flex flex-col justify-center items-center mt-32'>
            <h1 className='text-2xl font-semibold'>내 라이프스타일에 맞춰</h1>
            <h1 className='text-2xl font-semibold' style={{ color: "#007AFF" }}>내가 정하는 혜택</h1>

            <div className="p-4 space-y-4 mt-5 mb-5">
                {benefits.map((benefit, index) => (
                    <BenefitBox
                        key={index}
                        icon={benefit.icon}
                        category={benefit.category}
                        description={benefit.description}
                    />
                ))}
            </div>

            <MyFullButton href=''>혜택 더보기</MyFullButton>
        </div>
    );
}

export default HomeBody3;