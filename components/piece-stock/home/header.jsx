'use client'

import { useRouter } from 'next/navigation';
import React from 'react'

const HomeHeader = ({ data, setValue, value, setPage }) => {
    const router = useRouter()

    const headDummyData = {
        price: data?.output2?.[0]?.evluAmtSmtlAmt,
        rate: data?.output2?.[0]?.resultRate
    };

    return (
        <>
            <div className='flex justify-between mb-10 mt-5'>
                <span className="material-icons cursor-pointer" onClick={() => toFavorite(router)}>chevron_left</span>
                <h1 className='font3'>조각투자</h1>
                <span className="material-icons cursor-pointer" onClick={() => toFavorite(router)}>close</span>
            </div>
            <div className="px-10 mb-6">
                <div className="flex-1 relative">
                    <input
                        type="text"
                        placeholder="관심있는 주식을 검색해보세요"
                        className="w-full py-5 font3 px-4 bg-[#E3E4E8] rounded-xl text-sm focus:outline-none"
                        value={value}
                        onKeyDown={(e) => e.key === "Enter" ? searchData(setPage) : null}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <span className="material-icons absolute right-2 top-1/2 -translate-y-1/2">
                        search
                    </span>
                </div>
            </div>
            <div className="bg-[#E3E4E8] p-10 rounded-2xl m-14">
                <div className="text-left">
                    <h1 className="font1 font-bold mb-3">내 투자 현황</h1>
                    <p className="font4 font-bold mb-3">{formatNumber(headDummyData.price)} 원</p>
                    <div className='flex'>
                        <p className={`font-bold ${headDummyData.rate > 0 ? `text-[#E46E61]` : `text-[#0B5CD8]`}`}>{formatNumberByTotal(headDummyData.price * headDummyData.rate * 0.01 / (1 + headDummyData.rate / 100))}</p>
                        <p className={`font-bold ${headDummyData.rate > 0 ? `text-[#E46E61]` : `text-[#0B5CD8]`}`}>{headDummyData.rate > 0 ? "(+" + headDummyData.rate + "%)" : "(" + headDummyData.rate + "%)"}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

function searchData(setPage) {
    setPage([false, false, true])
}

function formatNumber(number) {
    return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatNumberByTotal(number) {
    return Number(number)
        .toFixed(0)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function toFavorite(router) {
    return router.push("/home")
}

export default HomeHeader