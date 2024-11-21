'use client'

import { useEffect, useState } from "react";

const SearchPage = () => {
  const [value, setValue] = useState(""); // 입력값
  const [searchInfo, setSearchInfo] = useState([]);
  const [selectedStocks, setSelectedStocks] = useState([]);

  useEffect(() => {
    console.log(searchInfo)
  }, [searchInfo])

  useEffect(() => {
    console.log(selectedStocks)
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
    console.log(selectedStocks)
  }

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

      <h1 className="font-bold text-lg mb-4">Pencarian Terakhir</h1>

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
            onClick={() => console.log("선택 완료:", selectedStocks)}
          >
            선택 완료
          </button>
        </div>
      )}
    </div>
  );
}

export default SearchPage;