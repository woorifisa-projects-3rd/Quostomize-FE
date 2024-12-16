'use client';

import Lottie from "../lottie/lottieComponent";
import WarningLottie from "../../public/lotties/warning.json"

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
      <div className='flex flex-col justify-center items-center bg-white p-6 rounded-xl'>
        <div className="font2 font-bold">{title}</div>
        <Lottie animationData={WarningLottie} loop={false} />
        <div className="text-gray-500">{description}</div>
      </div>
    </div>
  )
}

export default ForbiddenModal