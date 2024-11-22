'use client'

import { useRouter } from 'next/navigation';

const BackButton = ({ children }) => {
    const router = useRouter();

    const handleBack = (children) => {
        if (children == '카드 소개로 돌아가기') { router.push('/home'); }
        else {
            router.back(); // 이전 페이지로 이동
        }
    };

    return (
        <button
            onClick={handleBack}
            className="absolute top-4 left-4 p-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700 transition font1 pl-4 pr-4"
        >
            &#8592; {children}
        </button>
    );
};

export default BackButton;
