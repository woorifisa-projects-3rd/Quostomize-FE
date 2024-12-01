'use client'

import Lottie from "../../components/lottie/lottieComponent";
import SadLottie from "../../public/lotties/sad.json"

const IsLooser = () => {
    return (
        <>
            <div className="w-full text-center mt-6">오늘의 복권은 놓쳤지만</div>
            <div className="w-full text-center mt-6 -mb-2">더 큰 행운이 기다리고 있을 거에요.</div> 
            <Lottie animationData={SadLottie} loop={true} />
        </>
    );
}

export default IsLooser;