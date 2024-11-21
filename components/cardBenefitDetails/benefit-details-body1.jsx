import TabContentBox from "../box/tab-content-box"


const BenefitDetailsBody1 = () => {

    const tabData = [
        {
            title: "쇼핑",
            subtitle: "쇼핑도 즐기고, 포인트도 챙기고\n 합리적인 혜택받기",
            content: [
                {
                    text: "백화점, 온라인 쇼핑, 마트에서",
                    description: ""
                },
                {
                    text: "매달 최대 4% 적립 또는 10,000 포인트 적립해요",
                    description: "백화점, 온라인 쇼핑, 마트 중 1개 카테고리 선택 시 최대 4% 적립\n(매달 최대 10,000 포인트 제한)"
                }
            ]
        },
        {
            title: "생활",
            subtitle: "제약없이 이동하고, 부담없이 연락하고\n일상생활에서 혜택받기",
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
            subtitle: "맛있게 먹고, 편리하게 주문하고\n푸드에서 혜택받기",
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
            subtitle: "여유럽게 떠나고, 알뜰하게 묵고\n여행에서 혜택받기",
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
            subtitle: "보고, 듣고, 읽는 모든 순간\n즐겁게 혜택받기",
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
        <div className="flex flex-col justify-center items-center p-4 w-full mt-10">
            <TabContentBox tabs={tabData} />
        </div>
    )
}

export default BenefitDetailsBody1