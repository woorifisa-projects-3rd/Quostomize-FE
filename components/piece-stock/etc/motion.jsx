import React from 'react'

const motion = ({ hoveredIndex, children, index }) => {
    return (
        <div className={`flex justify-between w-full transform  transition-all duration-500 ease-in-out ${hoveredIndex[index]?.order === 1 ? '-translate-x-20 opacity-100' : '-translate-x-0 opacity-100'}`}>
            {children}
        </div>
    )
}

export default motion