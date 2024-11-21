"use client"

import React from "react";
import ExitButton from "../button/exit-button";

function Header2({ children, exitDirection }) {
    return (
        <div className="flex justify-between items-end p-8">

            <div className="font2 font-bold">
                {children}
            </div>

            <ExitButton direction={exitDirection} />
        </div>
    );
}

export default Header2;