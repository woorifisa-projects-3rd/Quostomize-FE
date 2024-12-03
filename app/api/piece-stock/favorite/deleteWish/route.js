import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";

export async function DELETE(request) { // 위시삭제

    const session = await auth();
    const url = new URL(request.url);
    const cardId = url.searchParams.get('cardId');
    const order = url.searchParams.get('order');
    const queryParams = new URLSearchParams();
    if (cardId) queryParams.append('cardId', cardId);
    if (order) queryParams.append('order', order);
    const response = await fetch(`${process.env.SERVER_URL}/v1/api/stocks/select?${queryParams}`, // 서버 엔드포인트 지정
        {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${session.accessToken}`
            },
            credentials: "include",
            cache: "no-store"
        }
    );

    if (!response.ok) {
        throw new Error('데이터를 가져오지 못했습니다.');
    }

    if (!response.status === 204) {
        const errorData = await response.json();
        return NextResponse.json(
            { message: errorData.message || '서버 오류 발생', status: response.status }
        );
    }
    return new Response(null, {
        status: 204,
    });

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