import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";

export async function GET(request) { // 종목 추가

    const session = await auth();

    const url = new URL(request.url)
    const stockName = url.searchParams.get("stockName")

    const response = await fetch(`${process.env.SERVER_URL}/v1/api/stocks/recommendations/add?stockName=${stockName}`, // 서버 엔드포인트 지정
        {
            method: "GET",
            headers: {
                "Content-type": "application",
                "Authorization": `Bearer ${session.accessToken}`
            },
            credentials: "include",
            cache: "no-store"
        }
    );

     if (!response.status === 204) {
            const errorData = await response.json();
            return NextResponse.json(
                { message: errorData.message || '서버 오류 발생', status: response.status }
            );
        }
        return new Response(null, {
            status: 204,
        });

};