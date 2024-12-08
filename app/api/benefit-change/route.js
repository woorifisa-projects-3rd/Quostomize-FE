import { NextResponse } from 'next/server';
import { auth } from '../../../auth';

export async function GET() {
    const session = await auth();
    try {
        if (!session || !session.accessToken) {
            return NextResponse.redirect(new URL("/login", `${process.env.NEXT_URL}`));
        }
        const accessToken = session.accessToken;
        const backendResponse = await fetch(`${process.env.SERVER_URL}/v1/api/benefit-change`,
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${accessToken}`
                },
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

    }
    catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { message: '서버 에러' },
            { status: 500 }
        );
    }
}