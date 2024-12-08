import React from 'react'

const ModalData = ({ number, onClick }) => {
  return (

    <button
      onClick={onClick}
      className="text-2xl"
    >
      {number}
    </button>

  )
}

export default ModalData