'use client'

import Image from "next/image";
import Icons from "../../public/icons/icons";

const InitialView = () => {
    return (
        <div className="flex flex-col gap-4 w-full px-4 pt-16 justify-center items-center">
            <Image src={Icons.crystalball} alt="볼 껌 기계 이미지" width={134} height={224}/>
            <div className="text-xl">당첨여부 확인하기!</div>
        </div>
    );
}

export default InitialView;