"use client"

import React from 'react'

function SelectPointUsageBox({ title, description, icon, isActive, isHovered, onBoxClick, onBoxHover }) {
    const boxStyle = {
        backgroundColor: isActive ? '#007bff' : '#f0f0f0',
        color: isActive ? '#ffffff' : '#000000',
        cursor: 'pointer',
        transition: 'background-color 0.3s, color 0.3s',
        border: isHovered ? '2px solid #007bff' : 'none',
        padding: '10px',
        borderRadius: '8px',
        marginBottom: '10px',
    }

    return (
        <div
            style={boxStyle}
            onClick={onBoxClick}
            onMouseEnter={onBoxHover}
            onMouseLeave={onBoxHover}
        >
            <div className="flex justify-between p-4">
                <div className="content">
                    <h3 className="font3 font-bold title">{title}</h3>
                    <p className="font1 color4 mt-2 description">{description}</p>
                </div>
                <div className="icon flex items-center">
                    <img
                        width="80"
                        height="80"
                        className="block ml-auto"
                        src={icon}
                        alt="icon"
                    />
                </div>
            </div>
        </div>
    )
}

export default SelectPointUsageBox
