import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "../../../auth";


import ParticipantCard from "../../../components/card/ParticipantCard";
import WinnerCard from "../../../components/card/WinnerCard";
import WinningModal from "../../../components/lotto/winningModal";
import Bubble from "../../../components/bubble/bubble";
import LottoHeader from "../../../components/lotto/lottoHeader"

import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import Icons from "../../../public/icons/icons";
import { Suspense } from "react";
import Loading from "./loading";
import { cookies } from "next/headers";


const LottoMain = async () => {
    const session = await auth();
    const cookieList = await cookies();
    
    if (!session) {
        redirect("/login?to=lotto");
    }

    const memberName = session.memberName;


    // 오늘 참여자 수
    const getTodayParticipants = async () => {
        const response = await fetch(
            `${process.env.AUTH_URL}/api/lotto`
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
            `${process.env.AUTH_URL}/api/lotto/winners`
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
            `${process.env.AUTH_URL}/api/lotto/isParticipant`,
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
        if (winner.customerName === memberName) {
            isWinner = true;
            break;
        }
    }


    return (
        <Suspense fallback={<Loading />}>
            <LottoHeader />
            <div className="flex flex-col h-full items-center p-2 mt-4">
                <div className="w-full h-32">
                    {
                        isParticipant
                        ?
                            <>
                                <div className="flex justify-center">
                                    <Image width={96} height={96} src={Icons.star} alt="별 아이콘" />
                                </div>
                                <div className="text-2xl w-full text-center mt-2">오늘 복권 <span className="color1 font-bold"> 참여완료!</span></div>
                            </>
                        :
                        <>
                                <div class="relative w-full flex flex-col items-center">
                                    <Bubble message= {"복권 발견!"} x={"-translate-x-6"} y={"-translate-y-4"}/>
                                    <Image width={96} height={96} src={Icons.ticket} alt="티켓 아이콘" className="-rotate-12" />
                                    <Link href={"/my-card"} className="cursor-hover">
                                        <div className="flex text-2xl w-full h-10 leading-10 align-middle">오늘 복권 <span className="flex  color1">&nbsp;참여하기<FaArrowRight className="h-full align-center" /></span></div>
                                    </Link>
                                </div>
                            </>
                    }
                </div>
                <ParticipantCard men={stringValue} />
                <div className="flex w-full items-center mt-4">
                    <div className="w-[35%] h-0 border-gray-300 border-[1px]"></div>
                    <div className="w-[30%] h-8 leading-8 bg-gray-300 rounded-3xl text-center text-sm my-2 ">어제 당첨자 명단</div>
                    <div className="w-[35%] h-0 border-gray-300 border-[1px]"></div>
                </div>
                <div className=" flex-auto flex flex-col gap-4 items-center py-6 w-full">
                    {todayWinners.map((winner) => {
                        return <WinnerCard name={winner.customerName} key={winner.winnerId}/>
                    })}
                </div>
            </div>
            <WinningModal isWinner={isWinner} />
        </Suspense>
    );
}

export default LottoMain;