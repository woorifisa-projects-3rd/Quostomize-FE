'use client'

import Image from "next/image";
import Icons from "../../public/icons/icons";
import Bubble from "../bubble/bubble";

const InitialView = () => {
    return (
        <div className="relative flex flex-col gap-4 w-full px-4 pt-16 justify-center items-center cursor-pointer">
            <Bubble message= {"터치해주세요!"} x={"-translate-x-12"} y={"-translate-y-28"}/>
            <Image src={Icons.crystalball} alt="크리스탈 볼 이미지" width={134} height={224}/>
            <div className="text-xl">당첨여부 확인하기!</div>
        </div>
    );
}

export default InitialView;