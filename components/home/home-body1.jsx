"use client";

import React from "react";
import { useInView } from "react-intersection-observer";
import FadeInSection from "../fade-in/fade-in-section";

const sentences = [
    "커다란 혜택을",
    "스스로 선택하여",
    "터치 한 번으로",
    "마이 라이프스타일에 맞춘",
    "이전과 다른 나만을 위한 금융, ",
    "징검다리처럼 연결해 보세요.",
];

const HomeBody1 = () => {
    return (
        <div className="flex flex-col justify-center items-center mt-80">
            {/* 첫 번째 섹션에 fade-in 효과 추가 */}
            <FadeInSection>
                <div className="text-center text-4xl font-semibold">
                    <h1>
                        오직 나만을 위한
                        <span style={{ color: "#0083CA" }}> 우리 금융 그룹</span>
                    </h1>
                    <h1 className="mt-2">
                        <span style={{ color: "#0083CA" }}> '커스터 마이징'</span> 서비스 출시
                    </h1>
                    <p className="text-sm text-gray-500 mt-5">첫번째 시작, <span>{"{"}</span> 우리카드: 커스터마이징 카드 <span>{"}"}</span> </p>
                </div>
            </FadeInSection>

            <section className="mt-20 space-y-6">
                {sentences.map((sentence, index) => (
                    <FadeInText key={index} sentence={sentence} />
                ))}
            </section>
        </div>
    );
};

const FadeInText = ({ sentence }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });

    const firstChar = sentence.charAt(0);
    const restOfText = sentence.slice(1);

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-in-out transform ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
        >
            <span className="font-extrabold text-4xl relative" style={{ color: "#0083CA" }}>
                {firstChar}
                {/* 첫 글자 아래에 밑줄 효과 - 적용되지 않고 있음. 확인 필요 */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 scale-x-100 transform group-hover:w-full"></span>
            </span>
            <span className="text-2xl font-bold text-gray-700 ml-1">
                {restOfText}
            </span>
        </div>
    );
};

export default HomeBody1;
