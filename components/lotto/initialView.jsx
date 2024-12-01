'use client'

import Image from "next/image";

const InitialView = () => {
    return (
        <div className="flex flex-col gap-4 w-full p-4 justify-center items-center">
            <Image src={"/images/gumball.png"} alt="볼 껌 기계 이미지" width={134} height={224}/>
            <div>당첨여부 확인하기!</div>
        </div>
    );
}

export default InitialView;