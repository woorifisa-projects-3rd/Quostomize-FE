import React, { useEffect, useState } from 'react'
import { searchStock } from "../../../components/piece-stock/home/apiMethod/apiList"

const searchHeader = ({ setValue, value, setSearchInfo, setPage }) => {
    const [inSearch, setSearch] = useState(true)
    const param = new URLSearchParams();

    useEffect(() => {
        if (inSearch) {
            searchStock(param, value, setSearchInfo)
            setSearch(false)
        }
    }, [value])

    return (
        <>
            <div className='flex justify-between mb-10 mt-5'>
                <span className="material-icons cursor-pointer" onClick={() => toFavorite(setPage)}>chevron_left</span>
                <h1 className='font3'>종목검색</h1>
                <span className="material-icons cursor-pointer" onClick={() => toFavorite(setPage)}>close</span>
            </div>
            <div className="flex-1 relative">
                <input
                    type="text"
                    placeholder="관심있는 주식을 검색해보세요"
                    className="w-full py-5 font3 px-4 bg-[#E3E4E8] rounded-xl font1 focus:outline-none"
                    value={value}
                    onKeyDown={(e) => e.key === "Enter" ? searchData(param, value, setSearchInfo) : null}
                    onChange={(e) => setValue(e.target.value)}
                />
                <span className="material-icons absolute right-2 top-1/2 -translate-y-1/2">
                    search
                </span>
            </div>
        </>
    )
}
function searchData(param, value, setSearchInfo) {
    searchStock(param, value, setSearchInfo)
}

function toFavorite(setPage) {
    setPage([true, false, false])
}

export default searchHeader