'use client'

import { useRouter } from 'next/navigation';
import React from 'react'
import NavPageHeader from '../../header/NavPageHeader'

const HomeHeader = ({ data, setValue, value, setPage }) => {
    const router = useRouter()

    const headDummyData = {
        price: data?.output2?.[0]?.evluAmtSmtlAmt,
        rate: data?.output2?.[0]?.resultRate
    };

    return (
        <>
            <NavPageHeader>조각 투자</NavPageHeader>
            <div className="px-10 mt-20 mb-16">
                <div className="flex items-center border-2 rounded-xl bg-white border-gray-300 focus-within:border-[#3384f6]">
                    <span className="material-icons px-4 text-gray-500">
                        search
                    </span>
                    <input
                        type="text"
                        placeholder="관심있는 주식을 검색해보세요"
                        className="w-full py-4 font3 bg-transparent text-sm focus:outline-none"
                        value={value}
                        onKeyDown={(e) => (e.key === "Enter" ? searchData(setPage) : null)}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>
            </div>


            <div className="bg-white p-10 rounded-2xl m-14 border-4 border-[#3384f6]" style={{
                letterSpacing: '0.05em'
            }}>
                <div>
                    <h1 className="text-left font4 font-bold mb-3">내 투자 현황</h1>
                    <p className="text-right font4 font-bold mb-3">{formatNumber(headDummyData.price)} 원</p>
                    <div className='flex justify-end'>
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