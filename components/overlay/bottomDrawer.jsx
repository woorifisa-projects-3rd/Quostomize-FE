'use client'

import { Transition, TransitionChild } from "@headlessui/react";
import { Fragment } from "react";

const BottomDrawer = ({isOpen, setIsOpen, onClose, children, title, description}) => {

    return (
        <Transition show={isOpen} as={Fragment}>
            <div 
                className="fixed inset-0 flex items-end justify-center w-screen bg-black/15 z-20"
                onClick={() => setIsOpen(false)}
            >
                <TransitionChild
                    as={Fragment}
                    enter="transition ease-out duration-300"
                    enterFrom="transform translate-y-full opacity-0"
                    enterTo="transform translate-y-0 opacity-100"
                    leave="transition ease-in duration-200"
                    leaveFrom="transform translate-y-0 opacity-100"
                    leaveTo="transform translate-y-full opacity-0"

                >
                    <div 
                        className="w-[36rem] h-72 sticky bg-white border rounded-t-lg px-8 py-6"
                        onClick={(e) => {e.stopPropagation()}}
                    >
                        <span className="font-bold">{title}</span>
                        <p>{description}</p>
                        {children}
                        <div className="flex gap-4 justify-end">
                            <button onClick={() => onClose()}>확인</button>
                            <button onClick={() => setIsOpen(false)}>취소</button>
                        </div>
                    </div>
                </TransitionChild>
            </div>
        </Transition>
    );
}

export default BottomDrawer;