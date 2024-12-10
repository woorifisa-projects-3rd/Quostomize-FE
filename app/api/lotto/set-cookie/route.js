'use server' 
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function GET(request) {
    const cookieList = await cookies();
    const count = parseInt(cookieList.get("winner_checked").value);

    const newCount = `${count+1}`

    const now = new Date();
    
    // 오늘의 자정을 계산
    const endOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        23, 59, 59, 999
    );

  
    if (cookieList.has("winner_checked")) {
      cookieList.set("winner_checked", newCount, 
          {
              expires: endOfDay.getTime()
          }
      );
  }
    return NextResponse.json({message: "쿠키 설정"}, {status: 200})
};