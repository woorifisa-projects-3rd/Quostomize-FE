'use client'

import { Transition, TransitionChild } from "@headlessui/react";
import { Fragment } from "react";

const Toast = ({ isOpen, message }) => {
    return (
        <Transition show={isOpen} as={Fragment}>
            <div className="fixed left-1/2 transform -translate-x-1/2 w-auto bottom-0 bg-red-500 text-white p-6 rounded-t-lg shadow-lg z-50">
                <TransitionChild
                    as={Fragment}
                    enter="transition ease-out duration-300"
                    enterFrom="transform translate-y-full opacity-0"
                    enterTo="transform translate-y-0 opacity-100"
                    leave="transition ease-in duration-200"
                    leaveFrom="transform translate-y-0 opacity-100"
                    leaveTo="transform translate-y-full opacity-0"
                >
                    <div className="text-center">
                        <span className="font-bold">알 림</span>
                        <p>{message}</p>
                    </div>
                </TransitionChild>
            </div>
        </Transition>
    );
}

export default Toast;
