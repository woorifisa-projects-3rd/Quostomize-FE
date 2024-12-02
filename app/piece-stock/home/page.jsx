'use client'

import HomeHeader from "../../../components/piece-stock/home/header"
import HomeBody from "../../../components/piece-stock/home/body"
import Search from "../../../components/piece-stock/home/search"
import {cardIdInfo} from "../../../components/piece-stock/home/apiMethod/apiList"
import { useEffect, useState } from "react";


const PieceStockHome = () => {
  const [wishInfo, setWishInfo] = useState([])
  const [value, setValue] = useState("")
  const [data, setData] = useState()
  const [page, setPage] =useState([true, false, false])
  const [cardData , setCardData] = useState([])

  useEffect(()=>{
    cardIdInfo(setData)
  },[])

  return (
    <div className="p-4 h-screen overflow-y-auto">
      {page[2] === false && <HomeHeader data={data} setValue={setValue} value={value} setPage={setPage}/>}
      {page[2] === false && <HomeBody data={data} page={page} setPage={setPage} cardData={cardData} setCardData={setCardData} wishInfo={wishInfo} setWishInfo={setWishInfo}/>}
      {page[2] === true && <Search cardData={cardData} setCardData={setCardData} value={value} setValue={setValue} setPage={setPage} wishInfo={wishInfo} setWishInfo={setWishInfo}/>}
    </div>
  );
};
export default PieceStockHome;