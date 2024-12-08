import React from 'react'

const inverseMotion = ({ hoveredIndex, index, onClick, children }) => {
    return (
        <div className={`absolute right-0 bg-red-500 h-full top-0 rounded-lg text-[#FFFFFF] font-semibold px-4 transform  transition-all duration-500 ease-in-out 
flex items-center justify-center text-center" ${hoveredIndex[index]?.order === 1 ? 'translate-x-0 opacity-100 bg-[#B8B8B8] w-20' : 'translate-x-[100%] opacity-0'}`}
            onClick={onClick}>
            {children}
        </div>
    )
}

export default inverseMotion