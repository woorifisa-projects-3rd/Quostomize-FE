"use client";

import { useState } from 'react';

const TabContentBox = ({ tabs = [] }) => {
    const [activeTab, setActiveTab] = useState(0);

    if (!tabs || tabs.length === 0) {
        return null;
    }

    return (
        <div className="w-[22rem]">
            {/* 상단 탭 메뉴 */}
            <div className="px-8 flex w-full justify-between relative border-b border-gray-200">
                {tabs.slice(0, 5).map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveTab(index)}
                        className={`relative z-10 px-4 py-3 font1 font-bold transition-all text-center rounded-t-md ${
                            activeTab === index
                                ? 'bg-white text-blue-600 shadow-[0_0_10px_2px_rgba(59,130,246,0.5)]'
                                : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                        }`}
                        style={{
                            minWidth: '1rem',
                            zIndex: activeTab === index ? 20 : 10, // 선택된 탭은 더 높은 레이어
                            background: activeTab === index
                                ? 'linear-gradient(to top, #ffffff, #f0faff)'
                                : undefined,
                        }}
                    >
                        {tab.title || `Tab ${index + 1}`}
                    </button>
                ))}
            </div>

            {/* 콘텐츠 영역 */}
            <div className="h-[16rem] p-8 bg-white border border-t-0 border-gray-200">
                {tabs[activeTab]?.subtitle && (
                    <div className="flex items-center mb-6">
                        {/* 아이콘 이미지 */}
                        <img
                            src={tabs[activeTab].icon}
                            alt={`${tabs[activeTab].title} Icon`}
                            className="w-7 h-7 mr-2"
                        />
                        {/* Subtitle 영역 */}
                        <h1 className="font2 font-bold text-blue-600">
                            {tabs[activeTab].subtitle.split('\n').map((line, index) => (
                                <span key={index}>
                                    {line}
                                    <br />
                                </span>
                            ))}
                        </h1>
                    </div>
                )}

                {tabs[activeTab]?.content?.map((item, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                        {/* 원 모양의 숫자 표시 */}
                        <div className="flex items-start">
                            <div
                                className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-3"
                            >
                                <span className="font1 font-bold text-blue-600">{index + 1}</span>
                            </div>
                            <div className="flex-1">
                                <p className="font1 font-semibold">
                                    {typeof item === 'string'
                                        ? item.split('\n').map((line, index) => (
                                            <span key={index}>
                                                  {line}
                                                <br />
                                              </span>
                                        ))
                                        : item?.text.split('\n').map((line, index) => (
                                        <span key={index}>
                                                  {line}
                                            <br />
                                              </span>
                                    )) || ''}
                                </p>
                                {/* 추가 설명이 있는 경우 */}
                                {item?.description && (
                                    <p className="mt-1 font0 text-gray-500">
                                        {item.description.split('\n').map((line, index) => (
                                            <span key={index}>
                                                {line}
                                                <br />
                                            </span>
                                        ))}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TabContentBox;