"use client";

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

const NoticeToggleBox = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full max-w-2xl border border-gray-200">
            {/* 헤더 부분 */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-3 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
                <span className="text-[#333d4b] text-xs">{title}</span>
                {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </button>

            {/* 컨텐츠 부분 */}
            {isOpen && (
                <div className="p-4 bg-white">
                    {/* content가 배열인 경우 bullet point로 표시 */}
                    {Array.isArray(content) ? (
                        <ul className="list-disc pl-5 space-y-2">
                            {content.map((item, index) => (
                                <li key={index} className="text-xs text-gray-500">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-500">{content}</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default NoticeToggleBox;