import React from 'react'
import NavPageHeader from "../header/NavPageHeader";

function MyCardHeader({ onClick }) {
  return (

    <div className='sticky top-0 left-0 bg-white z-20'>
      <NavPageHeader>
        카드
      </NavPageHeader>
    </div>
  )
}

export default MyCardHeader