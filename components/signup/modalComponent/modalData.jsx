import React from 'react'

const ModalData = ({number, onClick}) => {
  return (
    <div key={`button-${number}`}>
        <button
        onClick={onClick}
        className="text-2xl"
        >
        {number}
        </button>
    </div>
  )
}

export default ModalData