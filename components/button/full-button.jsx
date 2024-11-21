'use client'
import { Button } from '@headlessui/react'
import Link from 'next/link'

function MyFullButton({ children, href }) {
    return (
        <Link href={href} className='block w-80'>
            <Button className="font-bold font2 w-full rounded bg-blue-600 py-3 px-3 text-white data-[hover]:bg-blue-500 data-[active]:bg-sky-700">
                {children}
            </Button>
        </Link>
    )
}

export default MyFullButton