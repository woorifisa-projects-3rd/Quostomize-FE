import React from 'react'

const ChevronButton = ( {onClick, classNameProps, children } ) => {
  return (
    <div>
        <button
        onClick={onClick}
        className={classNameProps}
        >
            {children}
        </button>
    </div>
  )
}

export default ChevronButton