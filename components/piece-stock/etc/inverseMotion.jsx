import React from 'react'

const inverseMotion = ({ hoveredIndex, index, children, onClick }) => {
    return (
        <div
            className={`absolute right-0 bg-red-500  text-white px-4 py-2.5 transform  transition-all duration-500 ease-in-out hover:bg-red-600 active:bg-red-700
flex items-center justify-center" ${hoveredIndex[index].order === 1 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
            onClick={onClick}
        >
            {children}
        </div>
    )
}

export default inverseMotion