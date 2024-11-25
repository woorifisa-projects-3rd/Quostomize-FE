'use client'

import { Transition, TransitionChild } from "@headlessui/react";
import { Fragment } from "react";

const HamburgerMenu = ({hamburgerMenuOpen, setHamburgerMenuOpen, onClose}) => {
    return (
        // <div className="absolute w-36 h-60 right-0 bottom-16 bg-slate-300 rounded-tl-xl">
        //     전체메뉴
        // </div>
    <Transition show={hamburgerMenuOpen} as={Fragment}>
        <div 
            className="sticky inset-0 flex items-end justify-center w-36 h-60 z-20"
            onClick={() => setHamburgerMenuOpen(false)}
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
                <div className="w-36 h-60 absolute translate-x-60 bg-white border rounded-t-lg">
                </div>
            </TransitionChild>
        </div>
    </Transition>
    );
}

export default HamburgerMenu;