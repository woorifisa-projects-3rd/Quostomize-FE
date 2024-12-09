"use client"

import React from "react";
import { Button } from '@headlessui/react'

function CreateCardBottom({ onClick, currentPage, totalPage }) {
    const isLastPage = currentPage === totalPage;
    const handleClick = () => {
        onClick();
        window.scrollTo(0, 0);
    };

    return (
        <div className='bg-gray-50 max-w-3xl mx-auto px-4 py-4 flex justify-center'>
            <Button onClick={handleClick}
                className={`text-lg font-bold w-full rounded-md bg-blue-400 p-2 sm:p-3 text-white ${isLastPage ? "data-[hover]:bg-blue-500 data-[active]:bg-blue-500" : "data-[hover]:bg-blue-500 data-[active]:bg-blue-600"}
                }`}>
                {isLastPage ? "카드 신청하기" : "다 음"}
            </Button>
        </div >
    )
}

export default CreateCardBottom