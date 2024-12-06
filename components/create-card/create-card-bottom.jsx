"use client"

import React from "react";
import { Button } from '@headlessui/react'

function CreateCardBottom({ onClick, currentPage, totalPage }) {
    const isLastPage = currentPage === totalPage;


    return (
        <div className='flex flex-col p-9 justify-center items-center'>
            <Button onClick={onClick}
                className={`font-bold font2 w-full rounded bg-blue-400 py-3 px-3 text-white ${isLastPage ? "data-[hover]:bg-green-500 data-[active]:bg-green-700" : "data-[hover]:bg-blue-500 data-[active]:bg-sky-600"}
                }`}>
                {isLastPage ? "완 료" : "다 음"}
            </Button>
        </div >
    )
}

export default CreateCardBottom