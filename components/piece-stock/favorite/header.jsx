'use client'

import { useRouter } from 'next/navigation';
import React from 'react'

const favoriteHeader = () => {
    const router = useRouter();

    // 검색페이지로 이동한다.
    const SearchPage = () => {
        router.push("search");
    }

    return (
        <>
            <div className="flex justify-center text-2xl font-bold">
                <h1>
                    Stock Invest
                </h1>
            </div>
            <div className="flex justify-between items-center p-4">
                <h2 className="text-xl font-semibold">Watchlist</h2>
                <button className="search-icon" onClick={SearchPage}>
                    <span className="material-icons">search</span>
                </button>
            </div>
        </>
    )
}

export default favoriteHeader