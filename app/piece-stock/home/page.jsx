'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";

const PieceStockHome = () => {
  const router = useRouter()
  const [selectedStocks, setSelectedStocks] = useState([]);

  const headDummyData = [{
    price: 6284817,
    rate: 1.23,
  }]

  const dummyData = [
    { stockName: "PTBA", stockNumber: "32", stockImage: "🔧" },
    { stockName: "ACES", stockNumber: "5", stockImage: "🏦" },
    { stockName: "ANTM", stockNumber: "13", stockImage: "🌿" },
    { stockName: "SIDO", stockNumber: "72", stockImage: "🧼" },
  ];

  const StockWishListPage = () => {
    router.push("favorite")
  }

  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (<>

    <div className="bg-lime-300 p-4 rounded-2xl m-6">
      {headDummyData.map((userInfo, index) => (
        <div className="text-center" key={index}>
          <h1 className="font1 font-bold mb-3">Portfolio</h1>
          <p className="font4 font-bold mb-3">Total {formatNumber(userInfo.price)}</p>
          <p className={`font-bold ${userInfo.rate > 0 ? `text-red-500` : `text-blue-500`}`}>{userInfo.rate > 0 ? "+" + userInfo.rate + "%" : "-" + userInfo.rate + "%"}</p>
        </div>
      ))}
    </div>

    <div className="p-4 h-screen flex flex-col">
      <div className="flex justify-between">
        <h1 className="font-bold font2 mb-4">Pencarian Terakhir</h1>
        <div className="border border-gray-300 bg-white rounded-xl flex items-center p-3 mb-3">

          <span className="font-bold cursor-pointer" onClick={StockWishListPage}>주식선택</span>
        </div>
      </div>


      <div className="flex-grow overflow-auto">
        {dummyData.map((stock) => (
          <div
            key={stock.stockName}
            className={`flex border-b items-center justify-between p-3 rounded-lg mb-2 ${selectedStocks.includes(stock.id) ? 'bg-blue-100' : 'bg-white'
              }`}
          >
            <div className="flex items-center gap-3">
              <span className="font3">{stock.stockImage}</span>
              <div>
                <div className="font-semibold">{stock.stockName}</div>
              </div>
            </div>
            <div className="text-right flex flex-col">
              <div className="font1 text-gray-500">보유 수량</div>
              <div className="font-semibold flex items-center">
                <span>{stock.stockNumber}</span>
                <span className="font1 text-gray-500 ml-1">주</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
  );
}

export default PieceStockHome;