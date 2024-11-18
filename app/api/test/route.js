// 
import { NextResponse } from "next/server";
import { Fet, initFet } from "../../../utils/fetch/fet"

export async function GET() {
    // 서버 엔드포인트 지정
    const fetch = await initFet();
    const response = await fetch.get("/api/card-applicants");
    return NextResponse.json(await response.json());
};