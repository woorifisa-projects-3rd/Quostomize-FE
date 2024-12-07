'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '../../../components/overlay/loadingSpinner';
import Image from 'next/image';

export default function FindIdPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [foundId, setFoundId] = useState(null);
  const [error, setError] = useState('');

  const formatPhoneNumber = (number) => {
    if (!number) return '';
    const cleanNumber = number.replace(/[^0-9]/g, '');
    const match = cleanNumber.match(/^(\d{3})(\d{3,4})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return cleanNumber;
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 11); // 숫자만 유지
    setFormData((prev) => ({ ...prev, phoneNumber: value }));
  };

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
        throw new Error(result.message || result.error || '아이디를 찾을 수 없습니다.');
      }

      if (result.memberLoginId) {
        setFoundId(result.memberLoginId);
        setError('');
      } else {
        setError('일치하는 회원 정보가 없습니다.');
      }
    } catch (error) {
      setError('아이디 찾기에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="w-full px-6 pt-14 pb-28">
        <div className="max-w-md mx-auto">
          <div className="max-w-md mx-auto flex items-center">
            <Image
              src="/wooriImages/woori_ci.png"
              alt="Woori Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <h1 className="text-3xl font-bold color1">아이디 찾기</h1>
          </div>
          <p className="text-base text-gray-600 pl-2">이름과 전화번호를 입력해주세요.</p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-x-5 -top-20 mt-3">
          <div className="max-w-lg mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-7">
              {!foundId ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">이름</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-2 border rounded-xl bg-gray-50 focus:bg-white 
                                focus:border-blue-500 outline-none transition-all"
                      maxLength={20}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">전화번호</label>
                    <input
                      type="tel"
                      value={formatPhoneNumber(formData.phoneNumber)} // 포맷된 전화번호 표시
                      onChange={handlePhoneNumberChange}
                      className="w-full p-2 border rounded-xl bg-gray-50 focus:bg-white 
                                focus:border-blue-500 outline-none transition-all placeholder:text-sm"
                      placeholder="'-' 없이 입력해주세요"
                      maxLength={13}
                      required
                    />
                  </div>

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <button
                    type="submit"
                    className="w-full py-2 bg-blue-400 text-white rounded-xl 
                              hover:bg-blue-500 transition-colors duration-200"
                  >
                    아이디 찾기
                  </button>
                </form>
              ) : (
                <div className="text-center space-y-8">
                  <h2 className="text-xl font-semibold">아이디 찾기 결과</h2>
                  <p className="text-gray-600">
                    회원님의 아이디는 <span className="font-bold text-blue-500">{foundId}</span> 입니다.
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => router.push('/login')}
                      className="flex-1 py-2 bg-blue-400 text-white rounded-xl 
                                hover:bg-blue-500 transition-colors duration-200"
                    >
                      로그인하기
                    </button>
                    <button
                      onClick={() => router.push('/find-password')}
                      className="flex-1 py-2 border border-gray-300 rounded-xl 
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
