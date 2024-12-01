'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '../../../components/overlay/LoadingSpinner';

export default function FindPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');

  const validatePhoneNumber = (number) => {
    return number.replace(/[^0-9]/g, '').slice(0, 11);
  };

  const handlePhoneNumberChange = (e) => {
    const value = validatePhoneNumber(e.target.value);
    setPhoneNumber(value);
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/find-password/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || '인증번호 전송에 실패했습니다.');
      }

      setStep(2);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/find-password/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          phoneNumber,
          verificationCode 
        }),
      });
      
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '인증번호 확인에 실패했습니다.');
      }

      setStep(3);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="w-full px-6 pt-12 pb-28">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold color1 mb-3">비밀번호 찾기</h1>
          <p className="text-base text-gray-900">
            {step === 1 && '전화번호를 입력해주세요.'}
            {step === 2 && '인증번호를 입력해주세요.'}
            {step === 3 && '인증이 완료되었습니다.'}
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-x-0 -top-20">
          <div className="max-w-lg mx-auto px-5">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {step === 1 && (
                <form onSubmit={handleSendCode} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      전화번호
                    </label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                      className="w-full p-3 border rounded-xl bg-gray-50 focus:bg-white 
                               focus:border-blue-500 outline-none transition-all"
                      placeholder="'-' 없이 입력해주세요"
                      maxLength={11}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={phoneNumber.length !== 11}
                    className={`w-full py-3 rounded-xl transition-colors duration-200
                      ${phoneNumber.length === 11
                        ? 'bg-blue-400 text-white hover:bg-blue-500'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                  >
                    인증번호 받기
                  </button>
                </form>
              )}

              {step === 2 && (
                <form onSubmit={handleVerifyCode} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      인증번호
                    </label>
                    <input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                      className="w-full p-3 border rounded-xl bg-gray-50 focus:bg-white 
                                focus:border-blue-500 outline-none transition-all"
                      placeholder="인증번호 6자리를 입력해주세요"
                      maxLength={6}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={verificationCode.length !== 6}
                    className={`w-full py-3 rounded-xl transition-colors duration-200
                      ${verificationCode.length === 6
                        ? 'bg-blue-400 text-white hover:bg-blue-500'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                  >
                    확인
                  </button>
                </form>
              )}

              {step === 3 && (
                <div className="text-center space-y-6">
                  <p className="text-green-600 font-semibold">
                    인증이 완료되었습니다.
                  </p>
                  <button
                    onClick={() => router.push('/login')}
                    className="w-full py-3 bg-blue-400 text-white rounded-xl 
                              hover:bg-blue-500 transition-colors duration-200"
                  >
                    로그인하기
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isLoading && <LoadingSpinner message="처리 중입니다..." />}
    </div>
  );
}