import React from 'react'
import Header from "../header/prev-name-exit";

function SelectPoint1() {

  const handleArrowClick = (direction) => {
  };

  return (

    <div>
      <Header
        showArrowButton={true}
        onArrowClick={handleArrowClick}
        exitDirection="/home"
      >
        포인트 사용 옵션 선택
      </Header>
    </div>
  )
}

export default SelectPoint1