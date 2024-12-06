// components/modal/CardNotFoundModal.jsx

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const CardNotFoundModal = ({ isOpen, onClose }) => {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg w-72 p-6">
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">카드가 존재하지 않습니다</h2>
          <p className="text-gray-600 mt-2">새로운 카드를 생성해 주세요.</p>
        </div>
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => {
              onClose();
              router.push('/create-card');
            }}
            className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors"
          >
            카드 만들기
          </button>
          <button
            onClick={() => {
              onClose();
              router.push('/home');
            }}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardNotFoundModal;
