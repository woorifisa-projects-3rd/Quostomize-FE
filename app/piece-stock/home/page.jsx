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
    { stockName: "PTBA", price: "3,790", stockImage: "🔧" },
    { stockName: "ACES", price: "570", stockImage: "🏦" },
    { stockName: "ANTM", price: "1,840", stockImage: "🌿" },
    { stockName: "SIDO", price: "740", stockImage: "🧼" },
  ];

  const StockWishListPage = () => {
    router.push("favorite")
  }

  return (<>

    <div className="bg-lime-300 p-4 rounded-2xl m-6">
      {headDummyData.map((userInfo, index) => (
        <div className="text-center" key={index}>
          <h1 className="text-xl font-bold mb-3">Portfolio</h1>
          <p className="text-3xl font-bold mb-3">RP {userInfo.price}</p>
          <p className={`text-bold ${userInfo.rate > 0 ? `text-red-500` : `text-blue-500`}`}>{userInfo.rate > 0 ? "+" + userInfo.rate + "%" : "-" + userInfo.rate + "%"}</p>
        </div>
      ))}
    </div>

    <div className="p-4 h-screen flex flex-col bg-gray-100">
      <div className="flex justify-between">
        <h1 className="font-bold text-lg mb-4">Pencarian Terakhir</h1>
        <div className="border border-gray-300 bg-white rounded-xl flex items-center p-3 mb-3">

          <span className="font-bold cursor-pointer" onClick={StockWishListPage}>주식선택</span>
        </div>
      </div>


      <div className="flex-grow overflow-auto">
        {dummyData.map((stock) => (
          <div
            key={stock.stockName}
            className={`flex items-center justify-between p-3 rounded-lg mb-2 ${selectedStocks.includes(stock.id) ? 'bg-blue-100' : 'bg-white'
              }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{stock.stockImage}</span>
              <div>
                <div className="font-semibold">{stock.stockName}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold">{stock.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
  );
}

export default PieceStockHome;