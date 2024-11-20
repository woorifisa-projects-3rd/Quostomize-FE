"use client";

import { useState } from 'react';

const TabContentBox = ({ tabs = [] }) => {
    const [activeTab, setActiveTab] = useState(0);

    // tabs가 비어있으면 아무것도 렌더링하지 않음
    if (!tabs || tabs.length === 0) {
        return null;
    }

    return (
        <div className="w-full max-w-2xl">
            {/* 상단 탭 메뉴 */}
            <div className="px-14 w-full flex justify-between border-b border-gray-200">
                {tabs.slice(0, 5).map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveTab(index)}
                        className={`px-4 py-2 font1 transition-colors ${activeTab === index
                            ? 'color1 border-b-2 color1 bg-gray-50'
                            : 'color3 hover:color4 hover:bg-gray-50'
                            }`}
                    >
                        {tab.title || `Tab ${index + 1}`}
                    </button>
                ))}
            </div>


            {/* 콘텐츠 영역 */}
            <div className="p-8 bg-white border border-t-0 border-gray-200">

                {/* Subtitle 영역 */}
                {tabs[activeTab]?.subtitle && (
                    <h1 className="text-xl font-semibold mb-6">
                        {tabs[activeTab].subtitle.split('\n').map((line, index) => (
                            <span key={index}>
                                {line}
                                <br />
                            </span>
                        ))}
                    </h1>
                )}

                {tabs[activeTab]?.content?.map((item, index) => (
                    <div key={index} className="mb-4 last:mb-0">

                        {/* 원 모양의 숫자 표시 */}
                        <div className="flex items-start">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                                <span className="font1 color3">{index + 1}</span>
                            </div>
                            <div className="flex-1">
                                <p className="font1">
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
                                    <p className="mt-1 font0 color3">
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