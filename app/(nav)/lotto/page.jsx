import ParticipantCard from "../../../components/card/ParticipantCard";
import WinnerCard from "../../../components/card/WinnerCard";
import SquareButton from "../../../components/button/square-button";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import getYYYYMMDDDate from "../../../utils/getYYYYMMDDDate" 
import LottoHeader from "../../../components/lotto/lottoHeader"
import Lottie from "../../../components/LottieComponent/lottieComponent"
import LottoLottie from "../../../public/lotties/lottery.json";

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
        <>
            <LottoHeader />
            <div className="flex flex-col h-full items-center p-2">
                <div className="w-40 h-40">
                    <Lottie animationData={LottoLottie} loop={false} />
                </div>
                <ParticipantCard men={stringValue} />
                <div className="flex w-full items-center mt-4">
                    <div className="w-[35%] h-0 border-gray-300 border-[1px]"></div>
                    <div className="w-[30%] h-10 leading-10 bg-gray-300 rounded-3xl text-center ">어제 당첨자 명단</div>
                    <div className="w-[35%] h-0 border-gray-300 border-[1px]"></div>
                </div>
                <div className=" flex-auto flex flex-col gap-4 items-center py-1 w-full">
                    {todayWinners.map((winner) => {
                        return <WinnerCard name={winner.customerName} key={winner.winnerId}/>
                    })}
                </div>
            </div>
        </>
    );
}

export default LottoMain;