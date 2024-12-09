import Image from 'next/image'
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
            <div className="space-y-4 p-3">
                {searchInfo && searchInfo.map((stock) => (
                    <div key={stock.stockName} className={`flex items-center justify-between p-3 border shadow-lg rounded-xl ${selectedStocks.includes(stock.stockName) ? 'bg-slate-100 border border-slate-400' : ''
                        }`}
                        onClick={() => toggleStockSelection(stock.stockName)}>
                        <div className="flex items-center gap-3 ">
                            <Image src={stock.stockImage} width={30} height={30} alt="주식이미지"></Image>
                            <div>
                                <div className="font-semibold">{stock.stockName}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default SearchBody