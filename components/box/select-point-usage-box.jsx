"use client"

import React, { useState } from 'react'

function SelectPointUsageBox({ title, description, icon, isActive, isHovered, onBoxClick, onBoxHover }) {
    return (
        <div
            className={`select-point-usage-box ${isActive ? 'active' : ''} ${isHovered ? 'hovered' : ''
                } cursor-pointer`}
            onClick={onBoxClick}
            onMouseEnter={onBoxHover}
            onMouseLeave={onBoxHover}
        >
            <div className="flex justify-between">
                <div className="content">
                    <h3 className="font2 title">{title}</h3>
                    <p className="font1 description">{description}</p>
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