'use client'

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import FlipCard from '../../../components/card/flip-card'
import MyCardHeader from '../../../components/my-card/myCardHeader'
import MyFullButton from "../../../components/button/full-button";
import Icons from "../../../public/icons/icons"
import GradientText from "../../../components/card/gradientText";
import ColorInfo from "../../../components/card/colorInfo";
import PointUsageBox from "../../../components/box/pointUsageBox";
import LoadingSpinner from "../../../components/overlay/loadingSpinner";
import CardNotFoundModal from "../../../components/my-card/CardNotFoundModal"
import { useSession } from "next-auth/react";

const MyCardPage = () => {
  const router = useRouter();
  const [cardData, setCardData] = useState(null);
  const [error, setError] = useState(null);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showNoCardModal, setShowNoCardModal] = useState(false); // 카드가 없는 경우 모달 상태
  const {data:session} = useSession();
  console.log("세션은");
  console.log(session);
  const fetchCardData = async () => {
    setIsLoading(true);
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
      if (data.data && data.data.length > 0) {
        setCardData(data.data);
      } else {
        setShowNoCardModal(true); // 카드가 없으면 모달을 띄우도록 설정
      }
    } catch (error) {
      console.error('Error - 카드 혜택 불러오기: ', error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLotto = async (cardSequenceId, pointUsageTypeId, currentValue) => {
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

  const handlePayback = async (cardSequenceId, pointUsageTypeId, currentValue) => {
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

  const handleStock = async (cardSequenceId, pointUsageTypeId, currentValue) => {
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
    if (cardData && cardData.length > 0) {
      setCurrentColorIndex(cardData[0].cardColor - 1);
    }
  }, [cardData]);

  if (error) {
    return <div>에러가 발생했습니다: {error}</div>;
  }

  if (showNoCardModal) {
    return (
      <CardNotFoundModal
        isOpen={showNoCardModal}
        onClose={() => {
          setShowNoCardModal(false);
          router.push('/home');
        }}
      />
    );
  }

  if (isLoading || !cardData || cardData.length === 0) {
    return <LoadingSpinner />;
  }

  const uniqueBy = (array, key) => {
    const seen = new Set();
    return array.filter(item => {
      const value = item[key];
      if (seen.has(value)) return false;
      seen.add(value);
      return true;
    })
  }
  const filteredCardColor = cardData && cardData.length > 0
    ? uniqueBy(cardData.filter(card => card.cardColor), "cardColor") : [];
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

          <div className="flex gap-4 -mt-16 justify-around">
            <p className="font3 font-bold mb-6">현재 적용된 혜택률{' '}
              <span className="font6">
                <GradientText text={totalBenefitRate}
                  style={ColorInfo[currentColorIndex].style} />
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
        <div className="mb-20 flex w-full justify-center">
          <MyFullButton href={"/benefit-change"} children={"혜택 새로 고르기"} />
        </div>
        <div className="px-6 w-full mb-20">
          <p className="font3 font-bold mb-2 text-center">내 포인트 사용처</p>
          <p className="text-center mb-1"> 포인트 사용처를 자유롭게 켜고 끌 수 있어요</p>
          <p className="text-center text-gray-500 mb-6 text-xs">조각 투자, 페이백은 동시에 선택할 수 없어요!<br />최소 한 가지 이상의 사용처를 선택하세요! </p>
          <div className="flex flex-col space-y-4">
            {lottoBox && (
              <PointUsageBox
                title={"일일복권"}
                icon={Icons.lotto}
                isEnabled={lottoBox.isLotto}
                onClick={() =>
                  handleLotto(
                    lottoBox.cardSequenceId,
                    lottoBox.pointUsageTypeId,
                    lottoBox.isLotto
                  )
                }
                isLoading={isLoading}
              />
            )}
            {stockBox && (
              <PointUsageBox
                title={"조각투자"}
                icon={Icons.stockpiece}
                isEnabled={stockBox.isPieceStock}
                onClick={() =>
                  handleStock(
                    stockBox.cardSequenceId,
                    stockBox.pointUsageTypeId,
                    stockBox.isPieceStock
                  )
                }
                isLoading={isLoading}
              />
            )}
            {paybackBox && (
              <PointUsageBox
                title={"페이백"}
                icon={Icons.payback}
                isEnabled={paybackBox.isPayback}
                onClick={() => handlePayback(
                  paybackBox.cardSequenceId,
                  paybackBox.pointUsageTypeId,
                  paybackBox.isPayback
                )}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>
      </div>
    </div >
  );
}

export default MyCardPage;