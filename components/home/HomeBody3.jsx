"use client";

import MyFullButton from '../button/full-button'
import FadeInSection from "../fade-in/fade-in-section";
import TabContentBox from "../../components/box/tab-content-box";
import Icons from "../../public/icons/icons"

const HomeBody3 = () => {
    const tabData = [
        {
            title: "쇼핑",
            subtitle: "쇼핑 혜택",
            icon: Icons.shoppoing,
            content: [
                {
                    text: "백화점, 온라인 쇼핑, 마트에서",
                    description: ""
                },
                {
                    text: "매달 최대 4% 적립 또는 10,000 포인트 적립해요",
                    description: "백화점, 온라인쇼핑, 마트 1개 카테고리 선택 시 최대 4% 적립\n(매달 최대 10,000 포인트 제한)"
                }
            ]
        },
        {
            title: "생활",
            subtitle: "생활 혜택",
            icon: Icons.life,
            content: [
                {
                    text: "주유소, 통신, 대중교통에서",
                    description: ""
                },
                {
                    text: "매달 최대 4% 적립 또는 10,000 포인트 적립해요",
                    description: "주유소, 통신, 대중교통 중 1개 카테고리 선택 시 최대 4% 적립\n(매달 최대 10,000 포인트 제한)"
                }
            ]
        },
        {
            title: "푸드",
            subtitle: "푸드 혜택",
            icon: Icons.food,
            content: [
                {
                    text: "편의점, 카페, 배달앱에서",
                    description: ""
                },
                {
                    text: "매달 최대 4% 적립 또는 10,000 포인트 적립해요",
                    description: "편의점, 카페, 배달앱 중 1개 카테고리 선택 시 최대 4% 적립\n(매달 최대 10,000 포인트 제한)"
                }
            ]
        },
        {
            title: "여행",
            subtitle: "여행 혜택",
            icon: Icons.travel,
            content: [
                {
                    text: "투어, 렌트, 숙소에서",
                    description: ""
                },
                {
                    text: "매달 최대 4% 적립 또는 10,000 포인트 적립해요",
                    description: "투어, 렌트, 숙소 중 1개 카테고리 선택 시 최대 4% 적립\n(매달 최대 10,000 포인트 제한)"
                }
            ]
        },
        {
            title: "문화",
            subtitle: "문화 혜택",
            icon: Icons.culture,
            content: [
                {
                    text: "OTT, 영화, 도서에서",
                    description: ""
                },
                {
                    text: "매달 최대 4% 적립 또는 10,000 포인트 적립해요",
                    description: "OTT, 영화, 도서 중 1개 카테고리 선택 시 최대 4% 적립\n(매달 최대 10,000 포인트 제한)"
                }
            ]
        },

    ]

    return (
        <div className='flex w-full flex-col justify-center items-center mt-10'>
            <FadeInSection>
                <div className="flex w-full flex-col justify-center items-center space-y-5 mb-10">
                    <TabContentBox tabs={tabData} />
                </div>
            </FadeInSection>
            <FadeInSection>
                <div className='flex w-full flex-col justify-center items-center'>
                    <MyFullButton href='/card-benefit-details'>혜택 자세히 보기</MyFullButton>
                </div>
            </FadeInSection>
        </div >
    );
}

export default HomeBody3;