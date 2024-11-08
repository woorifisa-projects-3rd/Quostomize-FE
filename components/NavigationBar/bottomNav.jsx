'use client'

import { useEffect, useState } from "react";
import NavButton from "./navButton";
import { usePathname, useRouter } from "next/navigation";

const Nav = ({menuItems}) => {
  const router = useRouter();
  const pathName = usePathname();
  const [currentPath, setPath] = useState("");

  const selectMenu = (path) => {
    router.push(path);
    setPath(path);
  }

  // 현재 path를 감지해서 선택된 메뉴 변경
  useEffect(() => {
    setPath((prev) => {
      if (prev !== pathName) {
        return pathName.split("/").pop();
      } else {
        return prev;
      }
    });
  },[pathName])

  return (
    <div className="sticky bottom-0 right-0 h-16 bg-slate-300 flex justify-around items-center text-[0.6rem]">
      {menuItems.map((item, index) => {
          return <NavButton iconTitle={item.title} iconName={item.iconName} path={item.path} currentPath={currentPath} selectMenu={selectMenu} key={index}/>;
      })}
    </div>
  );
}

export default Nav;