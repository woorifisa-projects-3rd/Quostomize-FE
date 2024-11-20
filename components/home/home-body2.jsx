"use client";

import { useState } from "react";
import ArrowButton from "../button/arrow-button";

const colors = ["#ffffff", "#dbff3d", "#ff0000", "#ed3ef7", "#000000"];
const images = [
    "/cards-images/white-image.png",
    "/cards-images/yellow-image.png",
    "/cards-images/red-image.png",
    "/cards-images/pink-image.png",
    "/cards-images/black-image.png"
];

const HomeBody2 = () => {
    // 현재 카드 색상
    const [currentColorIndex, setCurrentColorIndex] = useState(0);

    //선택된 카드 색상
    const [selectedIndex, setSelectedIndex] = useState(0);

    // 카드 색상을 변경하는 함수
    const changeColor = (index) => {
        setCurrentColorIndex(index);
        setSelectedIndex(index); // 색상이 변경되면 선택 상태도 업데이트
    };

    // 화살표 버튼 클릭 시 이전/다음 색상으로 이동하는 함수
    const handleArrowClick = (direction) => {
        let newIndex;
        if (direction === "prev") {
            newIndex = (currentColorIndex === 0) ? colors.length - 1 : currentColorIndex - 1;
        } else {
            newIndex = (currentColorIndex === colors.length - 1) ? 0 : currentColorIndex + 1;
        }
        setCurrentColorIndex(newIndex);
        setSelectedIndex(newIndex); // 화살표 클릭 시 선택 상태 업데이트
    };

    return (


        <div className="flex flex-col justify-center items-center mt-32">

            <div className="text-center text-2xl font-semibold">
                <h1>내가 채워가는 나를 위한 카드</h1>
                <p className="text-xs text-gray-500">색상도, 혜택도, 포인트 사용옵션까지 </p>
            </div>

            <div className="flex w-64 mb-4 mt-10 space-x-5">
                {/* 이전 버튼 */}
                <ArrowButton direction="prev" onClick={() => handleArrowClick("prev")} />

                {/* 카드 이미지가 들어갈 곳*/}
                <div className="rounded-xl flex justify-center items-center mb-4">
                    <img
                        src={images[currentColorIndex]}
                        alt="카드 이미지"
                        className="w-full h-full rounded-xl object-cover"
                    />
                </div>

                {/* 다음 버튼 */}
                <ArrowButton direction="next" onClick={() => handleArrowClick("next")} />
            </div>

            {/* 색상 미리 보기 원들 */}
            <div className="flex space-x-2 mt-6">
                {colors.map((color, index) => (
                    <button
                        key={index}
                        onClick={() => changeColor(index)}
                        className={`w-4 h-4 rounded-full shadow-xl transition-all ${selectedIndex === index ? "ring-2 ring-blue-500" : ""
                            }`}
                        // 선택된 버튼에 추가 스타일
                        style={{
                            backgroundColor: color,
                            boxShadow: selectedIndex === index ? "0 0 10px rgba(0, 0, 0, 0.5)" : "0 0 5px rgba(0, 0, 0, 0.3)",
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default HomeBody2;
