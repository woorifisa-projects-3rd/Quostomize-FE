'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function QnaWritePage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        isPrivate: false,
        categoryCode: '',
        questionTitle: '',
        questionContent: ''
    });

    useEffect(() => {
        if (!session) {
            router.push('/login');
        }
    }, [session]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        try {
            const response = await fetch('/api/qna', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            
            if (response.ok) {
                router.push('/qna');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-3 sm:px-6 py-8">
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                <h1 className="text-2xl font-bold mb-8 text-blue-400">문의하기</h1>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            카테고리
                        </label>
                        <select
                            value={formData.categoryCode}
                            onChange={(e) => setFormData({...formData, categoryCode: Number(e.target.value)})}
                            className="w-full p-2 sm:p-3 text-sm sm:text-base border rounded-xl bg-neutral-50 focus:bg-white 
                                    focus:border-blue-400 outline-none transition-all"
                            required
                        >
                            <option value="">선택해주세요</option>
                            <option value="0">카드</option>
                            <option value="1">주식</option>
                            <option value="2">보험</option>
                            <option value="3">펀드</option>
                            <option value="4">적금</option>
                            <option value="5">기타</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            제목
                        </label>
                        <input
                            type="text"
                            value={formData.questionTitle}
                            onChange={(e) => setFormData({...formData, questionTitle: e.target.value})}
                            className="w-full p-2 sm:p-3 text-sm sm:text-base border rounded-xl bg-neutral-50 focus:bg-white 
                                    focus:border-blue-400 outline-none transition-all"
                            maxLength={30}
                            placeholder="제목을 입력해주세요"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            내용
                        </label>
                        <textarea
                            value={formData.questionContent}
                            onChange={(e) => setFormData({...formData, questionContent: e.target.value})}
                            className="w-full p-3 border text-sm sm:text-base rounded-xl bg-neutral-50 focus:bg-white 
                                    focus:border-blue-400 outline-none transition-all min-h-[130px] sm:min-h-[160px]"
                            placeholder="문의하실 내용을 입력해주세요"
                            required
                        />
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="isPrivate"
                            checked={formData.isPrivate}
                            onChange={(e) => setFormData({...formData, isPrivate: e.target.checked})} 
                            className="w-4 h-4 text-blue-400 rounded border-gray-700 
                                    focus:ring-blue-500"
                        />
                        <label htmlFor="isPrivate" className="ml-2 text-sm text-gray-700">
                            비공개 문의
                        </label>
                    </div>

                    <div className="flex gap-8 sm:gap-12 mt-8">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="flex-1 py-1 sm:py-2 border border-gray-300 rounded-xl 
                                    hover:bg-gray-100 transition-all"
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 py-1 sm:py-2 bg-blue-400 text-white rounded-xl 
                                    hover:bg-blue-500 transition-all
                                    disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? '등록 중...' : '등록하기'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}