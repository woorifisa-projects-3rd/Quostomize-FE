'use client'

import { useEffect, useState } from "react";
import FlipCard from '../../../components/card/flip-card'

const MyCardPage = () => {
  const [cardData, setCardData] = useState(null);
  const [error, setError] = useState(null);

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

  const filteredUpperCategories = uniqueBy(cardData.filter(card => card.isActive), "upperCategoryType");
  const filteredLowerCategories = uniqueBy(cardData.filter(card => card.isActive && card.lowerCategoryType), "lowerCategoryType");
  const filteredLotto = uniqueBy(cardData.filter(card => card.isLotto), "isLotto");
  const filteredPayback = uniqueBy(cardData.filter(card => card.isPayback), "isPayback");
  const filteredPieceStock = uniqueBy(cardData.filter(card => card.isPieceStock), "isPieceStock");

  const totalBenefitRate = cardData.filter(card => card.isActive && card.benefitRate).reduce((sum, card) => sum + card.benefitRate, 0);

  return (
    <div>
      <h1>나의 카드</h1>
      <div>
        {cardColor !== null ? (
          <div className="">
            <FlipCard
              frontImg={`/cards-images/${cardColor.toString()}f.png`}
              backImg={`/cards-images/${cardColor.toString()}b.png`}
            />
          </div>
        ) : (
          <div>카드 색상이 없습니다.</div>
        )}
      </div>

      <div>
        <span>총 혜택률: {totalBenefitRate}</span>

        {filteredUpperCategories.map((card, index) => (
          <div key={`upper-${index}`}>
            <div>상위 분류: {card.upperCategoryType}</div>
          </div>
        ))}

        {filteredLowerCategories.map((card, index) => (
          <div key={`lower-${index}`}>
            <div>하위 분류: {card.lowerCategoryType}</div>
          </div>
        ))}

        {cardData
          .filter(card => card.isActive && card.franchiseName)
          .map((card, index) => (
            <div key={`franchise-${index}`}>
              <div>가맹점: {card.franchiseName}</div>
            </div>
          ))}

        {filteredLotto.map((card, index) => (
          <div key={`lotto-${index}`}>
            <div>로또: {card.isLotto ? "true" : "false"}</div>
          </div>
        ))}

        {filteredPayback.map((card, index) => (
          <div key={`payback-${index}`}>
            <div>페이백: {card.isPayback ? "true" : "false"}</div>
          </div>
        ))}

        {filteredPieceStock.map((card, index) => (
          <div key={`stock-${index}`}>
            <div>조각투자: {card.isPieceStock ? "true" : "false"}</div>
          </div>
        ))}
      </div>
    </div >
  );
}

export default MyCardPage;