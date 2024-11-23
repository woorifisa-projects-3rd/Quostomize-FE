import React from 'react'
import RecommendAlertmodal from "../../../components/piece-stock/etc/recommendAlertModal"
import { useState } from 'react';

const SearchBottom = ({ selectedStocks, cardId, session }) => {
    const [isAlert, setAlert] = useState(false);
    const [wishInfo, setWishInfo] = useState([])

    const param = new URLSearchParams();

    // 백엔드에서 GET 위시리스트 조회시, 위시리스트의 priority, stockName, stockPresentPrice, stockImage 를 갖고온다.
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

    // 
    const check = () => {
        searchWishStocks()
        if ((wishInfo.length + selectedStocks.length) > 3) {
            setAlert(true)
            setTimeout(() => {
                setAlert(false)
            }, 1000);
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