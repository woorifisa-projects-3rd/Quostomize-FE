'use client'

import { useEffect, useState } from "react";
import FlipCard from '../../../components/card/flip-card'
import MyCardHeader from '../../../components/my-card/myCardHeader'
import MyToggle from '../../../components/button/toggleButton'
import MyFullButton from "../../../components/button/full-button";
import Icons from "../../../public/icons/icons"
import GradientText from "../../../components/card/gradientText";
import ColorInfo from "../../../components/card/colorInfo";

const MyCardPage = () => {
  const [cardData, setCardData] = useState(null);
  const [error, setError] = useState(null);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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

    } catch (error) {
      console.error('Error - 카드 혜택 불러오기: ', error.message);
      setError(error.message);
    }
  };

  const handleLottoToggle = async (cardSequenceId, pointUsageTypeId, currentValue) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await fetch(`/api/my-card/lotto?cardSequenceId=${cardSequenceId}`, {
        method: 'PATCH',
        cache: "no-store",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          pointUsageTypeId: pointUsageTypeId,
          cardSequenceId: cardSequenceId,
          isLotto: !currentValue
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '서버 오류 발생');
      }

      await fetchCardData();
    } catch (error) {
      console.error('Error updating lotto status: ', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaybackToggle = async (cardSequenceId, pointUsageTypeId, currentValue) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/my-card/payback?cardSequenceId=${cardSequenceId}`, {
        method: 'PATCH',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          pointUsageTypeId: pointUsageTypeId,
          cardSequenceId: cardSequenceId,
          isPayback: !currentValue
        })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '서버 오류 발생');
      }
      await fetchCardData();
    } catch (error) {
      console.error('Error updating payback status: ', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStockToggle = async (cardSequenceId, pointUsageTypeId, currentValue) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/my-card/piece-stock?cardSequenceId=${cardSequenceId}`, {
        method: 'PATCH',
        cache: "no-store",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          pointUsageTypeId: pointUsageTypeId,
          cardSequenceId: cardSequenceId,
          isPieceStock: !currentValue
        })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '서버 오류 발생');
      }
      await fetchCardData();
    } catch (error) {
      console.error('Error updating stock status: ', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
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
              <div className="-mt-10 flex flex-col items-center">
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
            <p className="font3 font-bold mb-6">현재 적용된 혜택률{' '}
              <span>
                <GradientText text={totalBenefitRate}
                style={ColorInfo[currentColorIndex].style}/>
                </span>%</p>
          </div>
          <div>
            {filteredUpperCategories.length > 0 ? (
              <div className="flex justify-around gap-2">
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
          <MyFullButton href={"/benefit-change"} children={"혜택 새로 고르기"} />

        </div>

        <div>
          <div className="border-b border-gray-500/60 mb-20"></div>
          <p className="font3 font-bold mb-2 text-center">내 포인트 사용처</p>
          <p className="text-center mb-14"> 포인트 사용처를 자유롭게 켜고 끌 수 있어요</p>
          <div className="flex gap-10">
            {lottoBox && (
              <div
                  className={`rounded-lg shadow-lg ${lottoBox.isLotto ? "bg-blue-100" : "bg-white"}
                  ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <div className="space-y-4 p-4 m-2 w-24 h-42 flex flex-col items-center justify-center">
                  <div className="font-bold">일일복권</div>
                  <div><img src={Icons.lotto} alt="일일복권 아이콘" /></div>
                  <MyToggle isEnabled={lottoBox.isLotto}
                            onToggle={() => handleLottoToggle(
                                lottoBox.cardSequenceId,
                                lottoBox.pointUsageTypeId,
                                lottoBox.isLotto
                            )}
                            disabled={isLoading}
                  />
                </div>
              </div>
            )}

            {stockBox && (
                <div
                    className={`rounded-lg shadow-lg ${stockBox.isPieceStock ? "bg-blue-100" : "bg-white"}
                  ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <div className="space-y-4 p-4 m-2 w-24 h-42 flex flex-col items-center justify-center">
                    <div className="font-bold">조각투자</div>
                    <div><img src={Icons.stockpiece} alt="조각투자 아이콘" /></div>
                    <MyToggle isEnabled={stockBox.isPieceStock}
                              onToggle={() => handleStockToggle(
                                  stockBox.cardSequenceId,
                                  stockBox.pointUsageTypeId,
                                  stockBox.isPieceStock
                              )}
                              disabled={isLoading}
                    />
                  </div>
                </div>
            )}

            {paybackBox && (
              <div
                className={`rounded-lg shadow-lg ${paybackBox.isPayback ? "bg-blue-100" : "bg-white"}
                ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <div className="space-y-4 p-4 m-2 w-24 h-42 flex flex-col items-center justify-center">
                  <div className="font-bold">페이백</div>
                  <div><img src={Icons.payback} alt="페이백 아이콘" /></div>
                  <MyToggle
                      isEnabled={paybackBox.isPayback}
                      onToggle={() => handlePaybackToggle(
                          paybackBox.cardSequenceId,
                          paybackBox.pointUsageTypeId,
                          paybackBox.isPayback
                      )}
                      disabled={isLoading}
                  />
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