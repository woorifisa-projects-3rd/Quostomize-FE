"use client";

import { useEffect, useState } from "react";

const RadioButton = ({index, setAccepted}) => {
    const [isAgreed, setIsAgreed] = useState(false);
  
    const handleConsentClick = () => {
      setIsAgreed(prev => !prev);
    };

    useEffect(() => {
        setAccepted((prev) => {
            const newAgree = [...prev];
            newAgree[index] = isAgreed;
            return newAgree;
        })
    },[isAgreed])
  
    return (
      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <div 
            onClick={handleConsentClick}
            className="flex items-center cursor-pointer relative"
          >
            {/* 외부 원 */}
            <div className={`
              w-5 h-5 rounded-full border-2 
              ${isAgreed 
                ? 'border-blue-500' 
                : 'border-gray-300'}
              mr-2 flex items-center justify-center
            `}>
              {/* 내부 원 (선택시 표시) */}
              {isAgreed && (
                <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
              )}
            </div>
            <span>동의</span>
          </div>
        </div>
      </div>
    );
  };
  

export default RadioButton;