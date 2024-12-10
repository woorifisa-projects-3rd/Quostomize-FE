'use client'

import { validateLoginId, validatePassword } from '../../utils/loginValid/validation';
import { useState } from 'react';

const LoginForm = ({ formData, handleInputChange, isFormValid, onSubmit }) => {
  const [errors, setErrors] = useState({
    memberLoginId: '',
    memberPassword: ''
  });

  const validateField = (name, value) => {
    if (name === 'memberLoginId') {
      return validateLoginId(value);
    }
    if (name === 'memberPassword') {
      return validatePassword(value);
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    handleInputChange(e);
    
    // 실시간 유효성 검사
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 제출 시 모든 필드 유효성 검사
    const idError = validateLoginId(formData.memberLoginId);
    const pwError = validatePassword(formData.memberPassword);
    
    if (idError || pwError) {
      setErrors({
        memberLoginId: idError,
        memberPassword: pwError
      });
      return;
    }

    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          아이디
        </label>
        <input
          name="memberLoginId"
          type="text"
          value={formData.memberLoginId}
          onChange={handleChange}
          className={`w-full p-2 border rounded-xl bg-gray-50 
                    focus:bg-white focus:border-blue-400 outline-none transition-all
                    placeholder:text-sm
                    ${errors.memberLoginId ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="아이디를 입력해주세요"
          autoComplete='on'
        />
        {errors.memberLoginId && (
          <p className="mt-2 text-xs text-red-500">{errors.memberLoginId}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          비밀번호
        </label>
        <input
          name="memberPassword"
          type="password"
          value={formData.memberPassword}
          onChange={handleChange}
          className={`w-full p-2 border rounded-xl bg-gray-50 
                    focus:bg-white focus:border-blue-500 outline-none transition-all
                    placeholder:text-sm
                    ${errors.memberPassword ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="비밀번호를 입력해주세요"
          autoComplete='off'
        />
        {errors.memberPassword && (
          <p className="mt-2 text-xs text-red-500">{errors.memberPassword}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={!isFormValid || Object.values(errors).some(error => error)}
        className={`w-full py-2 rounded-xl font-semibold transition-all
          ${isFormValid && !Object.values(errors).some(error => error)
            ? 'bg-blue-400 text-white hover:bg-blue-500' 
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
      >
        로그인
      </button>
    </form>
  );
};

export default LoginForm;