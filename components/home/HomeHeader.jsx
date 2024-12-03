
import { useState, useEffect, useRef } from "react";
import 'animate.css';

const OPTIONS = ["적 금", "펀 드", "증 권", "보 험", "카 드", "페 이"];
const COLORS = ["#3081F7", "#20C4F4"];

function HomeHeader() {
    const [currentOption, setCurrentOption] = useState(OPTIONS[4]);
    const [colorIndex, setColorIndex] = useState(0);
    const [isStopped, setIsStopped] = useState(false);
    const intervalRef = useRef(null);

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
            clearInterval(intervalRef.current);
        }
        setIsStopped(true);


        const randomIndex = Math.floor(Math.random() * OPTIONS.length);
        setCurrentOption(OPTIONS[randomIndex]);


        setTimeout(() => {
            setIsStopped(false);
            startRotation();
        }, 2000);
    };

    useEffect(() => {

        const timeoutId = setTimeout(() => {
            startRotation();
        }, 100)

        const cycleStop = setInterval(() => {
            stopAndRestart();
        }, 5000);

        return () => {
            clearInterval(intervalRef.current);
            clearInterval(cycleStop);
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <div className="flex flex-col justify-center items-center focus-in-contract"
            style={{
                background: `linear-gradient(to bottom, #000000 , #1C1C1C 20%, #666666 60%, #FFFFFF 100%)`,
                paddingTop: "250px",
                paddingBottom: "250px",

            }}>
            <p className="font65 color5 font-semibold" style={{ letterSpacing: '0.1em' }}>내가 선택하는</p>
            <div className="font55 space-x-16">
                <span className="font-extrabold color5">{"{"}</span>
                <span
                    className="font-bold font6"
                    style={{
                        color: COLORS[colorIndex],
                    }}
                >
                    {currentOption}
                </span>
                <span className="font-extrabold color5">{"}"}</span>
            </div>
        </div>
    );
}

export default HomeHeader;
