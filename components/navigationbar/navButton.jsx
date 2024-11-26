'use client'

import 'material-icons/iconfont/material-icons.css';

const NavButton = ({iconTitle, icon, path, currentPath, selectMenu, setHamburgerMenuOpen}) => {

  if (iconTitle === "전체") {
    return <div 
        className="flex flex-col justify-center items-center w-12 h-12 active:bg-slate-400 active:text-white cursor-context"
        onClick={() => {setHamburgerMenuOpen((prev) => !prev)}}
      >
        <div className='text-xl'>
          {icon}
        </div>
        <span className='font-bold'>{iconTitle}</span>
      </div>
  } else if (path === currentPath) {
    return (
      <div 
        className="flex flex-col justify-center items-center w-12 h-12 bg-slate-900 rounded-xl text-white cursor-pointer"
        onClick={() => {selectMenu(path)}}
      >
        <div className='text-xl'>
          {icon}
        </div>
        <span className='font-bold'>{iconTitle}</span>
      </div>
    );
  } else {
    return (
      <div 
      className="flex flex-col justify-center items-center w-12 h-12 cursor-pointer"
      onClick={() => {selectMenu(path)}}
      >
        <div className='text-xl'>
          {icon}
        </div>
        <span>{iconTitle}</span>
      </div>
    );
  }
}

export default NavButton;