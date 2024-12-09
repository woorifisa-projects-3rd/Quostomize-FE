'use client'

import { useEffect, useState } from "react";
import NavButton from "./navButton";
import { usePathname, useRouter } from "next/navigation";
import HamburgerMenu from "./hamburgerMenu";

const Nav = ({menuItems}) => {
  const router = useRouter();
  const pathName = usePathname();
  const [currentPath, setPath] = useState("");
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);
  const selectMenu = (path) => {
    router.push(path);
  }

  // 현재 path를 감지해서 선택된 메뉴 변경
  useEffect(() => {
    setPath((prev) => {
      if (prev !== pathName) {
        return pathName;
      } else {
        return prev;
      }
    });
  },[pathName])

  return (
    <>
      <div className="sticky z-10 bottom-0 right-0 h-16 bg-slate-50 flex justify-around items-center">
        {menuItems.map((item, index) => {
          return <NavButton iconTitle={item.title} icon={item.icon} path={item.path} currentPath={currentPath} selectMenu={selectMenu} setHamburgerMenuOpen={setHamburgerMenuOpen} key={index}/>;
        })}
        <HamburgerMenu hamburgerMenuOpen={hamburgerMenuOpen} setHamburgerMenuOpen={setHamburgerMenuOpen}/>
      </div>
    </>
  );
}

export default Nav;