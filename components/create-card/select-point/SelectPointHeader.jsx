import React from 'react'
import PageHeader from "../../header/PageHeader";


function SelectPoint1({ onClick }) {
  console.log("onClick received:", onClick);

  return (

    <div>
      <PageHeader
        modaltitle="카드 생성"
        showArrowButton={true}
        onArrowClick={onClick}
        exitDirection="/home"
      >
        포인트 사용 옵션 선택
      </PageHeader>
    </div>
  )
}

export default SelectPoint1