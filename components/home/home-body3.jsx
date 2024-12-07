"use client";

import MyFullButton from '../button/full-button'
import BenefitBox from '../box/benefit-box'
import FadeInSection from "../fade-in/fade-in-section";
import Icons from '../../public/icons/icons'


const HomeBody3 = () => {
    const benefits = [
        {
            icon: Icons.shoppoing,
            category: "쇼핑",
            description: "나만의 스타일을 온오프라인에서"
        },
        {
            icon: Icons.life,
            category: "생활",
            description: "어디서나 이동하고 부담없이 연락할 수 있는"
        },
        {
            icon: Icons.food,
            category: "푸드",
            description: "맛있는 선택과 함께하는"
        },
        {
            icon: Icons.travel,
            category: "여행",
            description: "떠나고 싶은 순간, 나에게 딱 맞는"
        },
        {
            icon: Icons.culture,
            category: "문화",
            description: "취향을 담은 여가생활을 지원하는"
        }
    ];

    return (
        <div className='flex flex-col justify-center items-center mt-32'>
            <FadeInSection>
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='font4 font-semibold'>내 라이프스타일에 맞춰</h1>
                    <h1 className='font4 color1 font-semibold'>내가 정하는 혜택</h1>

                </div>
            </FadeInSection>
            <FadeInSection>
                <div className="flex flex-col justify-center items-center space-y-5 mt-14 mb-10 w-full">
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