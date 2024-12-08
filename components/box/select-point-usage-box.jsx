"use client"

import React from 'react'

function SelectPointUsageBox({ title, description, img, isActive, isHovered, onBoxClick, onBoxHover }) {
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
    const iconStyle = {
        width: '60px',
        height: '60px',
        objectFit: 'cover',
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
                    <h3 className="text-sm font-bold title">{title}</h3>
                    <p className="text-xs color4 mt-2 description" style={{ color: isActive ? '#ffffff' : '#000000' }}>{description}</p>
                </div>
                <div className="icon flex items-center">
                    <img
                        style={iconStyle}
                        className="block ml-auto"
                        src={img}
                        alt="img"
                    />
                </div>
            </div>
        </div>
    )
}

export default SelectPointUsageBox
