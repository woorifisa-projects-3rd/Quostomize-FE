'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '../../../components/overlay/LoadingSpinner';

export default function FindIdPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [foundId, setFoundId] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(
          `/api/find-id?name=${encodeURIComponent(formData.name)}&phone=${encodeURIComponent(formData.phoneNumber)}`
      );
      const result = await response.json();
      
      if (!response.ok) {
          // 백엔드에서 전달하는 에러 메시지 처리
          if (result.message) {
              throw new Error(result.message);
          } else if (result.error) {
              throw new Error(result.message);
          } else {
              throw new Error('아이디를 찾을 수 없습니다.');
          }
      }

      // 성공적으로 데이터를 받았을 때
      if (result.data?.memberLoginId) {
          setFoundId(result.data.memberLoginId);
      } else {
          setError('일치하는 회원 정보가 없습니다.');
      }
  } catch (error) {
      // 에러 메시지 표시
      setError(error.message || '아이디 찾기에 실패했습니다.');
      console.error('Error:', error);
  } finally {
      setIsLoading(false);
  }
};

  const validatePhoneNumber = (number) => {
    return number.replace(/[^0-9]/g, '').slice(0, 11);
  };

  const handlePhoneNumberChange = (e) => {
    const value = validatePhoneNumber(e.target.value);
    setFormData(prev => ({ ...prev, phoneNumber: value }));
  };

  return (
    <div className="min-h-screen">
      <div className="w-full px-6 pt-12 pb-28">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold color1 mb-3">아이디 찾기</h1>
          <p className="text-base text-gray-900">
            이름과 전화번호를 입력해주세요.
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-x-0 -top-20">
          <div className="max-w-lg mx-auto px-5">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              {!foundId ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      이름
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-3 border rounded-xl bg-gray-50 focus:bg-white 
                                focus:border-blue-500 outline-none transition-all"
                      maxLength={20}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      전화번호
                    </label>
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handlePhoneNumberChange}
                      className="w-full p-3 border rounded-xl bg-gray-50 focus:bg-white 
                                focus:border-blue-500 outline-none transition-all"
                      placeholder="'-' 없이 입력해주세요"
                      maxLength={11}
                      required
                    />
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 bg-blue-400 text-white rounded-xl 
                              hover:bg-blue-500 transition-colors duration-200"
                  >
                    아이디 찾기
                  </button>
                </form>
              ) : (
                <div className="text-center space-y-6">
                  <h2 className="text-xl font-semibold">아이디 찾기 결과</h2>
                  <p className="text-gray-600">
                    회원님의 아이디는 <span className="font-bold text-blue-500">{foundId}</span> 입니다.
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => router.push('/login')}
                      className="flex-1 py-3 bg-blue-400 text-white rounded-xl 
                                hover:bg-blue-500 transition-colors duration-200"
                    >
                      로그인하기
                    </button>
                    <button
                      onClick={() => router.push('/find-password')}
                      className="flex-1 py-3 border border-gray-300 rounded-xl 
                                hover:bg-gray-50 transition-colors duration-200"
                    >
                      비밀번호 찾기
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isLoading && <LoadingSpinner message="아이디를 찾는 중입니다..." />}
    </div>
  );
}