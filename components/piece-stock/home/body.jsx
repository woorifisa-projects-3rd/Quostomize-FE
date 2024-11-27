import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HomeBody = ({ data }) => {

    const myStock = data?.output1.map((stock) => ({
        stockName: stock?.prdtName,
        stockNumber: stock?.hldgQty,
        stockImage: stock?.stockImage,
    }));

    return (
        <>
            <div className="p-4 h-screen flex flex-col">
                <div className="flex justify-between">

                    <h1 className="font-bold text-lg mb-4">Stock List</h1>

                    <div className="border border-gray-300 bg-white rounded-xl flex items-center p-3 mb-3">

                        <Link href="/piece-stock/favorite">
                            <div className="font-bold cursor-pointer">
                                주식선택
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="flex-grow overflow-auto">
                    {myStock !== undefined && myStock.map((stock) => (
                        <div
                            key={stock.stockName}
                            className={`flex border-b items-center justify-between p-3 rounded-lg mb-2`}
                        >
                            <div className="flex items-center gap-3">
                                {stock.stockImage && <Image src={stock.stockImage} width={30} height={30} alt="주식이미지"></Image>}
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
    )
}

export default HomeBody