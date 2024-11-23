'use client'

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PieceStockHome = () => {
  const [myStock, setMyStock] = useState([])
  const router = useRouter()
  const { data: session, status } = useSession();

  // useEffect(() => {
  //   console.log(myStock)
  // }, [myStock])

  // useEffect(() => {
  //   if (status === "authenticated") {
  //     searchMyStockInfo();
  //   }
  // }, [status]);

  // // 백엔드에서 GET 위시리스트 조회시, 위시리스트의 priority, stockName, stockPresentPrice, stockImage 를 갖고온다.
  // const searchMyStockInfo = async () => {
  //   const stockAccountId = 2
  //   try {
  //     const response = await fetch(`http://localhost:8080/v1/api/stock/lists/:${{ stockAccountId }}`, {
  //       method: 'GET',
  //       credentials: 'include',
  //       headers: {
  //         'Content-Type': 'application/json',  // 요청 본문이 JSON임을 지정
  //         'Authorization': `Bearer ${session.accessToken}`, // JWT 토큰을 Authorization 헤더에 포함
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error('값이 조회되지 않았습니다.');
  //     }
  //     const data = await response.json(); // 응답을 JSON으로 파싱
  //     setMyStock(data.data);
  //   } catch (error) {
  //     console.error('데이터 가져오기 오류:', error);
  //   }
  // }


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
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 총매입금액 숫자 세자리 수 단위로 , 표시
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

        <h1 className="font-bold text-lg mb-4">Stock List</h1>

        <div className="border border-gray-300 bg-white rounded-xl flex items-center p-3 mb-3">

          <span className="font-bold cursor-pointer" onClick={StockWishListPage}>주식선택</span>
        </div>
      </div>


      <div className="flex-grow overflow-auto">
        {dummyData.map((stock) => (
          <div
            key={stock.stockName}
            className={`flex border-b items-center justify-between p-3 rounded-lg mb-2`}
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