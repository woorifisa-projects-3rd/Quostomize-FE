'use client'
import { Button } from '@headlessui/react'
import Link from 'next/link'

function MyFullButton({ children, href }) {
    return (
        <Link href={href}>
            <Button className="rounded bg-blue-600 py-2 px-4 text-sm text-white data-[hover]:bg-blue-500 data-[active]:bg-sky-700">
                {children}
            </Button>
        </Link>
    )
}

export default MyFullButton