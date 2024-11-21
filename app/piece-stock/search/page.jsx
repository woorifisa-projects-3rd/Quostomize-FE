'use client'

import { useEffect, useState } from "react";
import RecommendAlertmodal from "../../../components/piece-stock/favorite/recommendAlertmodal";

const SearchPage = () => {
  const [value, setValue] = useState(""); // 입력값
  const [searchInfo, setSearchInfo] = useState([]);
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [isAlert, setAlert] = useState(false);
  const [wishInfo, setWishInfo] = useState([])

  const param = new URLSearchParams();

  const cardId = 2
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


  useEffect(() => {
  }, [selectedStocks])

  const dummy = [{
    stockName: "주식1",
    stockPrice: "주식가격1",
    stockImage: "주식이미지1"
  }
    , {
    stockName: "주식2",
    stockPrice: "주식가격2",
    stockImage: "주식이미지2"
  }
    , {
    stockName: "주식3",
    stockPrice: "주식가격3",
    stockImage: "주식이미지3"
  }]

  const searchData = () => {
    setSearchInfo(dummy)
  }

  const toggleStockSelection = (stockName) => {
    setSelectedStocks(originalData =>
      originalData.includes(stockName)
        ? originalData.filter(name => name !== stockName)
        : [...originalData, stockName]
    );
  }

  const check = () => {
    searchWishStocks()
  }

  useEffect(() => {
    if ((wishInfo.length + selectedStocks.length) > 3) {
      setAlert(true)
      setTimeout(() => {
        setAlert(false)
      }, 1000);
    }
  }, [wishInfo])

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="material-icons cursor-pointer">chevron_left</span>
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-2 pl-8 rounded-lg border"
            onKeyDown={(e) => e.key === "Enter" ? searchData() : null}
            onChange={(e) => setValue(e.target.value)}
          />
          <span className="material-icons absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
            search
          </span>
        </div>
      </div>

      <h1 className="font-bold text-lg mb-4">검색 결과</h1>

      <div className="space-y-4">
        {searchInfo.map((stock, index) => (
          <div key={stock.stockName} className={`flex items-center justify-between ${selectedStocks.includes(stock.stockName) ? 'bg-blue-100 border border-blue-500' : ''
            }`}
            onClick={() => toggleStockSelection(stock.stockName)}>
            <div className="flex items-center gap-3">
              {stock.stockImage}
              <div>
                <div className="font-semibold">{stock.stockName}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold">{stock.stockPrice}</div>
            </div>
          </div>
        ))}
      </div>
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
        title={"이미 3개가 선택되어있어요 삭제하고 선택해주세요."}
      >
      </RecommendAlertmodal>}
    </div>
  );
}

export default SearchPage;