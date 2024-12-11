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
    const isAdmin = session?.memberRole === 'ROLE_ADMIN';
    const isMember = session?.memberRole === 'ROLE_MEMBER';
    const isOldMember = session?.memberRole === 'ROLE_OM';
    const isSuspendedMember = session?.memberRole === 'ROLE_SM';

    useEffect(() => {
        if (!session) {
            router.push('/login');
            return;
        }
        fetchQuestionDetail();
    }, [session]);

    const fetchQuestionDetail = async () => {
        setIsLoading(true);
        try {
            // 질문 정보 가져오기
            const questionResponse = await fetch(`/api/qna/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            if (questionResponse.ok) {
                const questionResult = await questionResponse.json();
                setQuestion(questionResult.data);
            } else {
                return;
            }
    
            // 답변 정보 가져오기
            const answerResponse = await fetch(`/api/qna/${id}/answer`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            if (answerResponse.ok) {
                const answerData = await answerResponse.json();
                setAnswer(answerData.data);
            } else {
                // 답변이 없을 경우
                setAnswer(null);
            }
        } catch (error) {
            console.error('Error fetching question or answer:', error);
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
            1: '카드',
            2: '주식',
            3: '보험',
            4: '펀드',
            5: '적금',
            6: '기타'
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
        <div className="max-w-xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            <div className="bg-blue-50 rounded-xl shadow-lg p-4 sm:p-6 mb-4 mt-3 sm:mb-6">
                {/* 상단 정보 영역 */}
                <div className="flex flex-col gap-3 sm:gap-4">
                    {/* 메타 정보 */}
                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-500">
                        {/* 카테고리 */}
                        <span className="px-2 sm:px-3 py-1 bg-sky-200 rounded-full">
                            {getCategoryName(question.categoryCode)}
                        </span>
                        
                        {/* 답변 상태 */}
                        <span className={`px-2 sm:px-3 py-1 rounded-full ${
                            question.isAnswered ? 'bg-blue-300 text-blue-500' : 'bg-gray-300 text-gray-500'
                        }`}>
                            {question.isAnswered ? '답변완료' : '답변대기'}
                        </span>

                        {/* 비공개 여부 */}
                        {question.isPrivate && (
                            <span className="px-2 sm:px-3 py-1 bg-slate-300 rounded-full">
                                <div className="flex items-center gap-1">
                                    <Image 
                                        src={Icons.locked} 
                                        alt="Locked" 
                                        width={16}
                                        height={16}
                                        className="sm:w-[20px] sm:h-[20px]"
                                    />
                                    <span className="text-xs sm:text-sm">비공개</span>
                                </div>
                            </span>
                        )}

                        {/* 작성일 */}
                        <span className="text-[11px] sm:text-sm text-gray-500 ml-auto">
                            작성일: {formatDate(question.createdAt)}
                        </span>
                    </div>

                    {/* 제목 */}
                    <h1 className="text-base sm:text-xl font-bold text-gray-600 px-1">
                        {question.questionTitle}
                    </h1>
                </div>

                {/* 문의 내용 */}
                <div className="mt-4 sm:mt-5 prose max-w-none">
                    <div className="bg-white border border-blue-100 rounded-lg p-3 sm:p-4 whitespace-pre-wrap min-h-[120px] sm:min-h-[160px] text-sm sm:text-base">
                        {question.questionContent}
                    </div>
                </div>
            </div>

            {/* 답변 영역 */}
            {answer && answer.responseContent && (
                <div className="bg-gray-100 rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                        <h2 className="text-base sm:text-xl font-bold text-gray-500 px-1">관리자 답변</h2>
                        <span className="text-xs sm:text-sm text-gray-500">
                            {formatDate(answer.createdAt)}
                        </span>
                    </div>
                    <div className="bg-white border border-gray-300 rounded-lg p-4 sm:p-4 min-h-[120px] sm:min-h-[160px] text-sm sm:text-base">
                        <p className="whitespace-pre-wrap text-sm sm:text-base text-gray-700">
                            {answer.responseContent}
                        </p>
                    </div>
                </div>
            )}

            {isAdmin && !question.isAnswered && (
                // 답변이 작성되지 않은 경우에만 답변 입력 폼 표시
                <div className="bg-gray-100 rounded-xl shadow-lg p-6 mb-6">
                    <h2 className="text-base sm:text-xl font-bold text-gray-600 px-1 mb-4">답변 작성</h2>
                    <form onSubmit={handleSubmitAnswer} className="space-y-4">
                        <textarea
                            value={newAnswer}
                            onChange={(e) => setNewAnswer(e.target.value)}
                            className="bg-white w-full p-3 border rounded-lg focus:ring-2 
                                    focus:ring-gray-300 focus:border-transparent
                                    outline-none transition-all duration-200
                                    min-h-[120px] sm:min-h-[160px] resize-y"
                            placeholder="답변을 입력하세요"
                            required
                        />
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-gray-400 text-white rounded-lg text-sm sm:text-base
                                        hover:bg-gray-500 transition-colors duration-200
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
                    className="px-5 sm:px-6 py-1.5 bg-slate-100 border border-gray-300 rounded-xl text-gray-500
                            hover:bg-slate-200 transition-colors duration-200
                            flex items-center gap-2 text-sm sm:text-lg"
                >
                    <span>이전</span>
                </button>
            </div>
        </div>
    );
}
