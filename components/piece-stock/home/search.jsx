import React, { useEffect, useState } from 'react'

import SearchHeader from "../../../components/piece-stock/search/header"
import SearchBody from "../../../components/piece-stock/search/body"
import SearchBottom from "../../../components/piece-stock/search/bottom"
import { searchCardInfo } from "../../../components/piece-stock/home/apiMethod/apiList"

const Search = ({ cardData, setCardData, value, setValue, setPage, wishInfo, setWishInfo }) => {
    const [searchInfo, setSearchInfo] = useState([]);
    const [selectedStocks, setSelectedStocks] = useState([]);

    useEffect(() => {
        searchCardInfo(setCardData)
    }, []);

    const cardId = cardData[0]?.cardSequenceId

    return (
        <div className="p-4 h-screen overflow-scroll [&::-webkit-scrollbar]:hidden">
            <SearchHeader setValue={setValue} setSearchInfo={setSearchInfo} searchInfo={searchInfo} value={value} setPage={setPage} />

            {cardId !== undefined && <SearchBody searchInfo={searchInfo} setSelectedStocks={setSelectedStocks} selectedStocks={selectedStocks} />}

            {cardId !== undefined && <SearchBottom selectedStocks={selectedStocks} cardId={cardId} setPage={setPage} wishInfo={wishInfo} setWishInfo={setWishInfo} searchInfo={searchInfo} />}
        </div>
    );
}

export default Search