import BrandBox from '../box/brand-box';
import 'material-icons/iconfont/material-icons.css';
import Franchises from '../../public/franchises/franchises'

const BenefitDetailsBody2 = () => {
    const brands = [
        {
            icons: [Franchises.hd, Franchises.musinsa, Franchises.ably, Franchises.emart, Franchises.group3],
            category: '쇼핑',
            descriptions: [
                '백화점 - 더현대, 신세계, 롯데백화점',
                '온라인 쇼핑 - 무신사, 에이블리',
                '마트 - 이마트, 홈플러스',
            ],
        },
        {
            icons: [Franchises.sk, Franchises.gs, Franchises.kt, Franchises.kakaotaxi, Franchises.group4],
            category: '생활',
            descriptions: [
                '주유소 - SK, GS칼텍스',
                '통신 - SKT, KT, LGU+',
                '대중교통 - 버스, 지하철, 택시',
            ],
        },
        {
            icons: [Franchises.cu, Franchises.starbucks, Franchises.twosomeplace, Franchises.baemin, Franchises.group2],
            category: '푸드',
            descriptions: [
                '편의점 - CU, GS25',
                '카페 - 스타벅스, 투썸플레이스',
                '배달 - 배달의 민족, 쿠팡이츠',
            ],
        },
        {
            icons: [Franchises.interparktour, Franchises.socar, Franchises.yanolja, Franchises.airbnb,Franchises.group2],
            category: '여행',
            descriptions: [
                '투어 - 인터파크투어, 마이리얼트립',
                '렌트 - 쏘카, 그린카',
                '숙소 - 야놀자, 에어비앤비',
            ],
        },
        {
            icons: [Franchises.netflix, Franchises.tving, Franchises.lotte, Franchises.millie, Franchises.group2],
            category: '문화',
            descriptions: [
                'OTT - 넷플릭스, 티빙',
                '영화 - CGV, 롯데시네마',
                '도서 - 밀리의 서재, 교보문고',
            ],
        },
    ];

    return (
        <div className="mt-24">
            <h1 className="font4 font-bold mb-2">혜택 받는 가맹점</h1>
            <p className="mb-10 font1">가맹점 카테고리를 선택하고 1% 추가 적립 받으세요</p>
            {brands.map((brand, index) => (
                <BrandBox
                    key={index}
                    icons={brand.icons}
                    category={brand.category}
                    descriptions={brand.descriptions}
                />
            ))}
        </div>
    );
};

export default BenefitDetailsBody2;