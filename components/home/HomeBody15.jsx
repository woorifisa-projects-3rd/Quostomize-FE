"use cilent"

import React from 'react'
import { useInView } from "react-intersection-observer";

const sentences = [
    "커 다란 혜택을",
    "스 스로 선택하여",
    "터 치 한 번으로",
    "마 이 라이프스타일에 맞춘",
    "이 전과 다른 나만을 위한 금융, ",
    "징 검다리처럼 연결해 보세요.",
];

const HomeBody15 = () => {
    return (
        <div className="flex flex-col justify-center items-center mt-60">

            <section className="mt-20 mb-20 space-y-8">
                {sentences.map((sentence, index) => (
                    <FadeInText key={index} sentence={sentence} index={index} />
                ))}
            </section>

        </div>
    )
}


const FadeInText = ({ sentence, index }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });



    const firstChar = sentence.charAt(0);
    const restOfText = sentence.slice(1);

    const isOdd = index % 2 !== 0;

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-in-out transform ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }relative overflow-hidden`}
            style={{
                letterSpacing: '0.1em',
                display: 'flex',
                justifyContent: 'flex-start',
                width: '100%',
                marginLeft: isOdd ? '2rem' : '0',
            }}>
            <span className="font4 font-extrabold relative text-shadow-pop-bottom wave-char"
                style={{
                    display: 'inline-block',
                    animationDelay: `${index * 0.1}s`,
                    color: '#3182F6',
                }}>
                {firstChar}
            </span>
            <span className="font35 color3 font-bold ml-1 flex">
                {restOfText.split('').map((char, charIndex) => (
                    <span
                        key={charIndex}
                        className="wave-text inline-block"
                        style={{
                            animationDelay: `${(index * 0.1) + (charIndex * 0.05)}s`,
                        }}
                    >
                        {char}
                    </span>
                ))}
            </span>
        </div>
    );
};

export default HomeBody15