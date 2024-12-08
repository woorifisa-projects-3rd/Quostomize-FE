'use client'

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import FlipCard from '../../../components/card/flip-card'
import MyCardHeader from '../../../components/my-card/myCardHeader'
import MyFullButton from "../../../components/button/full-button";
import Icons from "../../../public/icons/icons"
import GradientText from "../../../components/card/gradientText";
import ColorInfo from "../../../components/card/colorInfo";
import LoadingSpinner from "../../../components/overlay/loadingSpinner";
import CardNotFoundModal from "../../../components/my-card/CardNotFoundModal"
import SelectPointUsageBox from "../../../components/box/select-point-usage-box";


const MyCardPage = () => {
  const router = useRouter();
  const [cardData, setCardData] = useState(null);
  const [error, setError] = useState(null);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showNoCardModal, setShowNoCardModal] = useState(false); // 카드가 없는 경우 모달 상태
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeOptions, setActiveOptions] = useState(['일일 복권']);
  const [isPaybackLoading, setIsPaybackLoading] = useState(false);
  const [isPieceInvestLoading, setIsPieceInvestLoading] = useState(false);

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

  const handleBoxClick = async (index) => {
    const selectedOption = selectoptions[index].title;

    if (selectedOption === '페이백' || selectedOption === '조각 투자') {
      // 페이백과 조각 투자에 대한 로딩 상태를 별도로 처리
      const isLoadingSetter = selectedOption === '페이백' ? setIsPaybackLoading : setIsPieceInvestLoading;
      const currentLoadingState = selectedOption === '페이백' ? isPaybackLoading : isPieceInvestLoading;

      if (currentLoadingState) return;  // 이미 로딩 중이면 클릭 무시
      isLoadingSetter(true);  // 로딩 시작

      try {
        if (activeOptions.includes(selectedOption)) {
          // 이미 선택된 옵션을 다시 클릭하면 해제
          setActiveOptions(activeOptions.filter(option => option !== selectedOption));

          const pointUsageTypeId = selectedOption === '페이백' ? 1 : 2;
          const cardSequenceId = 123; // 실제 값으로 바꿔야 함

          const response = await fetch(`/api/my-card/piece-stock?cardSequenceId=${cardSequenceId}`, {
            method: 'PATCH',
            cache: 'no-store',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
              pointUsageTypeId: pointUsageTypeId,
              cardSequenceId: cardSequenceId,
              isPieceStock: true,
            })
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || '서버 오류 발생');
          }
          await fetchCardData();
        } else {
          // 페이백과 조각 투자 중 하나만 선택할 수 있도록 설정
          setActiveOptions([selectedOption]);

          const pointUsageTypeId = selectedOption === '페이백' ? 1 : 2;
          const cardSequenceId = 123;

          const response = await fetch(`/api/my-card/piece-stock?cardSequenceId=${cardSequenceId}`, {
            method: 'PATCH',
            cache: 'no-store',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
              pointUsageTypeId: pointUsageTypeId,
              cardSequenceId: cardSequenceId,
              isPieceStock: false,
            })
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || '서버 오류 발생');
          }
          await fetchCardData();
        }
      } catch (error) {
        console.error('Error updating stock status: ', error);
        setError(error.message);
      } finally {
        isLoadingSetter(false);  // 로딩 종료
      }
    } else if (selectedOption === '일일 복권') {
      // 일일 복권은 다른 항목에 영향을 미치지 않음
      if (activeOptions.includes(selectedOption)) {
        setActiveOptions(activeOptions.filter(option => option !== selectedOption));
      } else {
        setActiveOptions([...activeOptions, selectedOption]);
      }
    } else {
      // 일일 복권 외 다른 항목에 대해 처리
      if (activeOptions.includes(selectedOption)) {
        setActiveOptions(activeOptions.filter(option => option !== selectedOption));
      } else {
        setActiveOptions([...activeOptions, selectedOption]);
      }
    }
  };

  const selectoptions = [
    {
      title: '일일 복권',
      description: '매일 자정 추첨을 통해 당첨자에게 1만 포인트를 드립니다.',
      icon: Icons.lotto
    },
    {
      title: '조각 투자',
      description: '설정해 놓은 선호 주식을 조각투자로 매수합니다.',
      icon: Icons.stockpiece
    },
    {
      title: '페이백',
      description: '매 카드 결제일에 페이백을 진행합니다. (단, 현금화 비율은 80 %)',
      icon: Icons.payback
    }
  ]

  const handleBoxHover = (index) => {
    setHoveredIndex(index);
  }

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
            <p className="font3 font-bold mb-6">현재 적용된 혜택률
              <span className="ml-4 mr-1 font6">
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
        <div className="mb-20 flex">
          <MyFullButton href={"/benefit-change"} children={"혜택 새로 고르기"} />

        </div>

        <div>
          <div className="border-b border-gray-500/60 mb-20"></div>
          <p className="font3 font-bold mb-2 text-center">내 포인트 사용처</p>
          <p className="text-center mb-14"> 포인트 사용처를 자유롭게 켜고 끌 수 있어요</p>
          <div className="flex flex-col justify-center w-full px-5 space-y-3">
            <p className="font1 font-bold mt-2 ml-2">기본 옵션</p>
            {selectoptions.map((option, index) => (
              <React.Fragment key={index}>
                <SelectPointUsageBox
                  title={option.title}
                  description={option.description}
                  icon={option.icon}
                  isActive={activeOptions.includes(option.title)}
                  isHovered={index === hoveredIndex}
                  onBoxClick={() => handleBoxClick(index)}
                  onBoxHover={() => handleBoxHover(index)}
                />
                {index === 0 && (
                  <>
                    <div className="flex flex-col justify-center">
                      <hr style={{ width: '100%', border: '1px solid #ccc' }} />
                      <p className="font1 font-bold mt-2 ml-2">선택 옵션</p>
                      <p className="ml-3 text-xs text-gray-500"> 기본 옵션 외에 둘 중 한 가지의 옵션을 추가로 선택 할 수 있어요!</p>
                    </div>
                  </>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div >
    </div >
  );
}

export default MyCardPage;
