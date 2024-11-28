import { NextResponse } from "next/server";
import { auth } from '../../../../auth'

export async function PATCH(request) {
    const session = await auth();
    const searchParams = await request.nextUrl.searchParams;
    const cardSequenceId = searchParams.get('cardSequenceId');
    const accessToken = session.accessToken;

    try {
        const body = await request.json();
        const { cardSequenceId, benefitRate, lowerCategoryId, upperCategoryId } = body;

        if (!session || !session.accessToken) {
            return NextResponse.redirect(new URL("/login", `${process.env.NEXT_URL}`));
        }

        const backendResponse = await fetch(
            `${process.env.SERVER_URL}/v1/api/benefit-change/change`,
            {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify(body),
                credentials: "include",
            });

        if (!backendResponse.status === 204) {
            const errorData = await backendResponse.json();
            return NextResponse.json(
                { message: errorData.message || '서버 오류 발생', status: backendResponse.status }
            );
        }
        // const result = await backendResponse.json();
        return new Response(null, {
            status: 204,
        });
    } catch (error) {
        console.error('lottoUpdate Error:', error);
        return NextResponse.json(
            { message: '서버 오류 발생', status: 500 }
        );
    }
}