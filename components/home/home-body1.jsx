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
        <div className="flex flex-col justify-center items-center mt-72">
            {/* 첫 번째 섹션에 fade-in 효과 추가 */}
            <FadeInSection>
                <div className="font4 text-center font-semibold">
                    <h1>
                        오직 나만을 위한
                        <span className="color1"> 우리 금융 그룹</span>
                    </h1>
                    <h1>
                        <span className="color1"> '커스터 마이징'</span> 서비스 출시
                    </h1>
                    <p className="font1 color3 mt-3">첫번째 시작, <span>{"{"}</span> 우리카드: 커스터마이징 카드 <span>{"}"}</span> </p>
                </div>
            </FadeInSection>

            <section className="mt-14 space-y-5">
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
            <span className="font4 color1 font-extrabold relative">
                {firstChar}
            </span>
            <span className="font3 font-bold ml-1">
                {restOfText}
            </span>
        </div>
    );
};

export default HomeBody1;
