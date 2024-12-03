"use client";

import { useState } from "react";
import ArrowButton from "../button/arrow-button";
import FadeInSection from "../fade-in/fade-in-section";
import FlipCard from "../card/flip-card";
import GradientText from "../../components/card/gradientText";

const colors = ["#ffffff", "#dbff3d", "#ff0000", "#ed3ef7", "#000000"];
const frontImages = [
    "/cards-images/5f.png",
    "/cards-images/4f.png",
    "/cards-images/3f.png",
    "/cards-images/1f.png",
    "/cards-images/2f.png"
];
const backImages = [
    "/cards-images/5b.png",
    "/cards-images/4b.png",
    "/cards-images/3b.png",
    "/cards-images/1b.png",
    "/cards-images/2b.png"
];



const HomeBody2 = () => {
    const [currentColorIndex, setCurrentColorIndex] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const changeColor = (index) => {
        setCurrentColorIndex(index);
        setSelectedIndex(index);
    };


    const handleArrowClick = (direction) => {
        let newIndex;
        if (direction === "prev") {
            newIndex = (currentColorIndex === 0) ? colors.length - 1 : currentColorIndex - 1;
        } else {
            newIndex = (currentColorIndex === colors.length - 1) ? 0 : currentColorIndex + 1;
        }
        setCurrentColorIndex(newIndex);
        setSelectedIndex(newIndex);
    };

    return (

        <FadeInSection>
            <div className="flex flex-col justify-center items-center mt-60">

                <div className="font4 font-semibold text-center"
                    style={{
                        letterSpacing: '0.1em'
                    }}>
                    <h1>내가 채워가는 나를 위한</h1>
                    <GradientText
                        text="단, 한 장의 카드"
                        style={{ backgroundImage: 'linear-gradient(-45deg, #c0c0c0, #99bbff, #d4d4d4, #99bbff)' }}

                    />
                    {/* <h1>단, 한 장의 카드</h1> */}
                    <p className="font15 color3 mt-3">색상도, 혜택도, 포인트 사용옵션까지 </p>
                </div>

                <div className="flex justify-center w-full mb-4 mt-20 space-x-24">
                    <ArrowButton direction="prev" onClick={() => handleArrowClick("prev")} />

                    <div className="rounded-xl mb-4 rotate-12">
                        <FlipCard
                            frontImg={frontImages[currentColorIndex]}
                            backImg={backImages[currentColorIndex]}
                        />
                    </div>

                    <ArrowButton direction="next" onClick={() => handleArrowClick("next")} />
                </div>

                <div className="flex space-x-4 mt-8">
                    {colors.map((color, index) => (
                        <button
                            key={index}
                            onClick={() => changeColor(index)}
                            className={`w-4 h-4 rounded-full shadow-xl transition-all ${selectedIndex === index ? "ring-2 ring-blue-500" : ""
                                }`}
                            style={{
                                backgroundColor: color,
                                boxShadow: selectedIndex === index ? "0 0 10px rgba(0, 0, 0, 0.5)" : "0 0 5px rgba(0, 0, 0, 0.3)",
                            }}
                        />
                    ))}
                </div>
            </div>
        </FadeInSection>
    );
};

export default HomeBody2;
