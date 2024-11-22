import React from 'react'
import Header from "../../header/prev-name-exit";


function SelectPoint1({ onClick }) {
  console.log("onClick received:", onClick);

  return (

    <div>
      <Header
        showArrowButton={true}
        onArrowClick={onClick}
        exitDirection="/home"
      >
        포인트 사용 옵션 선택
      </Header>
    </div>
  )
}

export default SelectPoint1