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
        <div className='flex flex-col justify-center items-center'>
            <NavPageHeader>조각 투자</NavPageHeader>
            <div className='w-3/4'>
                <div className="mt-8 mb-8">
                    <div className="flex items-center border-2 rounded-xl bg-white border-gray-300 focus-within:border-[#3384f6]">
                        <span className="material-icons px-2 text-gray-500">
                            search
                        </span>
                        <input
                            type="text"
                            placeholder="관심있는 주식을 검색해보세요"
                            className="w-full py-4 font3 bg-transparent text-xs focus:outline-none"
                            value={value}
                            onKeyDown={(e) => (e.key === "Enter" ? searchData(setPage) : null)}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </div>
                </div>


                <div className="bg-white mt-8 p-4 rounded-2xl border-4 border-[#3384f6]" style={{
                    letterSpacing: '0.05em'
                }}>
                    <div>
                        <h1 className="text-left font3 mb-3 text-xl">내 투자 현황</h1>
                        <p className="text-right font4 font-bold mb-3">{formatNumber(headDummyData.price)} 원</p>
                        <div className='flex justify-end'>
                            <p className={`font-bold ${headDummyData.rate > 0 ? `text-[#E46E61]` : `text-[#0B5CD8]`}`}>{formatNumberByTotal(headDummyData.price * headDummyData.rate * 0.01 / (1 + headDummyData.rate / 100))}</p>
                            <p className={`font-bold ${headDummyData.rate > 0 ? `text-[#E46E61]` : `text-[#0B5CD8]`}`}>{headDummyData.rate > 0 ? "(+" + headDummyData.rate + "%)" : "(" + headDummyData.rate + "%)"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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