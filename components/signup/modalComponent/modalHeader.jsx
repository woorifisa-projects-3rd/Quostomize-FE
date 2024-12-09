import React from 'react'

const ModalHeader = ({maxLength, number1}) => {
  return (
    <div className="flex justify-center space-x-3 mb-20">
        {Array(maxLength)
        .fill(0)
        .map((_, idx) => (
            <div
                key={idx}
                className={`w-2 h-2 rounded-full ${idx < number1?.length ? 'bg-gray-300' : 'bg-gray-600'
                    }`}
            />
        ))}
      </div>
  )
}

export default ModalHeader