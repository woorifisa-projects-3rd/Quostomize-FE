import {auth} from "../../../../auth";
import {NextResponse} from "next/server";

export async function PATCH(request) {
    const searchParams = await request.nextUrl.searchParams;
    const cardSequenceId = searchParams.get('cardSequenceId');
    const session = await auth();
    const accessToken = session.accessToken;

    try {
        const body = await request.json();
        const {pointUsageTypeId, isPieceStock} = body;
        if (!cardSequenceId || isPieceStock === undefined || !pointUsageTypeId) {
            return NextResponse.json(
                {message: '필요한 값 누락'},
                {status: 400}
            );
        }
        const backendResponse = await fetch(
            `${process.env.SERVER_URL}/v1/api/my-card/${cardSequenceId}/piece-stock`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(body),
                credentials: "include",
            }
        );
        if (!backendResponse.status === 204) {
            const errorData = await backendResponse.json();
            return NextResponse.json(
                {message: errorData.message || '서버 오류 발생', status: backendResponse.status }
            );
        }
        return new Response(null, {
            status: 204,
        });
    } catch (error) {
        console.error('stockUpdate Error: ', error);
        return NextResponse.json(
            {message: '서버 오류 발생', status: 500}
        )
    }
}