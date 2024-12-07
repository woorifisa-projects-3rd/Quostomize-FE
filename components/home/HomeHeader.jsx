import { useState, useEffect, useRef } from "react";
import GradientText from "../../components/card/gradientText";
import ColorInfo from "../../components/card/ColorInfo";

const OPTIONS = ["쇼핑", "생활", "푸드", "여행", "문화"];

function HomeHeader() {
    const [currentOption, setCurrentOption] = useState("");
    const [colorIndex, setColorIndex] = useState(0);
    const [isStopped, setIsStopped] = useState(false); // 멈춤 여부 관리
    const intervalRef = useRef(null); // setInterval ID 저장

    const startRotation = () => {
        let index = 0;
        intervalRef.current = setInterval(() => {
            setCurrentOption(OPTIONS[index % OPTIONS.length]);
            setColorIndex(index % OPTIONS.length);
            index++;
        }, 200);
    };

    const stopAndRestart = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current); // 기존 interval 정지
        }
        setIsStopped(true); // 멈춤 상태 설정

        // 랜덤 값으로 멈추기
        const randomIndex = Math.floor(Math.random() * OPTIONS.length);
        setCurrentOption(OPTIONS[randomIndex]);

        // 2초 뒤 다시 회전 시작
        setTimeout(() => {
            setIsStopped(false);
            startRotation();
        }, 2000); // 2초 멈춘 뒤 다시 시작
    };

    useEffect(() => {
        startRotation(); // 초기 시작
        const cycleStop = setInterval(() => {
            stopAndRestart(); // 멈추고 다시 시작
        }, 3000); // 3초마다 멈춤 후 재시작

        return () => {
            clearInterval(intervalRef.current); // 컴포넌트 언마운트 시 정리
            clearInterval(cycleStop);
        };
    }, []);

    return (
        // 메인페이지 글자 크기 페이지 너비에 맞춰 3xl 이상 사용
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

export default HomeHeader;
