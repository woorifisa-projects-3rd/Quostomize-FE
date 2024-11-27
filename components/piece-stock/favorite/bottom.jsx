'use client'

import React, { useEffect, useState } from 'react'
import LargeModal from "../../../components/overlay/largeModal";
import RecommendAlertmodal from "../etc/recommendAlertModal"
import Image from "next/image"

const favoriteBottom = ({ orderInfo, cardId, wishInfo, setWishInfo, session, setRecommend, recommendStockInfo, isClickButton, setClickButton }) => {

    const [isOpen, setOpen] = useState(false)
    const [showAlertModal, setShowAlertModal] = useState(false);

    const param = new URLSearchParams();
    const paramSave = new URLSearchParams();
    const totalData = []
    const saveData = []
    let compareData;


    // 스위치 요청
    const switchStock = async () => {
        try {
            const response = await fetch("http://localhost:8080/v1/api/stocks/select/change-rank", {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',  // 요청 본문이 JSON임을 지정
                    'Authorization': `Bearer ${session.accessToken}`, // JWT 토큰을 Authorization 헤더에 포함
                },
                body: JSON.stringify(orderInfo),
            });
            console.log(orderInfo)
        } catch (error) {
            console.error('데이터 가져오기 오류:', error);
        }
    }

    // recommend 요청
    const recommendStocks = async () => {
        try {
            param.append("cardId", cardId)
            param.append("isRecommendByCardBenefit", true)
            const response = await fetch(`http://localhost:8080/v1/api/stocks/recommendations?${param}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',  // 요청 본문이 JSON임을 지정
                        'Authorization': `Bearer ${session.accessToken}`, // JWT 토큰을 Authorization 헤더에 포함
                    }
                }
            )
            const data = await response.json()
            setRecommend(data.data)
        } catch (error) {
            console.error('데이터 가져오기 오류:', error);
        }
    }

    // 저장 요청
    const saveStocks = async () => {
        try {
            const response = await fetch(`http://localhost:8080/v1/api/stocks/recommendations/add?${paramSave}`, {
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
        } catch (error) {
            console.error('데이터 가져오기 오류:', error);
        }
    }

    const openModal = () => {
        setOpen(true)
        recommendStocks()
    }

    const closeModal = () => {
        setOpen(false)
    }

    const checkButton = (index) => {
        setClickButton((prevState) => {
            const newData = [...prevState];
            newData[index] = !newData[index];
            return newData;
        });

    }

    const choiceStocks = () => {
        if ((wishInfo.length + isClickButton.filter(item => item === true).length) > 3) {
            setShowAlertModal(true)
            setTimeout(() => {
                setShowAlertModal(false); // 1초 후에 모달 숨기기
            }, 2000); //
        } else {
            isClickButton.forEach((checkStock, i) => { // 선택된 주식을 저장하는 코드
                const testName = []
                let duplicated = []
                let check = false;
                if (checkStock === true) { // 만일 해당 추천주식이 체크 되어 있다면
                    const stockName = recommendStockInfo[i] // 해당하는 인덱스의 위시주식과 비교해서
                    wishInfo.forEach((whishStock, index) => { // 내 위시주식 정보에서
                        if (whishStock.stockName === stockName.stockName) { // 만일 위시주식 안에 추천주식명이 없다면 통과
                            console.log("중복이 존재한다 : " + index)
                            duplicated.push(true) // 중복일떄 true를 넣는다.
                        } else {    //중복이 있다면 체크
                            console.log("주식의 중복이 없다면 : " + index)
                            console.log(whishStock.stockName)
                            console.log(stockName.stockName)
                            console.log("===============")
                            duplicated.push(false) // 중복이 아닐떄 false를 넣는다.
                        }
                    })
                    check = true;
                    testName.push(stockName)
                    totalData.push(stockName)

                }

                if (duplicated.includes(true)) {
                    console.log("위시주식에 이미 해당 주식이 존재합니다.");
                } else {
                    if (check === true) {
                        testName.forEach((recommendName, index) => {

                            paramSave.append("stockName", recommendName.stockName)
                            console.log(paramSave)
                            saveStocks(); // 저장하는 함수 호출 (주석 처리된 상태)
                            saveData.push(recommendName)
                            console.log(recommendName)
                            console.log("위시주식 저장");
                            paramSave.delete("stockName")
                        })
                    } else {
                        console.log("다음 추천주식 인덱스로")
                    }

                }
            })
            if (saveData.length > 0) {
                if (wishInfo.length === 1) {
                    compareData = saveData.map((data, i) => {
                        console.log(data)
                        return (
                            {
                                ...data,
                                priority: i + 2
                            }
                        )
                    })
                } else if (wishInfo.length === 2) {
                    compareData = saveData.map((data, i) => {
                        console.log(data)
                        return (
                            {
                                ...data,
                                priority: 3
                            }
                        )
                    })
                } else {
                    compareData = saveData.map((data, i) => {
                        console.log(data)
                        return (
                            {
                                ...data,
                                priority: i + 1
                            }
                        )
                    })
                }
                const newData = [...wishInfo, ...compareData]
                console.log(wishInfo)
                console.log(newData)
                setWishInfo(newData)
            }
            setOpen(false) // 모달을 닫는다
        }
    }

    return (
        <>
            <div className="flex justify-between p-4">
                <button className="px-4 py-2 border rounded border-black font-bold" onClick={openModal}>종목 자동 추천</button>
                <button className="px-4 py-2 border rounded border-black font-bold" onClick={switchStock}>저장</button>
            </div>
            <div>
                {isOpen && <LargeModal className="bg-white rounded-t-3xl p-6 w-full"
                    title={
                        <p className="text-xl font-bold text-center mb-2">
                            선택한 카드 혜택 내역을 기반으로 추천해요
                        </p>
                    }
                    description={
                        <p className="text-sm text-center mb-6">
                            카드 혜택을 기반으로 3종목을 추천해요.원하는 만큼 선택해서 반영해보세요.
                        </p>
                    }
                    onClose={choiceStocks}
                    setIsOpen={closeModal}
                    choice={"선택완료"}
                    cancle={"닫기"}
                >
                    {recommendStockInfo.map((stock, index) => (
                        <div key={stock.stockName} className="flex justify-between items-center p-4">
                            <div className={`flex justify-between w-full `}>
                                <div className="flex">
                                    <div className="w-12 h-12 rounded-full overflow-hidden">
                                        <Image src={stock.stockImage} width={50} height={50} alt="주식이미지"></Image>
                                    </div>
                                    <div className="flex h-full items-center ml-4">
                                        <p className="font-medium">{stock.stockName}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <p className="text-gray-600 text-sm">{stock.stockPresentPrice}원</p>
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer
          ${isClickButton[index]
                                            ? 'border-blue-500 bg-blue-500'
                                            : 'border-gray-300 bg-gray-100'
                                        }`}
                                        onClick={() => checkButton(index)}>
                                        {isClickButton[index] && (
                                            <span className="text-white text-sm">✓</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {showAlertModal && <RecommendAlertmodal
                                title={"이미 3개가 선택되어있어요 삭제하고 선택해주세요."}
                            >
                            </RecommendAlertmodal>}
                        </div>
                    ))}
                </LargeModal>}
            </div>
        </>
    )
}

export default favoriteBottom