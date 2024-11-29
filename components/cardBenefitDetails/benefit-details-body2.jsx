import BrandBox from '../box/brand-box'
import 'material-icons/iconfont/material-icons.css';
import Icons from '../../public/icons/icons'

const BenefitDetailsBody2 = () => {
    const brands = [
        {
            icon: Icons.shoppoing,
            category: '쇼핑',
            descriptions: [
                '백화점 - 더현대, 신세계, 롯데백화점',
                '온라인 쇼핑 - 무신사, 에이블리',
                '마트 - 이마트, 홈플러스'
            ]
        },
        {
            icon: Icons.life,
            category: '생활',
            descriptions: [
                '주유소 - SK, GS칼텍스',
                '통신 - SKT, KT, LGU+',
                '대중교통 - 버스, 지하철, 택시'
            ]
        },
        {
            icon: Icons.food,
            category: '푸드',
            descriptions: [
                '편의점 - CU, GS25',
                '카페 - 스타벅스, 투썸플레이스',
                '배달 - 배달의 민족, 쿠팡이츠'
            ]
        },
        {

            icon: Icons.travel,
            category: '여행',
            descriptions: [
                '투어 - 인터파크투어, 마이리얼트립',
                '렌트 - 쏘카, 그린카',
                '숙소 - 야놀자, 에어비앤비'
            ]
        },
        {
            icon: Icons.culture,
            category: '문화',
            descriptions: [
                'OTT - 넷플릭스, 티빙',
                '영화 - CGV, 롯데시네마',
                '도서 - 밀리의 서재, 교보문고'
            ]
        },
    ];

    return (
        <div className="mt-10">
            <h1 className="font3 font-bold mb-2">혜택 받는 가맹점</h1>
            <p className="mb-10 font1">가맹점 카테고리를 선택하고 1% 추가 적립 받으세요</p>
            {brands.map((brand, index) => (
                <BrandBox
                    key={index}
                    icon={brand.icon}
                    category={brand.category}
                    descriptions={brand.descriptions}
                />
            ))}
        </div>
    );
};

export default BenefitDetailsBody2