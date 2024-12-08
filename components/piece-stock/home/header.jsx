'use client'

import { useRouter } from 'next/navigation';
import React from 'react'
import NavPageHeader from '../../header/NavPageHeader'
import PageHeader from "../../../components/header/PageHeader"

const HomeHeader = ({ data, setValue, value, setPage }) => {
    const router = useRouter()

    const headDummyData = {
        price: data?.output2?.[0]?.evluAmtSmtlAmt,
        rate: data?.output2?.[0]?.resultRate
    };

    return (
        <div className='flex flex-col justify-center items-center'>
            <PageHeader
                modaltitle="카드 생성"
                showArrowButton={false}
            >
               조각 투자
            </PageHeader>
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
                            onKeyDown={(e) => (e.key === "Enter" ? searchData(setPage) : null)}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </div>
                </div>
                <div className="bg-[#F2F4F6] mt-8 p-4 rounded-2xl w-[90%] mx-auto">
                    <div>
                        <h1 className="text-left font1 font-bold text-[#43505E]">내 투자 현황</h1>
                        <p className="text-left font4 font-bold">{formatNumber(headDummyData.price)}원</p>
                        <div className='flex justify-start font-[1rem]'>
                            <p className={`font-bold ${headDummyData.rate > 0 ? `text-[#E46E61]` : `text-[#0B5CD8]`}`}>
                                {formatNumberByTotal(headDummyData.price * headDummyData.rate * 0.01 / (1 + headDummyData.rate / 100))}
                            </p>
                            <span>&nbsp;</span> {/* 공백 추가 */}
                            <p className={`font-bold ${headDummyData.rate > 0 ? `text-[#E46E61]` : `text-[#0B5CD8]`}`}>
                                {headDummyData.rate > 0 ? "(+" + headDummyData.rate + "%)" : "(" + headDummyData.rate + "%)"}
                            </p>
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