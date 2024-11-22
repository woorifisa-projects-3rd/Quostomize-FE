"use client";

import NoticeToggleBox from '../box/noitce-toggle-box';
import PointBox from '../box/point-notice-box';
import HomeFoot from '../home/home-foot';
import FadeInSection from "../fade-in/fade-in-section";
import 'material-icons/iconfont/material-icons.css';

const HomeBody4 = () => {
    const points = [
        {
            icon: "insights",  // 조각투자 아이콘
            title: "조각 투자"
        },
        {
            icon: "attach_money",  // 페이백 아이콘
            title: "페이백"
        },
        {
            icon: "star",  // 일일 복권 아이콘
            title: "일일 복권"
        }
    ];

    const notices = [
        {
            title: "상품 안내",
            content: ["발급대상: 우리은행 계좌를 갖고 있는 19세 이상 고객", "연회비: 없음", "발급수수료: 2,000원", "상품안내서/개인회원 약관 확인"]
        },
        {
            title: "온라인 결제 안내",
            content: ["결제 관련 안내사항입니다.", "결제 시 주의사항입니다."]
        },
        {
            title: "거래 안내",
            content: [
                "교통카드 이용 안내",
                "후불 교통 이용금액은 전월 1일부터 말일까지 발생하여 이용한 누적금액이 매월 10일(카드결제일 경우 익일)자에 카드로 결제 계좌에서 자동 출금됩니다. 해당 출금 되지 않은 경우 자동충전이 가능할 때까지 일시 중지될 수 있습니다.",
                "교통카드 이용대금 연체 시 연체료가 부과됩니다.(연체이율 연 9% 적용)"
            ]
        }
    ];

    return (

        <div className='flex flex-col justify-center items-center mt-32'>
            <FadeInSection>
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='font4 font-semibold'>혜택은 다양하게</h1>
                    <h1 className='font4 color1 font-semibold'>사용은 재미있게</h1>

                    <div className="gap-8 grid grid-cols-3 mt-24">
                        {points.map((point, index) => (
                            <PointBox
                                key={index}
                                icon={point.icon}
                                title={point.title}
                            />
                        ))}
                    </div>
                </div>
            </FadeInSection>

            <div className='mt-32'>
                <HomeFoot />
            </div>

            <FadeInSection>
                <div className="p-4 w-full space-y-2 mt-20">
                    {notices.map((notice, index) => (
                        <NoticeToggleBox
                            key={index}
                            title={notice.title}
                            content={notice.content}
                        />
                    ))}
                </div>
            </FadeInSection >
        </div >
    );
}

export default HomeBody4;
