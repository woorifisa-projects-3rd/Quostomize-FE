'use client'
import { Button } from '@headlessui/react'

function MyFullSubmitButton({ children, action }) {
    return (
        <form action={action} method='POST'>
            <Button
                type='submit'
                className="rounded bg-blue-600 py-2 px-4 text-sm text-white data-[hover]:bg-blue-500 data-[active]:bg-sky-700">
                {children}
            </Button>
        </form>
    )
}

export default MyFullSubmitButton