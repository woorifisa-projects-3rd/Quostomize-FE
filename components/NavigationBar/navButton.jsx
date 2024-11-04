'use client'

import 'material-icons/iconfont/material-icons.css';

const NavButton = ({iconTitle, iconName, path, currentPath, selectMenu}) => {

  if (path === currentPath) {
    return (
      <div 
      className="flex flex-col justify-center items-center w-12 h-12 bg-slate-900 rounded-xl text-white"
      onClick={() => {selectMenu(path)}}
      >
        <span className="material-icons">{iconName}</span>
        <span>{iconTitle}</span>
      </div>
    );
  } else {
    return (
      <div 
      className="flex flex-col justify-center items-center w-12 h-12"
      onClick={() => {selectMenu(path)}}
      >
        <span className="material-icons">{iconName}</span>
        <span>{iconTitle}</span>
      </div>
    );
  }
}

export default NavButton;