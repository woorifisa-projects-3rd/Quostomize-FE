"use client";

import { useState } from "react";
import ArrowButton from "../../../components/button/arrow";

const colors = ["#ffffff", "#dbff3d", "#ff0000", "#ed3ef7", "#000000"];

const HomeBody2 = () => {
    // 현재 카드 색상
    const [currentColorIndex, setCurrentColorIndex] = useState(0);

    // 카드 색상을 변경하는 함수
    const changeColor = (index) => {
        setCurrentColorIndex(index);
    };

    // 화살표 버튼 클릭 시 이전/다음 색상으로 이동하는 함수
    const handleArrowClick = (direction) => {
        if (direction === "prev") {
            setCurrentColorIndex((prevIndex) => (prevIndex === 0 ? colors.length - 1 : prevIndex - 1));
        } else {
            setCurrentColorIndex((prevIndex) => (prevIndex === colors.length - 1 ? 0 : prevIndex + 1));
        }
    };

    return (


        <div className="flex flex-col items-center">

            <div>
                <h1>내가 채워가는 나를 위한 카드</h1>
                <p>색상도, 혜택도, 포인트 사용옵션까지 </p>
            </div>

            <div className="flex justify-between w-64 mb-4">
                {/* 이전 버튼 */}
                <ArrowButton direction="prev" onClick={() => handleArrowClick("prev")} />

                {/* 카드 이미지가 들어갈 곳*/}
                <div
                    className="rounded-xl flex justify-center items-center mb-4"
                    style={{ backgroundColor: colors[currentColorIndex] }}
                >
                    <p className="text-white font-bold text-xl">카드 색상</p>
                </div>

                {/* 다음 버튼 */}
                <ArrowButton direction="next" onClick={() => handleArrowClick("next")} />
            </div>

            {/* 색상 미리 보기 원들 */}
            <div className="flex space-x-2">
                {colors.map((color, index) => (
                    <button
                        key={index}
                        onClick={() => changeColor(index)}
                        className="w-4 h-4 rounded-full shadow-xl"
                        style={{ backgroundColor: color, boxShadow: color = "0 0 10px rgba(0, 0, 0, 0.5)", }}
                    />
                ))}
            </div>
        </div>
    );
};

export default HomeBody2;
