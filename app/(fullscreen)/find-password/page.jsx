'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '../../../components/overlay/LoadingSpinner';

export default function FindPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(180);
  const [timerActive, setTimerActive] = useState(false);
  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');

  // 비밀번호 유효성 검사 함수
  const validatePassword = (password) => {
    if (password.length < 8 || password.length > 16) {
      return '비밀번호는 8자 이상 16자 이하로 입력해주세요.';
    }
    return '';
  };

  useEffect(() => {
    let timer;
    if (timerActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setError('인증번호가 만료되었습니다. 다시 시도해주세요.');
      setStep(1);
      setVerificationCode('');
    }
    
    return () => clearInterval(timer);
  }, [timerActive, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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
            body: JSON.stringify({
                phoneNumber: phoneNumber
            }),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || '인증번호 전송에 실패했습니다.');
        }

        setStep(2);
        setTimeLeft(180);
        setTimerActive(true);
    } catch (error) {
        setError(error.message);
    } finally {
        setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (timeLeft === 0) {
        setError('인증번호가 만료되었습니다. 다시 시도해주세요.');
        setStep(1);
        return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/find-password/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
              phone: phoneNumber,
              certificationNumber: verificationCode
          }),
      });
      
      const data = await response.json();

      if (!response.ok) {
          throw new Error(data.error || '인증번호 확인에 실패했습니다.');
      }

      setTimerActive(false);
      setStep(3);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 비밀번호 변경
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError('');

    const validationError = validatePassword(passwords.newPassword);
    if (validationError) {
        setPasswordError(validationError);
        return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
        setPasswordError('비밀번호가 일치하지 않습니다.');
        return;
    }

    setIsLoading(true);
    try {
        const response = await fetch('/api/find-password/reset', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                phone: phoneNumber,
                newPassword: passwords.newPassword
            }),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || '비밀번호 변경에 실패했습니다.');
        }

        setStep(4);
    } catch (error) {
        setPasswordError(error.message);
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
                    <div className="relative">
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
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-500">
                        {formatTime(timeLeft)}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleSendCode}
                      className="flex-1 py-3 border border-blue-400 text-blue-400 rounded-xl
                                hover:bg-blue-50 transition-colors duration-200"
                    >
                      재전송
                    </button>
                    <button
                      type="submit"
                      disabled={verificationCode.length !== 6}
                      className={`flex-1 py-3 rounded-xl transition-colors duration-200
                        ${verificationCode.length === 6
                          ? 'bg-blue-400 text-white hover:bg-blue-500'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                    >
                      확인
                    </button>
                  </div>
                </form>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-center mb-6">
                    새로운 비밀번호 설정
                  </h2>
                  <form onSubmit={handlePasswordChange} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        새 비밀번호
                      </label>
                      <input
                        type="password"
                        value={passwords.newPassword}
                        onChange={(e) => setPasswords({
                            ...passwords,
                            newPassword: e.target.value
                        })}
                        className="w-full p-3 border rounded-xl bg-gray-50 focus:bg-white 
                                focus:border-blue-500 outline-none transition-all"
                        placeholder="새 비밀번호를 입력해주세요"
                        minLength={8}
                        maxLength={16}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                          비밀번호 확인
                      </label>
                      <input
                        type="password"
                        value={passwords.confirmPassword}
                        onChange={(e) => setPasswords({
                            ...passwords,
                            confirmPassword: e.target.value
                        })}
                        className="w-full p-3 border rounded-xl bg-gray-50 focus:bg-white 
                                focus:border-blue-500 outline-none transition-all"
                        placeholder="비밀번호를 다시 입력해주세요"
                        minLength={8}
                        maxLength={16}
                        required
                      />
                    </div>
                    {passwordError && (
                      <p className="text-red-500 text-sm">{passwordError}</p>
                    )}
                    <button
                      type="submit"
                      className="w-full py-3 bg-blue-400 text-white rounded-xl 
                              hover:bg-blue-500 transition-colors duration-200"
                    >
                      비밀번호 변경
                    </button>
                  </form>
                </div>
            )}

            {step === 4 && (
                <div className="text-center space-y-6">
                  <div className="flex flex-col items-center gap-4">
                    <div className="text-green-500 text-5xl mb-2">✓</div>
                    <h2 className="text-xl font-semibold">
                        비밀번호 변경 완료
                    </h2>
                    <p className="text-gray-600">
                        새로운 비밀번호로 로그인해주세요.
                    </p>
                  </div>
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