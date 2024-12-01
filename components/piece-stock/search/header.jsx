import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const searchHeader = ({ setValue, value, setSearchInfo, searchInfo, session }) => {

    const router = useRouter()
    const param = new URLSearchParams();

    useEffect(() => {
        console.log(searchInfo)
    }, [searchInfo])

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
        router.push("/piece-stock/favorite")
    }

    return (
        <>
            <div className="flex items-center gap-2 mb-4">
                <span className="material-icons cursor-pointer" onClick={toFavorite}>chevron_left</span>
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