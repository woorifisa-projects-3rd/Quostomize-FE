import Image from "Next/image"
import React from 'react'

const SearchBody = ({ searchInfo, setSelectedStocks, selectedStocks }) => {

    const toggleStockSelection = (stockName) => {
        setSelectedStocks(originalData =>
            originalData.includes(stockName)
                ? originalData.filter(name => name !== stockName)
                : [...originalData, stockName]
        );
    }

    return (
        <>
            <h1 className="font-bold text-lg mb-4">검색 결과</h1>
            <div className="space-y-4 p-3">
                {searchInfo && searchInfo.map((stock, index) => (
                    <div key={stock.stockName} className={`flex items-center justify-between p-3 rounded-xl ${selectedStocks.includes(stock.stockName) ? 'bg-blue-100 border border-blue-500' : ''
                        }`}
                        onClick={() => toggleStockSelection(stock.stockName)}>
                        <div className="flex items-center gap-3">
                            <Image src={stock.stockImage} width={30} height={30} alt="주식이미지"></Image>
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
        </>
    )
}

export default SearchBody