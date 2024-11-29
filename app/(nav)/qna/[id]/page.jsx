'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Icons from '../../../../public/icons/icons'
import Image from 'next/image';

export default function QnaDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { data: session } = useSession();
    const [question, setQuestion] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [newAnswer, setNewAnswer] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const isAdmin = session?.user?.role === 'ROLE_ADMIN';
    const isMember = session?.user?.role === 'ROLE_MEMBER';
    const isOldMember = session?.user?.role === 'ROLE_OM';
    const isSuspendedMember = session?.user?.role === 'ROLE_SM';

    useEffect(() => {
        if (!session) {
            router.push('/login');
            return;
        }

        if (isSuspendedMember) {
            router.push('/access-denied');
            return;
        }

        fetchQuestionDetail();
    }, [session, isSuspendedMember]);

    const fetchQuestionDetail = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/qna/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const result = await response.json();
            setQuestion(result.data);
    
            try {
                const answerResponse = await fetch(`/api/qna/${id}/answer`, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (answerResponse.ok) {
                    const answerData = await answerResponse.json();
                    setAnswer(answerData.data);
                }
            } catch (error) {
                console.log('No answer yet');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmitAnswer = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/qna/${id}/submit-answer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ responseContent: newAnswer }),
            });

            if (response.ok) {
                await fetchQuestionDetail();
                setNewAnswer('');
            }
        } catch (error) {
            console.error('Error:', error);
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

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen select-none">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!question) return null;

    // 날짜 포맷팅 함수 수정
    const formatDate = (date) => {
        if (!date) return '';
        return new Date(date).toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="max-w-3xl mx-auto px-6 py-8">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                {/* 상단 정보 영역 */}
                <div className="flex flex-col gap-4">
                    {/* 메타 정보 */}
                    <div className="flex items-center justify-between gap-2 text-sm text-gray-500">
                        {/* 카테고리 */}
                        <span className="px-3 py-1 bg-blue-100 rounded-full">
                            {getCategoryName(question.categoryCode)}
                        </span>
                        
                        {/* 답변 상태 */}
                        <span className={`px-3 py-1 rounded-full ${
                            question.isAnswered 
                                ? 'bg-blue-200 text-blue-400' 
                                : 'bg-gray-200 text-gray-500'
                        }`}>
                            {question.isAnswered ? '답변완료' : '답변대기'}
                        </span>

                        {/* 비공개 여부 */}
                        {question.isPrivate && (
                            <span className="px-3 py-1 bg-stone-100 rounded-full">
                                <div className="flex items-center gap-1">
                                    <Image 
                                        src={Icons.locked}
                                        alt="Locked" 
                                        width={20}
                                        height={20} 
                                    />
                                    <span>비공개</span>
                                </div>
                            </span>
                        )}

                        {/* 작성일 - 맨 오른쪽으로 이동 */}
                        <span className="text-sm text-gray-500 ml-auto">
                            작성일: {formatDate(question.createdAt)}
                        </span>
                    </div>
    
                    {/* 제목 */}
                    <h1 className="text-xl font-bold text-gray-600 px-1">
                        {question.questionTitle}
                    </h1>
                </div>
    
                {/* 문의 내용 */}
                <div className="mt-5 prose max-w-none">
                    <div className="bg-neutral-50 rounded-lg p-4 whitespace-pre-wrap min-h-[160px]">
                        {question.questionContent}
                    </div>
                </div>
            </div>
    
            {/* 답변 영역 */}
            {answer && (
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <h2 className="text-lg font-bold">답변</h2>
                        <span className="text-sm text-gray-500">
                            {formatDate(answer.createdAt)}
                        </span>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-6">
                        <p className="whitespace-pre-wrap text-gray-700">
                            {answer.responseContent}
                        </p>
                    </div>
                </div>
            )}

            {isAdmin && !question.isAnswered && (
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <h2 className="text-lg font-bold mb-4">답변 작성</h2>
                    <form onSubmit={handleSubmitAnswer} className="space-y-4">
                        <textarea
                            value={newAnswer}
                            onChange={(e) => setNewAnswer(e.target.value)}
                            className="w-full p-4 border rounded-lg focus:ring-2 
                                    focus:ring-blue-500 focus:border-transparent
                                    outline-none transition-all duration-200
                                    min-h-[160px] resize-y"
                            placeholder="답변을 입력하세요..."
                            required
                        />
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-6 py-2.5 bg-blue-500 text-white rounded-lg
                                        hover:bg-blue-600 transition-colors duration-200
                                        flex items-center gap-2"
                            >
                                <span>답변 등록</span>
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {isOldMember && (
                <div className="bg-yellow-50 rounded-xl p-4 mb-6">
                    <p className="text-yellow-800">
                        탈퇴한 회원은 제한된 기능만 이용할 수 있습니다.
                    </p>
                </div>
            )}
            
            {/* 하단 버튼 */}
            <div className="flex justify-end items-center mt-8">
                <button
                    onClick={() => router.push('/qna')}
                    className="px-6 py-1.5 border border-gray-300 rounded-xl text-gray-500
                            hover:bg-gray-100 transition-colors duration-200
                            flex items-center gap-2"
                >
                    <span>이전</span>
                </button>
            </div>
        </div>
    );
}