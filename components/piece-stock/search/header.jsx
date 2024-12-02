import React, { useEffect, useState } from 'react'

const searchHeader = ({ setValue, value, setSearchInfo, searchInfo, setPage }) => {
    const [inSearch, setSearch] = useState(true)
    const param = new URLSearchParams();

    useEffect(()=>{
        if(inSearch){
            searchStock()
            setSearch(false)
        }
    },[value])

    const searchStock = async () => {
        param.append("keyword", value)
        console.log(param)
        try {
            const response = await fetch(`/api/piece-stock/search/searchStock?${param}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',  // 요청 본문이 JSON임을 지정
                },
            });

            if (!response.ok) {
                throw new Error('값이 조회되지 않았습니다.');
            }
            const data = await response.json(); // 응답을 JSON으로 파싱
            setSearchInfo(data);
        } catch (error) {
            console.error('데이터 가져오기 오류:', error);
        }
    }

    const searchData = () => {
        searchStock()
    }

    const toFavorite = () => {
        setPage([true,false,false])
    }

    return (
        <>
            <div className='flex justify-between mb-10 mt-5'>
                <span className="material-icons cursor-pointer" onClick={()=>toFavorite()}>chevron_left</span>
                <h1 className='font3'>종목검색</h1>
                <span className="material-icons cursor-pointer" onClick={()=>toFavorite()}>close</span>
            </div>
            <div className="flex-1 relative">
                <input
                    type="text"
                    placeholder="관심있는 주식을 검색해보세요"
                    className="w-full py-5 font3 px-4 bg-gray-100 rounded-xl text-sm focus:outline-none"
                    value={value}
                    onKeyDown={(e) => e.key === "Enter" ? searchData() : null}
                    onChange={(e) => setValue(e.target.value)}
                />
                <span className="material-icons absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                    search
                </span>
            </div>
        </>
    )
}

export default searchHeader