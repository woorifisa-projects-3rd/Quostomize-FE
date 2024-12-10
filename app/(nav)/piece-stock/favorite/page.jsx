'use client'

import { useEffect, useState } from "react";
import FavoriteHeader from "../../../../components/piece-stock/favorite/header"
import FavoriteBody from "../../../../components/piece-stock/favorite/body"
import FavoriteBottom from "../../../../components/piece-stock/favorite/bottom"


const FavoritePage = () => {
  const [recommendStockInfo, setRecommend] = useState([]); //추천종목조회 데이터
  const [orderInfo, setOrderInfo] = useState([]) // 움직인 횟수
  const [wishInfo, setWishInfo] = useState([]); // 조회한 위쉬 정보를 저장
  const [isClickButton, setClickButton] = useState([false, false, false])
  const [cardData, setCardData] = useState([]) // 카드데이터-카드아이디뽑기용
  const [dragOverIndex, setDragOverIndex] = useState(null); // 드래깅 된 위치확인 값

  const cardId = cardData[0]?.cardSequenceId

  // 백엔드에서 GET 위시리스트 조회시, 위시리스트의 priority, stockName, stockPresentPrice, stockImage 를 갖고온다.
  const searchCardInfo = async () => {
    try {
      const response = await fetch(`/api/piece-stock/favorite/searchCardId`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',  // 요청 본문이 JSON임을 지정
        },
      });

      if (!response.ok) {
        throw new Error('값이 조회되지 않았습니다.');
      }
      const data = await response.json(); // 응답을 JSON으로 파싱
      setCardData(data);
    } catch (error) {
      console.error('데이터 가져오기 오류:', error);
    }
  }

  useEffect(() => {
    searchCardInfo();
  }, []);

  return (
    <>
      <ul className="my-7 flex flex-col h-full">
        {/* header - 검색버튼 밑 제목 */}
        <FavoriteHeader />
        {/* 주식 와치리스트*/}
        {cardId !== undefined && <FavoriteBody cardId={cardId} setOrderInfo={setOrderInfo} orderInfo={orderInfo} setWishInfo={setWishInfo} wishInfo={wishInfo} dragOverIndex={dragOverIndex} setDragOverIndex={setDragOverIndex} />}
        {/* 항목 추천 조회 및 순서변경 조회 */}
        {cardId !== undefined && <FavoriteBottom cardId={cardId} orderInfo={orderInfo} wishInfo={wishInfo} setRecommend={setRecommend} recommendStockInfo={recommendStockInfo} isClickButton={isClickButton} setClickButton={setClickButton} setWishInfo={setWishInfo} />}
      </ul>
    </>
  )
}
export default FavoritePage;