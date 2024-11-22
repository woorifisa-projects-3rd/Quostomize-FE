import React from 'react'

const searchHeader = ({ setValue, setSearchInfo }) => {

    const param = new URLSearchParams();

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

    return (
        <>
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
        </>
    )
}

export default searchHeader