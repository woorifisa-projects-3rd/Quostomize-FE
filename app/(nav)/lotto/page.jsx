import ParticipantCard from "../../../components/card/ParticipantCard";
import WinnerCard from "../../../components/card/WinnerCard";
import SquareButton from "../../../components/button/square-button";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import getYYYYMMDDDate from "../../../utils/getYYYYMMDDDate" 


const LottoMain = async () => {
    const cookieList = await cookies(); 

    const today = getYYYYMMDDDate();

    const getTodayParticipants = async () => {
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
          
        if (response.redirected) {
            redirect(response.url);
        } else {
            const result = await response.json();
            const participants = `${result.data}`.length === 7 ? `${result.data}` : "0".repeat(7-`${result.data}`.length)+`${result.data}`;
            return participants;
        }
    }

    // 하나 더 보낼 요청
    const getTodayWinners = async () => {
        const response = await fetch(
            `${process.env.NEXT_URL}/api/lotto/winners`
            ,
            {
                method: "GET",
                cache: "no-store",
                headers: {
                    Cookie: cookieList
                }
            },
          );
          
        if (response.redirected) {
            redirect(response.url);
        } else {
            const result = await response.json();
            return result.data;
        }

    }

    const [stringValue, todayWinners] = await Promise.all([
        getTodayParticipants(),
        getTodayWinners(),
    ]);
    
    
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
                <SquareButton href={`/lotto/past?date=${today}`} message={"과거 당첨자 확인"} />
            </div>
            <div className=" flex-auto flex flex-col gap-4 items-center py-1 w-full h-[67%] overflow-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {todayWinners.map((winner) => {
                    return <WinnerCard name={winner.customerName} key={winner.winnerId}/>
                })}
            </div>
        </div>
    );
}

export default LottoMain;