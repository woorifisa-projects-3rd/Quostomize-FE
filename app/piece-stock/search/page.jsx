'use client'

import { useState } from "react";
import SearchHeader from "../../../components/piece-stock/search/header"
import SearchBody from "../../../components/piece-stock/search/body"
import SearchBottom from "../../../components/piece-stock/search/bottom"

const SearchPage = () => {
  const [value, setValue] = useState(""); // 입력값
  const [searchInfo, setSearchInfo] = useState([]);
  const [selectedStocks, setSelectedStocks] = useState([]);

  const cardId = 2

  return (
    <div className="p-4">
      <SearchHeader setValue={setValue} setSearchInfo={setSearchInfo} />

      <SearchBody searchInfo={searchInfo} setSelectedStocks={setSelectedStocks} selectedStocks={selectedStocks} />

      <SearchBottom selectedStocks={selectedStocks} cardId={cardId} />
    </div>
  );
}

export default SearchPage;