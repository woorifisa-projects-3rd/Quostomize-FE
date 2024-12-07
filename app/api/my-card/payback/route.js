import {NextResponse} from "next/server";
import {auth} from "../../../../auth";

export async function PATCH(request){
    const searchParams = await request.nextUrl.searchParams;
    const cardSequenceId = searchParams.get('cardSequenceId');
    const session = await auth();
    const accessToken = session.accessToken;

    try {
        const body = await request.json();
        const {pointUsageTypeId, isPayback} = body;
        if (!cardSequenceId || isPayback === undefined || !pointUsageTypeId) {
            return NextResponse.json(
                {message: '필요한 값 누락'},
                {status: 400}
            );
        }

        const backendResponse = await fetch(
            `${process.env.SERVER_URL}/v1/api/my-card/${cardSequenceId}/payback`,
            {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    "traceId": `${session.traceId}`
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
        console.error('paybackUpdate Error:', error);
        return NextResponse.json(
            {message: '서버 오류 발생', status: 500}
        )
    }
}