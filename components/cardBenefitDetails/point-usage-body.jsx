"use client";

import React from 'react'
import TabContentBox from '../box/tab-content-box';


function PointUsageBody() {

    const tabData = [
        {
            title: "조각투자",
            subtitle: "천원으로 시작하는 조각투자,\n적립한 포인트로 손쉽게 투자하기",
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
            subtitle: "매일 1000배 기회,\n적립한 포인트로 복권 도전하기",
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
            subtitle: "쓸수록 점점 더 커지는 페이백 혜택",
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

        <div className='flex flex-col justify-center items-center p-4 w-full'>
            <TabContentBox tabs={tabData} />
        </div>
    )
}

export default PointUsageBody