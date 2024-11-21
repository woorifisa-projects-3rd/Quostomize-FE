import ParticipantCard from "../../../components/card/ParticipantCard";
import WinnerCard from "../../../components/card/WinnerCard";
import SquareButton from "../../../components/button/square-button";
import { auth } from "../../../auth";
import { cookies } from "next/headers";

const LottoMain = async () => {
    const cookieList = await cookies();
    
    const response = await fetch(
        `${process.env.NEXT_URL}/api/lotto`
        ,
        {
            method: "GET",
            cache: "no-store",
            headers: {
                Cookie: cookieList
            }
        },
      );
    const result = await response.json();
    const participants = `${result.data}`;
    const stringValue = participants.length === 7 ? participants : "0".repeat(7-participants.length)+participants;

    
    const todayWinners = [
        {name:"김O의"},
        {name:"홍O우"},
        {name:"박O혁"},
        {name:"임O현"},
        {name:"김O수"},
        {name:"이O의"},
        {name:"박O성"},
        {name:"최O희"},
        {name:"신O철"},
        {name:"정O빈"}
    ];
    
    return (
        <div className="flex flex-col h-full items-center p-2">
            <div className="w-5/6 text-xl mb-2">
                일일 복권
            </div>
            <ParticipantCard men={stringValue} />
            <div className="w-5/6 flex justify-between items-end mt-3">
                <div className="text-xl align-bottom">
                    오늘 당첨자
                </div>
                <SquareButton href={""} message={"과거 당첨자 확인"} />
            </div>
            <div className=" flex-auto flex flex-col gap-4 items-center py-1 w-full h-[67%] overflow-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {todayWinners.map((man,index) => {
                    return <WinnerCard man={man} key={index}/>
                })}
            </div>
        </div>
    );
}

export default LottoMain;