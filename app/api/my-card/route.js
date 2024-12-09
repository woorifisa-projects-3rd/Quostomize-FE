import { NextResponse } from 'next/server';
import { auth } from '../../../auth';

export async function GET() {
    const session = await auth();
    const accessToken = session.accessToken;
    if (!session || !accessToken) {
        return NextResponse.redirect(new URL("/login", `${process.env.AUTH_URL}`));
    }

    try {
        const backendResponse = await fetch(`${process.env.SERVER_URL}/v1/api/my-card`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${accessToken}`,
                "traceId": `${session.traceId}`
            },
            credentials: "include",
        });

        const result = await backendResponse.json();


        if (!backendResponse.ok) {
            return NextResponse.json(
                { message: 'Backend server error' },
                { status: backendResponse.status }
            );
        }

        return NextResponse.json(result);

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { message: '서버 에러' },
            { status: 500 }
        );
    }
}