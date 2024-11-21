import React from 'react'
import Header1 from "../header/prev-name-exit";

function SelectPoint1() {

  const handleArrowClick = (direction) => {
   };

  return (

    <div>
      <Header1
        onArrowClick={handleArrowClick}
        exitDirection="/home"
      >
        포인트 사용 옵션 선택
      </Header1>
    </div>
  )
}

export default SelectPoint1