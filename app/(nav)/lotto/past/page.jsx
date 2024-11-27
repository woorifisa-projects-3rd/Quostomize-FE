'use client'

import WinnerCard from "../../../../components/card/WinnerCard";
import { redirect, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import BottomDrawer from "../../../../components/overlay/bottomDrawer"
import Calendar from "../../../../components/calendar/calendar"


const LottoPast = () => {
    const searchParams = useSearchParams();
    const [date, setDate] = useState(searchParams.get("date"));

    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [winners, setWinners] = useState([]);
    
    const getWinners = async(date) => {
        const response = await fetch(
            `/api/lotto/past-winner?date=${date}`
            ,
            {
                method: "GET",
                cache: "no-store",
                headers: {
                    "Content-type": "application/json"
                },
                credentials: "include"
            },
        );

        if (response.redirected) {
            redirect(response.url);
        } else {
            const result = await response.json();
            setWinners(result.data);
        }
    }

    useEffect(() => {
        setDate(searchParams.get("date"));
    },[searchParams])

    useEffect(() => {
        console.log(date);
        getWinners(date);
    },[date])

    return (
        <Suspense>
            <div className="flex flex-col h-full items-center p-2">
                <div className="w-5/6 text-xl mb-2">
                    과거 당첨자 확인
                </div>
                <div className="w-5/6 flex justify-end items-end mt-3">
                    <div 
                        className="w-28 h-10 leading-10 color1 text-center align-middle rounded-md cursor-pointer"
                        onClick = {() => {setDrawerOpen(true)}}
                    >
                        날짜로 검색
                    </div>
                </div>
                
                <div className=" flex-auto flex flex-col gap-4 items-center py-1 w-full h-[67%] overflow-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {   winners 
                        ?
                            winners.length >= 1
                            ?
                                winners.map((winner) => {
                                    return <WinnerCard name={winner.customerName} key={winner.winnerId}/>
                                })
                            :
                            "선택하신 날짜에 당첨자가 존재하지 않습니다.\n 다른 날짜를 선택해주세요."
                        :
                            "서버에서 오류가 발생했습니다.\n 잠시 후 다시 시도해주세요."
                    }
                </div>
                <BottomDrawer isOpen={isDrawerOpen} setIsOpen={setDrawerOpen} height={"h-[30rem]"} children={<Calendar date={date} setDate={setDate} isDrawerOpen={isDrawerOpen} setDrawerOpen={setDrawerOpen}/>} />
            </div>
      </Suspense>
    );
}

export default LottoPast;