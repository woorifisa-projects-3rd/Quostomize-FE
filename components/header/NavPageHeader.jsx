"use client"

import React from "react";

function NavPageHeader({ children }) {
    return (
        <div className="flex justify-between items-center p-6 w-full">
            <div className="font3 font-bold mx-auto">
                {children}
            </div>
        </div>
    );
}

export default NavPageHeader;
