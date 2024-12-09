'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Pagination from './Pagination';
import Icons from '../../../public/icons/icons'
import Image from 'next/image';
import LoadingSpinner from '../../../components/overlay/loadingSpinner';

export default function QnaPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [questions, setQuestions] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!session) {
            router.push('/login');
            return;
        }
        fetchQuestions();
    }, [currentPage, session]);

    const fetchQuestions = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/qna?page=${currentPage}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const result = await response.json();
            if (result.data) {
                setQuestions(result.data.content);
                // 백엔드에서 변경된 페이지 크기(5)에 맞춰 totalPages 계산
                setTotalPages(result.data.totalPages);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const getCategoryName = (code) => {
        const categories = {
            0: '카드',
            1: '주식',
            2: '보험',
            3: '펀드',
            4: '적금',
            5: '기타'
        };
        return categories[code] || '기타';
    };

    const formatDate = (date) => {
        if (!date) return '-';
        const d = new Date(date);
        const year = String(d.getFullYear()).slice(-2); // 연도의 마지막 2자리만 사용
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
    };

    if (isLoading) {
        return (
            <LoadingSpinner />
        );
    }

    return (
        <div className="max-w-2xl mx-auto px-3 sm:px-8 py-8 sm:py-8">
            {/* 헤더 영역 수정 */}
            <div className="flex justify-between items-center mb-6 sm:mb-8">
                <div className="flex items-center">
                    <Image
                        src="/wooriImages/woori_ci.png"
                        alt="Woori Logo"
                        width={40}
                        height={40}
                        className="object-contain"
                    />
                    <h1 className="text-3xl sm:text-3xl font-bold color1 ml-2">
                        QnA
                    </h1>
                </div>
                <button 
                    onClick={() => router.push('/qna/write')}
                    className="px-6 sm:px-7 py-2 bg-blue-200 text-gray-600 text-sm sm:text-base rounded-lg hover:bg-blue-400 transition-colors"
                >
                    문의하기
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* 질문 목록 헤더 */}
                <div className="grid grid-cols-12 bg-blue-50 p-3 sm:p-4 text-xs sm:text-sm font-medium text-gray-500">
                    <div className="col-span-1">번호</div>
                    <div className="col-span-2">카테고리</div>
                    <div className="col-span-5">제목</div>
                    <div className="col-span-2">작성일</div>
                    <div className="col-span-2">답변상태</div>
                </div>

                {/* 질문 목록 */}
                {questions.length > 0 ? (
                    questions.map((question) => (
                        <div 
                            key={question.questionSequenceId}
                            className="grid grid-cols-12 px-4 py-6 sm:p-6 border-b hover:bg-gray-100 cursor-pointer transition-colors"
                            onClick={() => router.push(`/qna/${question.questionSequenceId}`)}
                        >
                            <div className="col-span-1 text-gray-400 text-sm sm:text-base">{question.questionSequenceId}</div>
                            <div className="col-span-2 text-sm sm:text-base">{getCategoryName(question.categoryCode)}</div>
                            <div className="col-span-5 flex items-center text-gray-800 text-sm sm:text-base">
                                <div className="flex items-center w-full overflow-hidden">
                                    {question.isPrivate && (
                                        <span className="flex-shrink-0 mr-1">
                                            <Image 
                                                src={Icons.locked}
                                                alt="Locked" 
                                                width={18} 
                                                height={18}
                                                className="sm:w-[20px] sm:h-[20px]" 
                                            />
                                        </span>
                                    )}
                                    <span className="truncate">
                                        {question.questionTitle}
                                    </span>
                                </div>
                            </div>
                            <div className="col-span-2 text-gray-400 text-[12px] sm:text-base mt-1 sm:mt-0">{formatDate(question.createdAt)}</div>
                            <div className="col-span-2 text-right">
                                <span className={`px-1 sm:px-3 py-1 rounded-lg sm:rounded-xl text-[11px] sm:text-sm ${
                                    question.isAnswered 
                                        ? 'bg-blue-200 text-blue-500' 
                                        : 'bg-gray-200 text-gray-500'
                                }`}>
                                    {question.isAnswered ? '답변완료' : '답변대기'}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-8 text-center text-gray-500">
                        등록된 문의사항이 없습니다.
                    </div>
                )}
            </div>

            {questions.length > 0 && totalPages > 1 && (
            <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
            )}
        </div>
    );
}