import React, { useEffect, useState } from 'react'
import { searchStock } from "../../../components/piece-stock/home/apiMethod/apiList"
import NavPageHeader from '../../header/NavPageHeader';
import ArrowButton from "../../../components/button/arrow-button"

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
        <div className='flex flex-col justify-center items-center'>
            <div className='w-full'>
            <ArrowButton direction={"prev"} onClick={()=>toFavorite(setPage)}></ArrowButton>
            </div>
            <NavPageHeader>종목 검색</NavPageHeader>
            <div className='w-[95%]'>
                <div className="mb-8">
                    <div
                        className="flex items-center rounded-xl bg-[#F2F4F6] border border-2 border-transparent focus-within:border-[#3384f6]">
                    <span className="material-icons px-2 text-gray-500">
                        search
                    </span>
                        <input
                            type="text"
                            placeholder="관심 있는 주식을 검색해 보세요"
                            className="w-full py-2 bg-[#F2F4F6] text-[1rem] rounded-xl focus:outline-none"
                            value={value}
                            onKeyDown={(e) => (e.key === "Enter" ? searchData(param,value,setSearchInfo) : null)}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

function searchData(param, value, setSearchInfo) {
    searchStock(param, value, setSearchInfo)
}

function toFavorite(setPage) {
    setPage([true, false, false])
}

export default searchHeader