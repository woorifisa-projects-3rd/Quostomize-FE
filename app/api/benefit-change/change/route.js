import { NextResponse } from "next/server";
import { auth } from '../../../../auth'

export async function PATCH(request, newbenefits) {
    const session = await auth();
    const searchParams = await request.nextUrl.searchParams;
    const cardSequenceId = searchParams.get('cardSequenceId');
    const accessToken = session.accessToken;

    try {
        const body = await request.json();
        const { cardSequenceId, } = body;

        if (!session || !session.accessToken) {
            return NextResponse.redirect(new URL("/login", `${process.env.NEXT_URL}`));
        }

        const backendResponse = await fetch(`${process.env.SERVER_URL}/v1/api/benefit-change/change`,
            {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify(body),
                credentials: "include",
            });

        if (!backendResponse.ok) {
            if (backendResponse.status === 401) {
                return NextResponse.redirect(new URL("/login", `${process.env.NEXT_URL}`));
            } else if (backendResponse.status === 403) {
                return NextResponse.json(
                    { message: "로그인 후 다시 시도해 주세요." },
                    { status: 403 }
                )
            } else {
                return NextResponse.json(
                    { message: "문제가 발생했습니다. 다시 시도해 주세요." },
                    { status: backendResponse.status }
                );
            }
        }
        const result = await backendResponse.json();
        return NextResponse.json(result);


    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { message: '서버 에러' },
            { status: 500 }
        );

    }
}