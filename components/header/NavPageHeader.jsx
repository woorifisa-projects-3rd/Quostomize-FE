"use client"

import React from "react";

function NavPageHeader({ children }) {
    return (
        <div className="flex justify-between items-center p-8 w-full">
            <div className="font3 font-bold mx-auto" style={{
                letterSpacing: '0.05em'
            }}>
                {children}
            </div>
        </div>
    );
}

export default NavPageHeader;
