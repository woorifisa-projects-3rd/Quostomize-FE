
import { useState, useEffect, useRef } from "react";

const OPTIONS = ["적금", "펀드", "증권", "보험", "카드", "페이"];
const COLORS = ["#007AFF", "#20C4F4"];

export default function HomeHeader() {
    const [currentOption, setCurrentOption] = useState("");
    const [colorIndex, setColorIndex] = useState(0);
    const [isStopped, setIsStopped] = useState(false); // 멈춤 여부 관리
    const intervalRef = useRef(null); // setInterval ID 저장

    const startRotation = () => {
        let index = 0;
        intervalRef.current = setInterval(() => {
            setCurrentOption(OPTIONS[index % OPTIONS.length]);
            setColorIndex(index % COLORS.length);
            index++;
        }, 100);
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
        }, 5000); // 5초마다 멈춤 후 재시작

        return () => {
            clearInterval(intervalRef.current); // 컴포넌트 언마운트 시 정리
            clearInterval(cycleStop);
        };
    }, []);
    
    return (
        <div >
            <header >
                내가 선택하는{" "} <br />
                <span >
                    {"{"}
                </span>
                <span
                    className="font-bold"
                    style={{ color: COLORS[colorIndex] }}
                >
                    {currentOption}
                </span>
                <span >
                    {"}"}
                </span>
            </header>
        </div >
    );
}
