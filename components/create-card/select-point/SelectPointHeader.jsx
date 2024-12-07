import React from 'react'
import Header from "../../header/PageHeader";


function SelectPoint1({ onClick }) {

  return (

    <div>
      <Header
        modaltitle="카드 생성"
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