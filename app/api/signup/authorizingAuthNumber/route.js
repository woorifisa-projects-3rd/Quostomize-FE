import { NextResponse } from "next/server";

export async function POST(request) {


    const body = await request.json();  // 요청 본문을 JSON으로 파싱

    const response = await fetch(`${process.env.SERVER_URL}/v1/api/sms/confirm`,
        {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(body),
            credentials: "include",
            cache: "no-cache"
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