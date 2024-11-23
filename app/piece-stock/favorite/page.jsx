'use client'

import { useEffect, useState } from "react";
import FavoriteHeader from "../../../components/piece-stock/favorite/header"
import FavoriteBody from "../../../components/piece-stock/favorite/body"
import FavoriteBottom from "../../../components/piece-stock/favorite/bottom"
import { useSession } from "next-auth/react";

const FavoritePage = () => {
  const [recommendStockInfo, setRecommend] = useState([]);
  const [orderInfo, setOrderInfo] = useState([])
  const [wishInfo, setWishInfo] = useState([]); // 조회한 위쉬 정보를 저장
  const [isClickButton, setClickButton] = useState([false, false, false])
  const [cardData, setCardData] = useState([])
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      searchCardInfo();
    }
  }, [status]);

  useEffect(() => {
    // console.log(cardData[0]?.cardSequenceId)
    // const cardId = cardData[0]?.cardSequenceId

  }, [cardData])
  const cardId = cardData[0]?.cardSequenceId
  // const cardId = 2
  // const cardId = cardData.data.find(item => item.benefitId === 93).cardSequenceId;
  // 백엔드에서 GET 위시리스트 조회시, 위시리스트의 priority, stockName, stockPresentPrice, stockImage 를 갖고온다.
  const searchCardInfo = async () => {
    try {
      const response = await fetch(`http://localhost:8080/v1/api/benefit-change`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',  // 요청 본문이 JSON임을 지정
          'Authorization': `Bearer ${session.accessToken}`, // JWT 토큰을 Authorization 헤더에 포함
        },
      });

      if (!response.ok) {
        throw new Error('값이 조회되지 않았습니다.');
      }
      const data = await response.json(); // 응답을 JSON으로 파싱
      setCardData(data.data);
    } catch (error) {
      console.error('데이터 가져오기 오류:', error);
    }
  }
  return (
    <>
      <ul className="my-7 flex flex-col h-full">
        {/* header - 검색버튼 밑 제목 */}
        <FavoriteHeader />
        {/* 주식 와치리스트*/}
        {cardId !== undefined && <FavoriteBody cardId={cardId} setOrderInfo={setOrderInfo} setWishInfo={setWishInfo} wishInfo={wishInfo} session={session} status={status} cardData={cardData} />}
        {/* 항목 추천 조회 및 순서변경 조회 */}
        {cardId !== undefined && <FavoriteBottom cardId={cardId} orderInfo={orderInfo} wishInfo={wishInfo} session={session} status={status} setRecommend={setRecommend} recommendStockInfo={recommendStockInfo} isClickButton={isClickButton} setClickButton={setClickButton} setWishInfo={setWishInfo} />}
      </ul>
    </>
  )
}
export default FavoritePage;