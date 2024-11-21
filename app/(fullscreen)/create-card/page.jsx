"use client"

import SelectPoint1 from '../../../components/create-card/select-point/select-point1';
import SelectPoint2 from '../../../components/create-card/select-point/select-point2';
import CreateCardBottom from '../../../components/create-card/create-card-bottom';
import SelectCardImage from '../../../components/create-card/card-detail/select-card-image';
import SelectCardDetail from '../../../components/create-card/card-detail/select-card-detail';

import React, { useState } from "react";

const CreateCardPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage > 1 ? prevPage - 1 : prevPage);
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      justifyContent: "space-between",
    },
    content: {
      flex: 1,
      overflowY: "auto",
    },
  };

  // 현재 페이지에 따라 렌더링할 콘텐츠
  const renderContent = () => {
    switch (currentPage) {

      case 1:
        return <div>
          <header>
            <SelectPoint1 onClick={handlePrevPage} />
          </header>

        </div>;

      case 2:
        return <div>
          <header>
            <SelectPoint1 onClick={handlePrevPage} />
          </header>
        </div>;

      case 3:
        return <div>
          <header>
            <SelectPoint1 onClick={handlePrevPage} />
          </header>
          <SelectPoint2 />
        </div>;

      case 4:
        return <div>
          <header>
            <SelectPoint1 onClick={handlePrevPage} />
          </header>
          <SelectCardImage />
          <SelectCardDetail />
        </div>;



    }
  };


  return (
    <div>
      <div style={styles.content}>{renderContent()}</div>
      <CreateCardBottom onClick={handleNextPage} />
    </div>
  );
}

export default CreateCardPage;