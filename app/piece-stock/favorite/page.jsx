'use client'

import Image from "Next/image"
import { useEffect, useState } from "react";
import LargeModal from "../../../components/overlay/largeModal";
import RecommendAlertmodal from "../../../components/piece-stock/favorite/recommendAlertmodal"

const FavoritePage = () => {
  const [wishInfo, setWishInfo] = useState([]); // 조회한 위쉬 정보를 저장
  const [recommendStockInfo, setrecommend] = useState([]);
  const [dragOverIndex, setDragOverIndex] = useState(null); // 드래깅 된 위치확인 값
  const [orderInfo, setOrderInfo] = useState([]); // 순위변경시 사용하는 데이터배열
  const [hoveredIndex, setHoveredIndex] = useState([{ order: 0 }, { order: 0 }, { order: 0 }]); // Hover된 항목의 인덱스를 관리
  const [isOpen, setOpen] = useState(false)
  const [isClickButton, setClickButton] = useState([false, false, false])
  const [showAlertModal, setShowAlertModal] = useState(false);

  useEffect(() => {
    searchWishStocks();
  }, [])

  const param = new URLSearchParams();

  const cardId = 1
  //예시value
  param.append("cardId", cardId)

  // 백엔드에서 GET 위시리스트 조회시, 위시리스트의 priority, stockName, stockPresentPrice, stockImage 를 갖고온다.
  const searchWishStocks = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/stocks/select?${param}`, {
        method: 'GET',
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

  // 스위치 요청
  const switchStock = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/stocks/select/change-rank", {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',  // 요청 본문이 JSON임을 지정
        },
        body: JSON.stringify(orderInfo),
      });
      console.log(orderInfo)
    } catch (error) {
      console.error('데이터 가져오기 오류:', error);
    }
  }

  // delete 요청
  const deleteStocks = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/stocks/select?${param}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('값이 조회되지 않았습니다.');
      }
    } catch (error) {
      console.error('데이터 가져오기 오류:', error);
    }
  }

  // recommend 요청
  const recommendStocks = async () => {
    try {
      param.append("cardId", cardId)
      param.append("isRecommendByCardBenefit", true)
      const response = await fetch(`http://localhost:8080/api/stocks/recommendations?${param}`)
      const data = await response.json()
      setrecommend(data.data)
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
    console.log(wishInfo.length)
    console.log(isClickButton.filter(item => item === true).length)
    if ((wishInfo.length + isClickButton.filter(item => item === true).length) > 3) {
      setShowAlertModal(true)
      setTimeout(() => {
        setShowAlertModal(false); // 1초 후에 모달 숨기기
      }, 2000); //
    }
  }

  return (
    <>
      <ul className="my-7 flex flex-col h-full">
        <div className="flex justify-center text-2xl font-bold">
          <h1>
            Stock Invest
          </h1>
        </div>
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl font-semibold">Watchlist</h2>
          <button className="search-icon">
            <span className="material-icons">search</span>
          </button>
        </div>

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
              <div className={`flex justify-between w-full transform  transition-all duration-500 ease-in-out ${hoveredIndex[index].order === 1 ? '-translate-x-14 opacity-100' : '-translate-x-0 opacity-100'}`}>
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
              </div>
              <div className="flex items-center ">
                <button
                  className={`absolute right-0 bg-red-500  text-white px-4 py-2.5 transform  transition-all duration-500 ease-in-out hover:bg-red-600 active:bg-red-700
  flex items-center justify-center" ${hoveredIndex[index].order === 1 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
                  onClick={() => handleDeleteClick(index)}
                >
                  삭제
                </button>
              </div>
            </div>

          ))}
        </div>
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
      </ul>
    </>
  )
}
export default FavoritePage;