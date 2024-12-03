'use client'

import { Transition, TransitionChild } from "@headlessui/react";
import { Fragment } from "react";
import { MdCurrencyExchange, MdAccountCircle } from "react-icons/md";
import { FaTrophy } from "react-icons/fa6";
import { FaQuestionCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

const HamburgerMenu = ({hamburgerMenuOpen, setHamburgerMenuOpen}) => {
    const router = useRouter();

    const routePage = (path) => {
        router.push(path);
        setHamburgerMenuOpen(false);
    }

    const menuItems = [
        {title: "혜택변경", icon: <MdCurrencyExchange />, path:"/benefit-change" },
        {title: "복권", icon: <FaTrophy />, path:"/lotto" },
        {title: "Q&A", icon: <FaQuestionCircle />, path:"/qna" },
        {title: "마이페이지", icon: <MdAccountCircle />, path:"/my-page" },
        ];

    return (
    <Transition show={hamburgerMenuOpen} as={Fragment}>
        <div 
            className="w-[36rem] h-full absolute inset-0 right-0"
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
                <div 
                    className="absolute bottom-[3.75rem] right-0 w-44 bg-white border rounded-t-lg shadow-lg flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div>
                        {menuItems.map((item, index) => {
                                return (
                                    <div 
                                        className="flex justify-start items-center text-2xl w-44 h-12 border-b-2 cursor-pointer"
                                        onClick = {() => routePage(item.path)}
                                        key={index}
                                    >
                                        <div className="ml-4">
                                            {item.icon}

                                        </div>
                                        <div className="ml-4" >
                                            {item.title}
                                        </div>
                                    </div>
                                )
                            }
                        )}
                    </div>
                </div>
            </TransitionChild>
        </div>
    </Transition>
    );
}

export default HamburgerMenu;