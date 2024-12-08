'use client'

import { CiTrophy } from "react-icons/ci";
import { MdAccountCircle } from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { RiExchangeDollarLine } from "react-icons/ri";

const HamburgerMenu = ({ hamburgerMenuOpen, setHamburgerMenuOpen }) => {
    const router = useRouter();

    const routePage = (path) => {
        router.push(path);
        setHamburgerMenuOpen(false);
    }

    const menuItems = [
        { title: "혜택변경", icon: <RiExchangeDollarLine />, path: "/benefit-change" },
        { title: "복권", icon: <CiTrophy />, path: "/lotto" },
        { title: "Q&A", icon: <FaQuestionCircle />, path: "/qna" },
        { title: "마이페이지", icon: <MdAccountCircle />, path: "/my-page" },
    ];

    return (
        <>

            {hamburgerMenuOpen
                ?
                <div
                    className="w-full h-full absolute inset-0 right-0"
                    onClick={() => setHamburgerMenuOpen(false)}
                >

                    <div
                        className="absolute bottom-[4rem] right-0 w-44 bg-white border rounded-t-lg shadow-lg flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div>
                            {menuItems.map((item, index) => {
                                return (
                                    <div
                                        className="flex justify-start items-center text w-44 h-12 border-b-2 cursor-pointer"
                                        onClick={() => routePage(item.path)}
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

                </div>
                : <></>
            }
        </>
    );
}

export default HamburgerMenu;