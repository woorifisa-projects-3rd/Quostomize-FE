import { NextResponse } from "next/server";
import { auth } from "../../../../auth";

export async function PATCH(orderInfo) { // 스위칭

    const session = await auth();

    const response = await fetch(`${process.env.SERVER_URL}/v1/api/stocks/select/change-rank`, // 서버 엔드포인트 지정
        {
            method: "PATCH",
            headers: {
                "Content-type": "application",
                "Authorization": `Bearer ${session.accessToken}`
            },
            body: JSON.stringify(orderInfo),
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
    }
    if (!result.status === 204) {
        const errorData = await result.json();
        return NextResponse.json(
            { message: errorData.message || '서버 오류 발생', status: result.status }
        );
    }
};