'use client'

import 'material-icons/iconfont/material-icons.css';


const NavButton = ({iconTitle, icon, path, currentPath, selectMenu, setHamburgerMenuOpen}) => {

  if (iconTitle === "전체") {
    return <div 
        className="flex flex-col justify-center items-center w-12 h-12 text-gray-400 active:text-black cursor-context"
        onClick={() => {setHamburgerMenuOpen((prev) => !prev)}}
      >
        <div className='text-xl'>
          {icon}
        </div>
        <span className='text-xs'>{iconTitle}</span>
      </div>
  } else if (path === currentPath) {
    return (
      <div 
        className="flex flex-col justify-center items-center w-12 h-12 rounded-xl cursor-pointer font-bold"
        onClick={() => {selectMenu(path)}}
      >
        <div className='text-xl'>
          {icon}
        </div>
        <span className='text-xs font-bold'>{iconTitle}</span>
      </div>
    );
  } else {
    return (
      <div 
        className="flex flex-col justify-center items-center w-12 h-12 cursor-pointer text-gray-400"
        onClick={() => {selectMenu(path)}}
      >
        <div className='text-xl'>
          {icon}
        </div>
        <span className='text-xs'>{iconTitle}</span>
      </div>
    );
  }
}

export default NavButton;