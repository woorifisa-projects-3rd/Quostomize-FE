"use client"

import React from "react";
import { Button } from '@headlessui/react'

function CreateCardBottom({onClick}) {


    return (
        <div className='flex flex-col p-4 justify-center items-center'>
            <Button onClick={onClick} className="font-bold font2 w-full rounded bg-blue-600 py-3 px-3 text-white data-[hover]:bg-blue-500 data-[active]:bg-sky-700">
                다 음
            </Button>
        </div>
    )
}

export default CreateCardBottom