import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Motion from "../../../components/piece-stock/etc/motion"
import InverseMotion from "../../../components/piece-stock/etc/inverseMotion"
import { handleDragStart, handleDragEnd, handleDragOver, handleDrop, handleDeleteClick, deleteCheckBox } from "../../../components/piece-stock/home/component/totalHomeBody"
import { searchCardInfo, switchStock, searchWishStocks } from "../../../components/piece-stock/home/apiMethod/apiList"

const HomeBody = ({ data, page, setPage, cardData, setCardData, wishInfo, setWishInfo }) => {
    const [hoveredIndex, setHoveredIndex] = useState([{ order: 0 }, { order: 0 }, { order: 0 }]); // Hover된 항목의 인덱스를 관리
    const [orderInfo, setOrderInfo] = useState([])
    const [dragOverIndex, setDragOverIndex] = useState(null); // 드래깅 된 위치확인 값

    const param = new URLSearchParams()
    const cardId = cardData[0]?.cardSequenceId

    useEffect(() => {
        searchCardInfo(setCardData)
    }, [])

    useEffect(() => {
        switchStock(orderInfo);
    }, [orderInfo])

    const myStock = data?.output1?.map((stock) => ({
        stockName: stock?.prdtName,
        stockPrice: stock?.prpr,
        stockRate: stock?.evluPflsRt,
        stockNumber: stock?.hldgQty,
        stockImage: stock?.stockImage,
    }));

    return (
        <>
            <div className="p-4 h-screen flex flex-col">
                <div className="flex justify-between">
                    <div>
                        <button className={`p-3 font3 outline-none ${page[0] === true ? `border-b-4` : null} border-[#E3E4E8]`} onClick={() => setPage([true, false, false])}>보유</button>
                        <button className={`p-3 font3 outline-none ${page[1] === true ? `border-b-4` : null} border-[#E3E4E8]`} onClick={() => onFavorite(param, setWishInfo, setPage, cardId)}>관심</button>
                    </div>

                </div>

                <div className="flex-grow overflow-auto mt-5">
                    {page[0] && myStock !== undefined && myStock.map((stock) => (
                        <div
                            key={stock.stockName}
                            className={`flex border shadow-md items-center justify-between p-5 rounded-lg mb-2`}
                        >
                            <div className="flex items-center gap-3">
                                {stock.stockImage && <Image src={stock.stockImage} width={70} height={70} alt="주식이미지"></Image>}
                                <div>
                                    <div className="font-semibold">{stock.stockName}</div>
                                    <span className="font1 text-[#787B7E] ml-1">{stock.stockNumber}주</span>
                                </div>
                            </div>
                            <div className="text-right flex flex-col">
                                <div className="font1 font-semibold">{stock.stockPrice}원</div>
                                <div className="font-semibold flex items-center">
                                    <p className={`font-bold ${stock.stockRate > 0 ? `text-[#E46E61]` : `text-[#0B5CD8]`}`}>{stock.stockRate > 0 ? "+" + stock.stockRate + "%" : stock.stockRate + "%"}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    {page[1] && wishInfo !== undefined && wishInfo.map((wishStock, index) => (
                        <div className={"flex relative cursor-grab p-5 shadow-md mb-2 rounded-lg border"}
                            key={wishStock.stockName}
                            draggable
                            onDragStart={(e) => handleDragStart(e, index, setDragOverIndex)}
                            onDragEnd={handleDragEnd}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, index, wishInfo, dragOverIndex, setOrderInfo, setWishInfo, setDragOverIndex, cardId)}
                            onClick={() => deleteCheckBox(index, hoveredIndex, setHoveredIndex)}>
                            <Motion hoveredIndex={hoveredIndex} index={index}>
                                <div className="flex">
                                    <span className="mr-2 font-semibold flex items-center">{wishStock.priority}.</span>
                                    <Image src={wishStock.stockImage} width={70} height={70} alt="주식이미지"></Image>
                                    <div className="flex h-full items-center ml-3 font-bold">
                                        <p>{wishStock.stockName}</p>
                                    </div>
                                </div>
                                <div className="flex items-center font-semibold">
                                    <p>{wishStock.stockPresentPrice}원</p>
                                </div>
                            </Motion>
                            <div>
                                <InverseMotion hoveredIndex={hoveredIndex} index={index} onClick={() => handleDeleteClick(index, param, setWishInfo, wishInfo, cardId)}>
                                    <button>삭제</button>
                                </InverseMotion>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

async function onFavorite(param, setWishInfo, setPage, cardId) {
    searchWishStocks(param, setWishInfo, cardId)
    setPage([false, true, false]); // 작업 완료 후 페이지 변경
}


export default HomeBody