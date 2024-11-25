'use client'

import { useEffect, useState } from "react";
import FlipCard from '../../../components/card/flip-card'
import MyCardHeader from '../../../components/my-card/myCardHeader'
import MyToggle from '../../../components/button/toggleButton'
import MyFullButton from "../../../components/button/full-button";
import Icons from "../../../public/icons/icons"

const MyCardPage = () => {
  const [cardData, setCardData] = useState(null);
  const [error, setError] = useState(null);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);


  const fetchCardData = async () => {

    try {
      const response = await fetch('/api/my-card', {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });


      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCardData(data.data);
      console.log(data.data);


    } catch (error) {
      console.error('Error - 카드 혜택 불러오기: ', error.message);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchCardData();
  }, []);

  useEffect(() => {
    if (!cardData) {
      return
    }
    setCurrentColorIndex(cardData[0].cardColor - 1);
  }, [cardData])

  if (error) {
    return <div>에러가 발생했습니다: {error}</div>;
  }

  if (!cardData) {
    return <div>로딩 중</div>;
  }

  // 중복 제거 처리
  const uniqueBy = (array, key) => {
    const seen = new Set();
    return array.filter(item => {
      const value = item[key];
      if (seen.has(value)) return false;
      seen.add(value);
      return true;
    })
  }

  const colorInfo = [
    {
      gradient: 'animate-gradient-purple',
      style: {
        backgroundImage: 'linear-gradient(-45deg, #a855f7, #6366f1, #a855f7, #6366f1)',
      }
    },
    {
      gradient: 'animate-gradient-black',
      style: {
        backgroundImage: 'linear-gradient(-45deg, #5555f7, #536d94, #445063, #000000)',
      }
    },
    {
      gradient: 'animate-gradient-red',
      style: {
        backgroundImage: 'linear-gradient(-45deg, #f7555d, #f17f63, #f75855, #ff0000)',
      }
    },
    {
      gradient: 'animate-gradient-green',
      style: {
        backgroundImage: 'linear-gradient(-45deg, #22c55e, #15803d, #22c55e, #15803d)',
      }
    },
    {
      gradient: 'animate-gradient-milk',
      style: {
        backgroundImage: 'linear-gradient(-45deg, #c0c0c0, #99bbff, #d4d4d4, #99bbff)',
      }
    }
  ];

  const filteredCardColor = uniqueBy(cardData.filter(card => card.cardColor), "cardColor");
  const cardColor = filteredCardColor.length > 0 ? filteredCardColor[0].cardColor : null;

  const totalBenefitRate = Array.from(
    new Map(
      cardData
        .filter(card => card.isActive && card.benefitRate && card.upperCategoryType)
        .map(card => [card.upperCategoryType, card])
    ).values()
  ).reduce((sum, card) => sum + card.benefitRate, 0);


  const filteredUpperCategories = uniqueBy(cardData.filter(card => card.isActive), "upperCategoryType");
  const lottoBox = cardData.find(card => card.isLotto !== undefined);
  const paybackBox = cardData.find(card => card.isPayback !== undefined);
  const stockBox = cardData.find(card => card.isPieceStock !== undefined);

  return (
    <div className="">
      <MyCardHeader />
      <div className="flex flex-col items-center">
        <div>
          <div>
            {cardColor !== null ? (
              < div className="-mt-10 flex flex-col items-center">
                <FlipCard
                  frontImg={`/cards-images/${cardColor.toString()}f.png`}
                  backImg={`/cards-images/${cardColor.toString()}b.png`}
                />
              </div>
            ) : (
              <div>카드 색상이 없습니다.</div>
            )}
          </div>

          <div className="flex gap-4 -mt-8 justify-around">
            <p className="font3 font-bold mb-6">현재 적용된 혜택률
              <span
                className={`text-transparent bg-clip-text animate-gradient-text bg-[length:400%_400%]`}
                style={colorInfo[currentColorIndex].style}
              > {totalBenefitRate}</span>%</p>

            <style jsx global>{`
                @keyframes gradient-text {
                    0% {background-position: 0% 50%;}
                    50% {background-position: 100% 50%;}
                    100% {background-position: 0% 50%;}
                }
                .animate-gradient-text {
                    animation: gradient-text 3s ease infinite;
                }
            `}
            </style>
          </div>
          <div>
            {filteredUpperCategories.length > 0 ? (
              <div className="flex justify-around">
                {filteredUpperCategories.map((card, index) => (
                  <div key={index} className="mb-6">
                    {card.upperCategoryType} {card.benefitRate}%
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm">현재 혜택이 없습니다.</p>
            )}
          </div>

        </div>
        <div className="mb-20 flex">
          <MyFullButton href={"/change-beenfit"} children={"혜택 다시 고르기"} />

        </div>

        <div>
          <div className="border-b border-gray-500/60 mb-20"></div>
          <p className="font3 font-bold mb-2 text-center">내 포인트 사용처</p>
          <p className="text-center mb-14"> 포인트 사용처를 자유롭게 켜고 끌 수 있어요</p>
          <div className="flex gap-10">
            {lottoBox && (
              <div
                className={`rounded-lg shadow-lg ${lottoBox.isLotto ? "bg-blue-100" : "bg-white"
                  }`}
              >                <div className="space-y-4 p-4 m-2 w-24 h-42 flex flex-col items-center justify-center">
                  <div className="font-bold">로또</div>
                  <div><img src={Icons.lotto} alt="로또 아이콘" /></div>
                  <MyToggle isEnabled={lottoBox.isLotto} />
                </div>
              </div>
            )}

            {paybackBox && (
              <div
                className={`rounded-lg shadow-lg ${paybackBox.isPayback ? "bg-blue-100" : "bg-white"
                  }`}
              >
                <div className="space-y-4 p-4 m-2 w-24 h-42 flex flex-col items-center justify-center">
                  <div className="font-bold">페이백</div>
                  <div><img src={Icons.payback} alt="페이백 아이콘" /></div>
                  <MyToggle isEnabled={paybackBox.isPayback} />
                </div>
              </div>
            )}

            {stockBox && (
              <div
                className={`rounded-lg shadow-lg ${stockBox.isPieceStock ? "bg-blue-100" : "bg-white"
                  }`}
              >
                <div className="space-y-4 p-4 m-2 w-24 h-42 flex flex-col items-center justify-center">
                  <div className="font-bold">조각투자</div>
                  <div><img src={Icons.stockpiece} alt="조각투자 아이콘" /></div>
                  <MyToggle isEnabled={stockBox.isPieceStock} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div >
    </div >
  );
}

export default MyCardPage;