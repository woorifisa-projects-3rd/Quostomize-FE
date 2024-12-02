import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "../../../auth";


import ParticipantCard from "../../../components/card/ParticipantCard";
import WinnerCard from "../../../components/card/WinnerCard";
import LottoHeader from "../../../components/lotto/lottoHeader"
import Lottie from "../../../components/lottie/lottieComponent";
import WinningModal from "../../../components/lotto/winningModal"

import LottoLottie from "../../../public/lotties/lottery.json";
import StarLottie from "../../../public/lotties/star.json";
import Image from "next/image";
import Icons from "../../../public/icons/icons";

const LottoMain = async () => {
    const session = await auth();
    const memberId = session.memberId;
    const cookieList = await cookies();
    // 오늘 참여자 수
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

    // 최근 당첨자들
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

    // 참여 여부
    const getIsParticipant = async () => {
        const response = await fetch(
            `${process.env.NEXT_URL}/api/lotto/isParticipant`,
            {
                method: "GET",
                cache: "no-store",
                headers: {
                    Cookie: cookieList
                }
            }
        )

        if (response.ok) {
            const result = await response.json();   
            return result.data;
        } else {
            console.error(new Error("서버 오류"))
        }
    }

    
    
    const [stringValue, todayWinners, isParticipant] = await Promise.all([
        getTodayParticipants(),
        getTodayWinners(),
        getIsParticipant()
    ]);

    let isWinner = false;
    for (let winner of todayWinners) {
        if (winner.customerName === memberId) {
            isWinner = true;
            break;
        }
    }




    return (
        <>
            <LottoHeader />
            <div className="flex flex-col h-full items-center p-2">
                <div className="w-32 h-32">
                    {
                        isParticipant
                        ?
                            <>
                                {/* <Lottie animationData={StarLottie} loop={true} /> */}
                                <Image width={128} height={128} src={Icons.star} alt="별 아이콘" />
                                <div>오늘 복권 <span className="color1"> 참여완료!</span></div>
                            </>
                        :
                            <>
                                {/* <Lottie animationData={LottoLottie} loop={false} /> */}
                                <Image width={128} height={128} src={Icons.ticket} alt="티켓 아이콘" />
                                <Link href={"my-card"}>
                                    <div className="cursor-hover">오늘 복권 <span className="color1"> 참여하기</span></div>
                                </Link>
                            </>
                    }
                </div>
                <ParticipantCard men={stringValue} />
                <div className="flex w-full items-center mt-4">
                    <div className="w-[35%] h-0 border-gray-300 border-[1px]"></div>
                    <div className="w-[30%] h-10 leading-10 bg-gray-300 rounded-3xl text-center ">어제 당첨자 명단</div>
                    <div className="w-[35%] h-0 border-gray-300 border-[1px]"></div>
                </div>
                <div className=" flex-auto flex flex-col gap-4 items-center mt-2 py-1 w-full">
                    {todayWinners.map((winner) => {
                        return <WinnerCard name={winner.customerName} key={winner.winnerId}/>
                    })}
                </div>
            </div>
            <WinningModal isWinner={isWinner}/>
        </>
    );
}

export default LottoMain;