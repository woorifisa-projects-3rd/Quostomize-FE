"use client";

import HomeFoot from './HomeFoot';
import FadeInSection from "../fade-in/fade-in-section";
import TabContentBox from "../../components/box/tab-content-box";
import Icons from "../../public/icons/icons"

const HomeBody4 = () => {
    const tabData = [
        {
            title: "투자",
            subtitle: "투자",
            icon: Icons.stockpiece,
            content: [
                {
                    text: "내가 선택한 종목이나 추천 종목을",
                    description: "추천 종목 - 카드 혜택과 우량주로 이루어진 포트폴리오"
                },
                {
                    text: "매일 자정, 자동 매수되어 편리하게 투자할 수 있어요",
                    description: "우리투자증권 계좌가 필요해요"
                }
            ]
        },
        {
            title: "일일복권",
            subtitle: "일일복권",
            icon: Icons.lotto,
            content: [
                {
                    text: "1일 1회 참여 가능한 복권",
                    description: ""
                },
                {
                    text: "당첨금은 현금으로 지급돼요",
                    description: "영업일 기준 3일 이내 지급\n(매달 최대 10,000포인트 제한)"
                }
            ]
        },
        {
            title: "페이백",
            subtitle: "페이백",
            icon: Icons.payback,
            content: [
                {
                    text: "결제 금액의 일부를 페이백으로",
                    description: ""
                },
                {
                    text: "적립된 금액은 즉시 사용할 수 있어요",
                    description: "최소 10,000원부터 사용 가능"
                }
            ]
        }
    ];

    return (
        <div className='flex flex-col justify-center items-center mt-60'>
            <FadeInSection>
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='font5 font-semibold'>포인트, 매일 변경</h1>
                    <p className="mt-4 font1 color4">카드 포인트 사용처는 언제든지 바꿀 수 있어요</p>
                    <div className="mt-10">
                        <TabContentBox tabs={tabData} />
                    </div>
                </div>
            </FadeInSection>

            <div className='mt-10 mb-16'>
                <HomeFoot />
            </div>
        </div >
    );
}

export default HomeBody4;
