"use client";

import React from 'react'
import TabContentBox from '../box/tab-content-box';


function PointUsageBody() {

    const tabData = [
        {
            title: "조각투자",
            subtitle: "사용할수록 늘어나는 주식",
            content: [
                {
                    text: "내가 선택한 종목, 자주 이용하는 브랜드의 주식을",
                    description: "우리투자증권 계좌 개설 필요해요"
                },
                {
                    text: "매일 00시, 자동으로 일괄 매수하여 손쉽게 투자해요",
                    description: "투자는 신중하게 결정하세요"
                }
            ]
        },
        {
            title: "일일복권",
            subtitle: "매일매일 당첨의 기회",
            content: [
                {
                    text: "매일 참여 가능한 복권",
                    description: "하루 1회 참여 가능합니다"
                },
                {
                    text: "당첨금은 현금으로 지급",
                    description: "영업일 기준 3일 이내 지급"
                }
            ]
        },
        {
            title: "페이백",
            subtitle: "결제할 때마다 돌려받는 혜택",
            content: [
                {
                    text: "결제 금액의 일부를 페이백",
                    description: "최대 3%까지 적립"
                },
                {
                    text: "적립된 금액은 즉시 사용 가능",
                    description: "최소 1,000원부터 사용 가능"
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