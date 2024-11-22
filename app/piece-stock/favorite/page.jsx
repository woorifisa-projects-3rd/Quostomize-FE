'use client'

import { useState } from "react";
import FavoriteHeader from "../../../components/piece-stock/favorite/header"
import FavoriteBody from "../../../components/piece-stock/favorite/body"
import FavoriteBottom from "../../../components/piece-stock/favorite/bottom"
import { useSession } from "next-auth/react";

const FavoritePage = () => {
  const [orderInfo, setOrderInfo] = useState([])
  const [wishInfo, setWishInfo] = useState([]); // 조회한 위쉬 정보를 저장
  const { data: session, status } = useSession();

  const cardId = 2

  return (
    <>
      <ul className="my-7 flex flex-col h-full">
        {/* header - 검색버튼 밑 제목 */}
        <FavoriteHeader />
        {/* 주식 와치리스트*/}
        <FavoriteBody cardId={cardId} setOrderInfo={setOrderInfo} setWishInfo={setWishInfo} wishInfo={wishInfo} session={session} status={status} />
        {/* 항목 추천 조회 및 순서변경 조회 */}
        <FavoriteBottom cardId={cardId} orderInfo={orderInfo} wishInfo={wishInfo} session={session} status={status} />
      </ul>
    </>
  )
}
export default FavoritePage;