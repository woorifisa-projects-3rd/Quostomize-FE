import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";

export async function GET(request) { // 위시조회

    const session = await auth();
    const url = new URL(request.url);
    const cardId = url.searchParams.get('cardId');
    const response = await fetch(`${process.env.SERVER_URL}/v1/api/stocks/select?cardId=${cardId}`, // 서버 엔드포인트 지정
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

    if (!response.ok) {
        throw new Error('데이터를 가져오지 못했습니다.');
    }

    const result = await response.json();

    if (response.status >= 400) {
        return NextResponse.json({ redirectUrl: 'login' }, { status: response.status })
    } else {
        return NextResponse.json(result.data, { status: 200 });
    }
};