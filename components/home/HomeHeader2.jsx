
import { useState, useEffect, useRef } from "react";
import 'animate.css';
import GradientText from "../../components/card/gradientText";

const OPTIONS = ["적 금", "펀 드", "증 권", "보 험", "카 드", "페 이"];
const COLORS = ["#3081F7", "#20C4F4"];

function HomeHeader2() {
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
                background: `linear-gradient(to bottom, #AFEEEE , #AFEEEE 20%, #AFEEEE 60%, #FFFFFF 100%)`,
                paddingTop: "250px",
                paddingBottom: "250px",

            }}>
            <p className="font5 color5 font-semibold" style={{ letterSpacing: '0.1em' }}>나에게 맞게 언제든지</p>
            <div className="font5 font-semibold space-x-16">
                {/* <span className="font-extrabold color5">{"{"}</span> */}
                <GradientText
                    text="혜택, 내가 선택"
                    style={{ backgroundImage: 'linear-gradient(-45deg, #c0c0c0, #99bbff, #d4d4d4, #99bbff)' }}

                />
                {/* <span className="font-extrabold color5">{"}"}</span> */}
            </div>
        </div>
    );
}

export default HomeHeader2;
