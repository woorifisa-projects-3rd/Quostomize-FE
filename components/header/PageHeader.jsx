"use client"

import React from "react";
import ArrowButton from "../button/arrow-button";
import ExitButton from "../button/exit-button";

function Header({ children, onArrowClick, exitDirection, showArrowButton, modaltitle, description }) {
    return (
        <div className="flex justify-between items-center p-8 w-full">
            {showArrowButton && (
                <ArrowButton direction="prev" onClick={onArrowClick} />
            )}

            <div className="font2 font-bold mx-auto">
                {children}
            </div>

            <ExitButton direction={exitDirection} title={modaltitle} description={description} />
        </div>
    );
}

export default Header;
