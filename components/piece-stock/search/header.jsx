import React, { useEffect, useState } from 'react'
import { searchStock } from "../../../components/piece-stock/home/apiMethod/apiList"
import NavPageHeader from '../../header/NavPageHeader';


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
            <NavPageHeader>종목 검색</NavPageHeader>
            <div className="px-10 mt-20 mb-16">
                <div className="flex items-center border-2 rounded-xl bg-white border-gray-300 focus-within:border-[#3384f6] relative">
                    <span className="material-icons absolute left-4 text-gray-500">
                        search
                    </span>
                    <input
                        type="text"
                        placeholder="관심있는 주식을 검색해보세요"
                        className="w-full py-4 pl-12 pr-4 font3 bg-transparent text-sm focus:outline-none"
                        value={value}
                        onKeyDown={(e) => (e.key === "Enter" ? searchData(param, value, setSearchInfo) : null)}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>
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