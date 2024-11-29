import React from 'react'
import HeaderV2 from "../header/prev-name-exit-v2";

function MyCardHeader({ onClick }) {
  return (

    <div>
      <HeaderV2
        showArrowButton={true}
        onArrowClick={onClick}
        exitDirection="/home"
      >
        나의 카드
      </HeaderV2>
    </div>
  )
}

export default MyCardHeader