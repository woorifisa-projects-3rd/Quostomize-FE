"use client";

import MyFullButton from '../button/full-button'
import BenefitBox from '../box/benefit-box'
import FadeInSection from "../fade-in/fade-in-section";
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
            <FadeInSection>
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-4xl font-semibold'>내 라이프스타일에 맞춰</h1>
                    <h1 className='text-4xl font-semibold mt-2' style={{ color: "#0083CA" }}>내가 정하는 혜택</h1>

                </div>
            </FadeInSection>
            <FadeInSection>
                <div className="px-16 space-y-5 mt-14 mb-10 w-full">
                    {benefits.map((benefit, index) => (
                        <BenefitBox
                            key={index}
                            icon={benefit.icon}
                            category={benefit.category}
                            description={benefit.description}
                        />
                    ))}
                </div>
            </FadeInSection>
            <FadeInSection>
                <div className='flex flex-col justify-center items-center'>
                    <MyFullButton href='/card-benefit-details'>혜택 더보기</MyFullButton>
                </div>
            </FadeInSection>
        </div >

    );
}

export default HomeBody3;