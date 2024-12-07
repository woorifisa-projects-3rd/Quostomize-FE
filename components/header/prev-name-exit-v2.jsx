"use client"

import React from "react";
import ArrowButtonV2 from "../button/arrow-button-v2";
import ExitButtonV2 from "../button/exit-button-v2";

function HeaderV2({ children, onArrowClick, exitDirection, showArrowButton }) {
    return (
        <div className="flex justify-between items-center p-6 w-full">
            {showArrowButton && (
                <ArrowButtonV2 direction="prev" onClick={onArrowClick} />
            )}

            <div className="font3 font-bold mx-auto">
                {children}
            </div>

            <ExitButtonV2 direction={exitDirection} />
        </div>
    );
}

export default HeaderV2;
