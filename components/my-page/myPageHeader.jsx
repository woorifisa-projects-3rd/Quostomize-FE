'use client'

import 'material-icons/iconfont/material-icons.css';
import { useRouter } from 'next/navigation';

const MyPageHeader = () => {
  const router = useRouter();
  return (
    <div className="w-full h-20 px-4 bg-white">
      <div className="flex h-full justify-between items-center">
        <span 
          className="material-icons cursor-pointer"
          onClick={() => router.back()}
        >
            arrow_back_ios
          </span> 
        <div className="text-2xl">내 정보 페이지</div>
        <div></div>
      </div>
    </div>
  );
}

export default MyPageHeader;