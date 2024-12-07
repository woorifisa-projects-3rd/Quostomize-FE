import React, { useEffect } from 'react'
import RecommendAlertmodal from "../../../components/piece-stock/etc/recommendAlertModal"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SearchBottom = ({ selectedStocks, cardId, session, status }) => {
    const [isAlert, setAlert] = useState(false);
    const [wishInfo, setWishInfo] = useState([]);

    const param = new URLSearchParams();

    const router = useRouter()

    useEffect(() => {
        if (status === "authenticated") {
            searchWishStocks()
        }
    }, [status])

    const searchWishStocks = async () => {
        param.append("cardId", cardId)
        try {
            const response = await fetch(`http://localhost:8080/v1/api/stocks/select?${param}`, {
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
            setWishInfo(data.data);
        } catch (error) {
            console.error('데이터 가져오기 오류:', error);
        }
    }

    // 저장 요청
    const saveStocks = async () => {
        try {
            const response = await fetch(`http://localhost:8080/v1/api/stocks/recommendations/add?${param}`, {
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

    // 중복 확인로직
    const check = () => {
        if ((wishInfo.length + selectedStocks.length) > 3) {
            setAlert(true)
            setTimeout(() => {
                setAlert(false)
            }, 1500);
        }
        else {
            selectedStocks.forEach((checkStockName, i) => { // 선택된 주식을 저장하는 코드
                const testName = []
                let duplicated = []
                let check = false;
                const sample = checkStockName
                wishInfo.forEach((whishStock, index) => { // 내 위시주식 정보에서
                    if (whishStock.stockName === checkStockName) { // 만일 위시주식 안에 추천주식명이 없다면 통과
                        duplicated.push(true) // 중복일떄 true를 넣는다.
                    } else {    //중복이 있다면 체크
                        // console.log(whishStock.stockName)
                        duplicated.push(false) // 중복이 아닐떄 false를 넣는다.
                    }
                })
                check = true;
                testName.push(sample)

                if (duplicated.includes(true)) {
                } else {
                    if (check === true) {
                        testName.forEach((stockName) => {

                            param.append("stockName", stockName)
                            saveStocks(); // 저장하는 함수 호출 (주석 처리된 상태)
                            param.delete("stockName")
                        })
                    } else {
                    }
                    router.push("/piece-stock/favorite")
                }
            })
        }
    }




    return (
        <>
            {selectedStocks.length > 0 && (
                <div className="mt-4">
                    <button
                        className="w-full bg-blue-500 text-white py-2 rounded-lg"
                        onClick={() => check()}
                    >
                        선택 완료
                    </button>
                </div>
            )}
            {isAlert && <RecommendAlertmodal
                title={"3개 이상이 선택되어있어요 삭제하고 선택해주세요."}
            >
            </RecommendAlertmodal>}
        </>
    )
}

export default SearchBottom