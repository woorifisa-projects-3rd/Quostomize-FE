import React, { useEffect } from 'react'
import RecommendAlertModal from "../../../components/piece-stock/etc/recommendAlertModal"
import { useState } from 'react';
import { searchWishStocks } from "../../../components/piece-stock/home/apiMethod/apiList"
import { openModal, closeModal, checkButton, choiceStocks, check } from "../../../components/piece-stock/home/component/totalSearch"
import LargeModal from '../../overlay/largeModal'
import Image from 'next/image';

const SearchBottom = ({ wishInfo, setWishInfo, cardId, setPage, searchInfo, selectedStocks }) => {
    const [recommendStockInfo, setRecommend] = useState([]);
    const [isOpen, setOpen] = useState(false);
    const [isAlert, setAlert] = useState(false)
    const [showAlertModal, setShowAlertModal] = useState(false);
    const [isClickButton, setClickButton] = useState([false, false, false])
    const param = new URLSearchParams()
    const paramSave = new URLSearchParams();
    const totalData = []
    const saveData = []
    let compareData;

    useEffect(() => {
        searchWishStocks(param, setWishInfo, cardId)
    }, [])

    return (
        <>
            <div className="flex flex-col items-center justify-center py-20">
                {searchInfo.length === 0 &&
                    <div className="flex flex-col items-center">
                        <div className="relative">
                            <img src="/icons/주식발견.png" width="80" height="80" className="absolute top-0 left-0 bottom-2" />
                            <div className="mb-4">
                                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Money%20Bag.png" alt="Money Bag" width="160" height="160" />
                            </div>
                        </div>
                        <div className="flex items-center gap-1 font2 font-semibold">
                            <div className='cursor-pointer' onClick={() => openModal(setOpen, param, setRecommend, cardId)}>
                                <span>내 카드 종목 </span>
                                <span className="text-[#3081F7] cursor-pointer">구경하기 ➔ </span>
                            </div>
                        </div>
                    </div>
                }
                {isOpen &&
                    <LargeModal className="bg-white rounded-t-3xl m-8 w-full"
                    title={
                        <span className="font2 font-bold text-center mb-2">
                            내가 선택한
                            <span className="text-[#3081F7]">{` 카드 혜택 \n`}</span>
                            <br />
                            관련 종목은 다음과 같아요.
                        </span>
                    }
                                description={
                                    <p className="text-sm text-center mb-4">
                                        내 카드 혜택을 기반으로 찾은 종목이에요.<br />
                                        원하는 관심 종목에 담아보세요.
                                    </p>
                                }
                    onClose={() => choiceStocks(wishInfo, isClickButton, setShowAlertModal, recommendStockInfo, totalData, paramSave, saveData, compareData, setWishInfo, setOpen, setPage)}
                    setIsOpen={() => closeModal(setOpen)}
                    choice={"관심 목록에 추가하기"}
                    cancle={"닫기"}
                >
                    {recommendStockInfo.map((stock, index) => (
                        <div key={stock.stockName} className={`flex justify-between items-center p-4 m-1 border rounded-xl shadow-lg cursor-pointer ${isClickButton[index] === true ? `border-2 border-slate-300 bg-slate-200` : `border-slate-200 `}`} onClick={() => checkButton(index, setClickButton)}>
                            <div className={`flex justify-between w-full`}>
                                <div className="flex">
                                    <div className="w-12 h-12 rounded-full overflow-hidden">
                                        <Image src={stock.stockImage} width={50} height={50} alt="주식이미지"></Image>
                                    </div>
                                    <div className="flex h-full items-center ml-4">
                                        <p className="font-medium">{stock.stockName}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <p className="text-[#43505E] text-sm">{stock.stockPresentPrice}원</p>
                                </div>
                            </div>
                            {showAlertModal && <RecommendAlertModal
                                title={"관심 목록은 최대 3개까지 담을 수 있어요.\n기존 목록을 수정해 주세요."}
                            />}
                        </div>
                    ))}
                </LargeModal>
                }
            </div >
            {selectedStocks.length > 0 && (
                <div className="fixed left-1/2 top-3/4 -translate-x-1/2 -translate-y-1/2 z-50 outline-none">
                    <button
                        className="bg-blue-500 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 w-auto"
                        onClick={() => check(wishInfo, setAlert, selectedStocks, setPage, param)}
                    >
                        관심 목록 추가하기
                    </button>
                </div>
            )}
            {isAlert && <RecommendAlertModal
                title={"관심 목록은 최대 3개까지 담을 수 있어요.\n기존 목록을 수정해 주세요."}
            >
            </RecommendAlertModal>}
        </>
    )
}

export default SearchBottom