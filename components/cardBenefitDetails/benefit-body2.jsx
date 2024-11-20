import BrandBox from '../box/brand-box'
import 'material-icons/iconfont/material-icons.css';

const BenefitDetailsBody2 = () => {
    const brands = [
        {
            iconSrc: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Wrapped%20Gift.png',
            category: '쇼핑',
            descriptions: [
                '백화점(더현대, 신세계, 롯데백화점)',
                '온라인 쇼핑(무신사, 에이블리)',
                '마트(이마트, 홈플러스)'
            ]
        },
        {
            iconSrc: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Automobile.png",
            category: '생활',
            descriptions: [
                '주유소(SK, GS칼텍스)',
                '통신(SKT, KT, LGU+)',
                '대중교통(버스, 지하철, 택시)'
            ]
        },
        {
            iconSrc: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Hamburger.png",
            category: '푸드',
            descriptions: [
                '편의점(CU, GS25)',
                '카페(스타벅스, 투썸플레이스)',
                '배달(배달의 민족, 쿠팡이츠)'
            ]
        },
        {

            iconSrc: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Airplane.png",
            category: '여행',
            descriptions: [
                '투어(인터파크투어, 마이리얼트립)',
                '렌트(쏘카, 그린카)',
                '숙소(야놀자, 에어비앤비)'
            ]
        },
        {
            iconSrc: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Mirror%20Ball.png",
            category: '문화',
            descriptions: [
                'OTT(넷플릭스, 티빙)',
                '영화(CGV, 롯데시네마)',
                '도서(밀리의 서재, 교보문고)'
            ]
        },
    ];

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-2">혜택 적용 브랜드</h1>
            <p className="text-gray-600 mb-6">나만의 브랜드를 선택하면 1% 추가로 적립 받을 수 있어요</p>
            {brands.map((brand, index) => (
                <BrandBox
                    key={index}
                    iconSrc={brand.iconSrc}
                    category={brand.category}
                    descriptions={brand.descriptions}
                />
            ))}
        </div>
    );
};

export default BenefitDetailsBody2