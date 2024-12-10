'use client';

import Image from 'next/image';
import Icons from '../../public/icons/icons';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ForbiddenModal = ({title, description, goal}) => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(`/${goal}`);
    }, 2000);

    // 컴포넌트 언마운트 시 타이머 정리
    return () => clearTimeout(timer);
  }, []); // 빈 의존성 배열: 컴포넌트 마운트 시 한 번만 실행

  return (
    <div className="fixed inset-0 flex w-screen h-full bg-black/15 items-center justify-center p-2 z-50">
      <div className='flex flex-col justify-center items-center w-5/6 bg-white p-2 rounded-xl'>
        <div className="font2 font-bold">{title}</div>
        <Image src={Icons.warning} width={200} height={200} alt='경고 아이콘'/>
        <div className="text-gray-500">{description}</div>
      </div>
    </div>
  )
}

export default ForbiddenModal