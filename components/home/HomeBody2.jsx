import { useState, useEffect, useRef } from "react";
import GradientText from "../../components/card/gradientText";
import ColorInfo from "../../components/card/ColorInfo";

const OPTIONS = ["쇼핑", "생활", "푸드", "여행", "문화"];

function HomeBody2() {
    const [currentOption, setCurrentOption] = useState("");
    const [colorIndex, setColorIndex] = useState(0);
    const [isStopped, setIsStopped] = useState(false);
    const intervalRef = useRef(null);

    const startRotation = () => {
        let index = 0;
        intervalRef.current = setInterval(() => {
            setCurrentOption(OPTIONS[index % OPTIONS.length]);
            setColorIndex(index % OPTIONS.length);
            index++;
        }, 150);
    };

    const stopAndRestart = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setIsStopped(true);
        const randomIndex = Math.floor(Math.random() * OPTIONS.length);
        setColorIndex(randomIndex);
        setCurrentOption(OPTIONS[randomIndex]);
        setTimeout(() => {
            setIsStopped(false);
            startRotation();
        }, 1500);
    };

    useEffect(() => {
        startRotation();
        const cycleStop = setInterval(() => {
            stopAndRestart();
        }, 3000);

        return () => {
            clearInterval(intervalRef.current);
            clearInterval(cycleStop);
        };
    }, []);

    return (
        <div className="flex flex-col justify-center items-center mt-60">
            <p className="font5 font-semibold">혜택, 매달 선택</p>
            <div className="font5 space-x-16">
                <span className="font-extrabold ">{"{"}</span>
                <span className="font-bold">
                    <GradientText text={currentOption}
                                  style={ColorInfo[colorIndex].style}/>
                </span>
                <span className="font-extrabold">{"}"}</span>
            </div>
            <p className="mt-4 font1 color4">카드 혜택을 30일마다 내가 원하는대로 바꿀 수 있어요</p>
        </div>
    );
}

export default HomeBody2;
