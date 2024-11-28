'use client';

const LoginForm = ({ formData, handleInputChange, isFormValid, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          아이디
        </label>
        <input
          name="memberLoginId"
          type="text"
          value={formData.memberLoginId}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 
                    focus:bg-white focus:border-blue-500 outline-none transition-all"
          placeholder="아이디를 입력해주세요"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          비밀번호
        </label>
        <input
          name="memberPassword"
          type="password"
          value={formData.memberPassword}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 
                    focus:bg-white focus:border-blue-500 outline-none transition-all"
          placeholder="비밀번호를 입력해주세요"
        />
      </div>
      <button
        type="submit"
        disabled={!isFormValid}
        className={`w-full py-3 rounded-xl font-semibold transition-all
          ${isFormValid 
            ? 'bg-blue-400 text-white hover:bg-blue-500' 
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
      >
        로그인
      </button>
    </form>
  );
};

export default LoginForm;