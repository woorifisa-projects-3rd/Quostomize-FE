'use client'

import Lottie from "../../components/lottie/lottieComponent";
import CoinLottie from "../../public/lotties/coin.json"

const IsWinner = () => {
    return (
        <>
            <div className="w-full text-center mt-6">행운의 주인공!</div>
            <div className="w-full text-center -mb-4"><span className="color1">10,000 포인트</span>를 받았어요!</div> 
            <div className="flex justify-center cursor-pointer">
                <Lottie animationData={CoinLottie} loop={true} className="w-72 h-72" />
            </div>
        </>
    );
}

export default IsWinner;