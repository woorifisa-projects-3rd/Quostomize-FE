"use client"

import React from "react";
import ArrowButton from "../button/arrow-button";
import ExitButton from "../button/exit-button";

function Header1({ children, onArrowClick, exitDirection }) {
    return (
        <div className="flex justify-between p-8">

            <ArrowButton direction="prev" onClick={() => onArrowClick("prev")} />

            <div className="font2 font-bold">
                {children}
            </div>

            <ExitButton direction={exitDirection} />
        </div>
    );
}

export default Header1;
