'use client'

import HomeHeader from "../../../../components/piece-stock/home/header"
import HomeBody from "../../../../components/piece-stock/home/body"
import Search from "../../../../components/piece-stock/home/search"
import { cardIdInfo } from "../../../../components/piece-stock/home/apiMethod/apiList"
import { useEffect, useState } from "react";

import LoadingSpinner from "../../../../components/overlay/loadingSpinner"
import { useSession } from "next-auth/react"
import ForbiddenModal from "../../../../components/overlay/forbiddenModal"

const PieceStockHome = () => {
  const {data: session} = useSession();
  const [wishInfo, setWishInfo] = useState([])
  const [value, setValue] = useState("")
  const [data, setData] = useState()
  const [page, setPage] = useState([true, false, false])
  const [cardData, setCardData] = useState([])
  const [isLoading, setLoading] = useState(true);
  const [isForbidden, setForbidden] = useState(200);
  useEffect(() => {
    if (!session) {
      setForbidden(401)
      return;
    }
    cardIdInfo(setData, setForbidden);
  }, [])

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  },[data])


  if (isForbidden == 401) {
    return <ForbiddenModal title="로그인 필요" description="잠시 후 로그인 페이지로 이동합니다." goal="login" />
  }

  if (isForbidden == 403) {
    return <ForbiddenModal title="로그인 필요" description="잠시 후 로그인 페이지로 이동합니다." goal="login" />
  }



  return (
    <>
      <div>
        {page[2] === false && <HomeHeader data={data} setValue={setValue} value={value} setPage={setPage} />}
        {page[2] === false && <HomeBody data={data} page={page} setPage={setPage} cardData={cardData} setCardData={setCardData} wishInfo={wishInfo} setWishInfo={setWishInfo} setForbidden={setForbidden}/>}
        {page[2] === true && <Search cardData={cardData} setCardData={setCardData} value={value} setValue={setValue} setPage={setPage} wishInfo={wishInfo} setWishInfo={setWishInfo} setForbidden={setForbidden}/>}
      </div>
      { isLoading && <LoadingSpinner />}
    </>
  );
};
export default PieceStockHome;