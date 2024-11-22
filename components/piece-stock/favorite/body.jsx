'use client'

import React, { useEffect, useState } from 'react'
import Image from "Next/image"
import Motion from "../../../components/piece-stock/etc/motion"
import InverseMotion from "../../../components/piece-stock/etc/inverseMotion"

const favoriteBody = ({ cardId, setOrderInfo, setWishInfo, wishInfo, session, status }) => {

    const [hoveredIndex, setHoveredIndex] = useState([{ order: 0 }, { order: 0 }, { order: 0 }]); // Hover된 항목의 인덱스를 관리
    const [dragOverIndex, setDragOverIndex] = useState(null); // 드래깅 된 위치확인 값
    const param = new URLSearchParams();
    //예시value
    param.append("cardId", cardId)
    useEffect(() => {
        if (status === "authenticated") {
            searchWishStocks();
        }

    }, [status]);

    // 백엔드에서 GET 위시리스트 조회시, 위시리스트의 priority, stockName, stockPresentPrice, stockImage 를 갖고온다.
    const searchWishStocks = async () => {
        const base64Payload = session.accessToken.split('.')[1];
        const base64 = base64Payload.replace(/-/g, '+').replace(/_/g, '/');
        const result = JSON.parse(decodeURIComponent(
            window
                .atob(base64)
                .split('')
                .map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join('')
        ))
        console.log(result.id)
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

    // delete 요청
    const deleteStocks = async () => {
        try {
            const response = await fetch(`http://localhost:8080/v1/api/stocks/select?${param}`, {
                method: 'DELETE',
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

    // delete 요청
    const saveStocks = async () => {
        try {
            const response = await fetch(`http://localhost:8080/v1/api/stocks/select?${param}`, {
                method: 'DELETE',
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

    // 드래그 시작
    const handleDragStart = (e, index) => {
        setDragOverIndex(index);
        e.target.style.opacity = 0.5; // 드래그 중인 항목을 반투명하게 표시
    };

    // 드래그 끝
    const handleDragEnd = (e) => {
        e.target.style.opacity = ""; // 드래그 종료 후 원래대로 복원
    };

    // 드래그된 항목이 다른 항목 위에 올려졌을 때 (이벤트 전파 방지)
    const handleDragOver = (e) => {
        e.preventDefault(); // 기본 동작을 막아줘야 드롭을 허용
    };

    // 드롭할 때 순서를 변경하는 함수
    const handleDrop = (e, dropIndex) => {
        e.preventDefault();

        const updatedData = [...wishInfo]; // 전체조회
        const first = updatedData[dragOverIndex].priority; // 드래그 시작위치
        const second = updatedData[dropIndex].priority;  // 드래그 끝 위치

        if (first == 3 && second == 1) {
            // 인데스 교환
            updatedData[0].priority = 2; // 1번객체 2로 저장
            updatedData[1].priority = 3; // 2번객체를 3로 저장 
            updatedData[2].priority = 1; //  3번객체 1로저장 -> 결론 현재 저장 순위 2,3,1 순으로 되어있음

            const draggedItem = updatedData[dragOverIndex]; // --3번에 대한 객체

            updatedData.splice(dragOverIndex, 1); // 드래그한 항목을 리스트에서 제거  -- 3번에 대한 객체 제거 => 1번과 2번만 남음 (2,3)
            updatedData.splice(dropIndex, 0, draggedItem); // 드래그한 항목을 새로운 위치에 추가 -- 1번부터 0개를 삭제하고 삭제했던 3번객체를 넣는다. (1,2,3)

        } else if (first == 1 && second == 3) {
            // 인데스 교환
            updatedData[0].priority = 3; // 1번객체 3로 저장
            updatedData[1].priority = 1; // 2번객체를 1로 저장 
            updatedData[2].priority = 2; //  3번객체 2로저장 -> 결론 현재 저장 순위 3,1,2 순으로 되어있음

            const draggedItem = updatedData[dragOverIndex]; // --1번에 대한 객체

            updatedData.splice(dragOverIndex, 1); // 드래그한 항목을 리스트에서 제거  -- 1번에 대한 객체 제거 => 1번과 2번만 남음 (1,2)
            updatedData.splice(dropIndex, 0, draggedItem); // (1,2,3)
        } else {
            // 인데스 교환
            updatedData[dragOverIndex].priority = second; //  2번객체 1로저장 
            updatedData[dropIndex].priority = first; // 1번객체 2로변경 

            const draggedItem = updatedData[dragOverIndex]; // 드래그한 항목 --2번에 대한 객체 

            updatedData.splice(dragOverIndex, 1); // 드래그한 항목을 리스트에서 제거  -- 2번에 대한 객체 제거 => 1번과 3번만 남음 
            updatedData.splice(dropIndex, 0, draggedItem); // 드래그한 항목을 새로운 위치에 추가  -- 1번부터 0개를 삭제하고 삭제했던 2번 객체를 넣는다 
        }

        // 이 부분은 백엔드에 보내줄 정보를 정리
        const total = [...orderInfo];
        const requestOrder = {
            currentOrder: first,
            editOrder: second,
            cardId: cardId
        }

        total.push(requestOrder);
        // 전송
        setOrderInfo(total)

        setWishInfo(updatedData); // 상태 업데이트
        setDragOverIndex(null); // 드래그 중인 인덱스를 초기화
    };

    // 삭제시 기능
    const handleDeleteClick = (index) => {
        const newData = [...wishInfo]
        if (newData.length === 3) {
            if (index === 0) {
                newData[1].priority = 1
                newData[2].priority = 2
                newData.splice(index, 1)
                param.append("order", index + 1)
            } else if (index === 1) {
                newData[2].priority = 2
                newData.splice(index, 1)
                param.append("order", index + 1)
            } else {
                newData.splice(index, 1)
                param.append("order", index + 1)
            }
        } else if (newData.length === 2) {
            if (index === 0) {
                newData[1].priority = 1
                newData.splice(index, 1)
                param.append("order", index + 1)
            } else {
                newData.splice(index, 1)
                param.append("order", index + 1)
            }
        } else {
            newData.splice(index, 1)
            param.append("order", index + 1)
        }
        setWishInfo(newData)
        console.log("제거진행")
        param.append("cardId", cardId)
        deleteStocks()
    }

    // 클릭 했을 때, 각 인덱스에 해당하는 제거박스 선택유무를 수정한다. + 0은 안보여주기 1은 보여주기 를 의미
    const deleteCheckBox = (index) => {
        const newData = [...hoveredIndex]
        index === 0 || index === 1 || index === 2
            ? newData[index].order === 0
                ? newData.splice(index, 1, { order: 1 })
                : newData.splice(index, 1, { order: 0 })
            : null;
        setHoveredIndex(newData)
    }


    return (
        <>
            <div>
                {wishInfo.map((wishStock, index) => (
                    <div className={"flex relative cursor-grab p-3"}
                        key={wishStock.stockName}
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragEnd={handleDragEnd}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, index)}
                        onClick={() => deleteCheckBox(index)}>
                        <Motion hoveredIndex={hoveredIndex} index={index}>
                            <div className="flex">
                                <div className="flex flex-col h-18 ml-2">
                                    <span className="mr-2 font-semibold">{wishStock.priority}.</span>
                                    <Image src={wishStock.stockImage} width={30} height={30} alt="주식이미지"></Image>
                                </div>
                                <div className="flex h-full items-center ml-3 font-bold">
                                    <p>{wishStock.stockName}</p>
                                </div>
                            </div>
                            <div className="flex items-center font-semibold">
                                <p>{wishStock.stockPresentPrice}원</p>
                            </div>
                        </Motion>
                        <div>
                            <InverseMotion hoveredIndex={hoveredIndex} index={index} onClick={() => handleDeleteClick(index)}>
                                <button>삭제</button>
                            </InverseMotion>
                        </div>
                    </div>

                ))}
            </div>
        </>
    )
}

export default favoriteBody
