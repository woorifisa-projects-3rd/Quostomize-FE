export async function searchWishStocks(param, setWishInfo, cardId) {
    param.append("cardId", cardId)
    try {
        const response = await fetch(`/api/piece-stock/favorite/searchWish?${param}`, {
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
        setWishInfo(data);
    } catch (error) {
        // console.error('데이터 가져오기 오류:', error);
        setWishInfo([])
    }
}

export async function searchCardInfo(setCardData) {
    try {
        const response = await fetch(`/api/piece-stock/favorite/searchCardId`, {
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
        setCardData(data);
    } catch (error) {
        console.error('데이터 가져오기 오류:', error);
    }
}

// 스위치 요청
export async function switchStock(orderInfo) {
    try {
        const response = await fetch("/api/piece-stock/favorite/switchWish", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',  // 요청 본문이 JSON임을 지정
            }, body: JSON.stringify([orderInfo]),
        });
    } catch (error) {
        console.error('데이터 가져오기 오류:', error);
    }
}

// delete 요청
export async function deleteStocks(param) {
    try {
        const response = await fetch(`/api/piece-stock/favorite/deleteWish?${param}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',  // 요청 본문이 JSON임을 지정
            },
        });

        if (!response.ok) {
            throw new Error('값이 조회되지 않았습니다.');
        }
    } catch (error) {
        console.error('데이터 가져오기 오류:', error);
    }
}

export async function cardIdInfo(setData) {
    try {
        const response = await fetch(`/api/piece-stock/home`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
            credentials: "include",
        });
        const newData = await response.json()
        setData(newData)
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// recommend 요청
export async function recommendStocks(param, setRecommend, cardId, setIsNotCard, setOpen) {
    try {
        param.append("cardId", cardId)
        param.append("isRecommendByCardBenefit", true)
        const response = await fetch(`/api/piece-stock/favorite/searchRecommend?${param}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',  // 요청 본문이 JSON임을 지정
                }
            }
        )
        const data = await response.json()
        setOpen(true)
        setRecommend(data)
    } catch (error) {
        setIsNotCard(true)
    }
}

// 저장 요청
export async function saveStocks(param) {
    try {
        const response = await fetch(`/api/piece-stock/search/saveStocks?${param}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',  // 요청 본문이 JSON임을 지정
            },
        });

        if (!response.ok) {
            throw new Error('값이 조회되지 않았습니다.');
        }
    } catch (error) {
        console.error('데이터 가져오기 오류:', error);
    }
}

// stockInfo에서 주식검색
export async function searchStock(param, value, setSearchInfo) {
    param.append("keyword", value)
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
        // console.error('데이터 가져오기 오류:', error);
        setSearchInfo([])
    }
}