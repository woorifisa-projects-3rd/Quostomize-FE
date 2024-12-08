'use client'
import { Button } from '@headlessui/react'
import Link from 'next/link'

function MyFullButton({ children, href }) {
    return (
        <Link href={href} className='block w-96 px-2'>
            <Button className="font-bold font2 w-full rounded bg-blue-500 p-2 sm:p-3 text-white data-[hover]:bg-blue-600 data-[active]:bg-blue-600">
                {children}
            </Button>
        </Link>
    )
}

export default MyFullButton