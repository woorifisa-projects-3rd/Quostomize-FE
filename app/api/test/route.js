// 
import { NextResponse } from "next/server";
import { Fet, initFet } from "../../../utils/fetch/fet"
import { auth } from "../../../auth";


export async function GET() {
    // 서버 엔드포인트 지정
    const fetch = await initFet();
    const response = await fetch.get("/v1/api/member/info");
    
    const result = await response.json();

    const session = await auth();
    console.log("세션에 refreshToken")
    console.log(session.refreshToken);
    if (response.status >= 400) {
        return NextResponse.json({redirectUrl:'login'}, {status: response.status})
    } else {
        return NextResponse.json(result);
    }
};