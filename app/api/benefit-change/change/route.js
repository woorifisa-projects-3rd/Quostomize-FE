import { NextResponse } from "next/server";
import { auth } from '../../../../auth'

export async function PATCH(request) {
    const session = await auth();
    const accessToken = session.accessToken;
    console.log("요청 보낼 거야")

    try {
        const body = await request.json();

        if (!session || !session.accessToken) {
            console.log("로그인 필요!")
            return NextResponse.redirect(new URL("/login", `${process.env.AUTH_URL}`));
        }

        for (let item of body) {
            const cardSequenceId = item.cardSequenceId;
            const benefitRate = item.benefitRate;
            const secondaryAuthCode = item.secondaryAuthCode;
            if (!cardSequenceId || benefitRate === null) {
                return NextResponse.json({
                    message: "필수 필드가 누락되었습니다.",
                    status: 400
                });
            }
        }

        const backendResponse = await fetch(
            `${process.env.SERVER_URL}/v1/api/benefit-change/change`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify(body),
                cache: "no-store",
                credentials: "include",
            });

        if (backendResponse.status !== 204) {
            return NextResponse.json(
                { message: "변경이 되지 않았습니다.", status: backendResponse.status }
            );
        }
        console.log("요청을 성공적으로 보냈어")
        return new Response(null, {
            status: 204,
        });
    } catch (error) {
        console.log("오류가 났어...")
        console.error('Error:', error);
        return NextResponse.json(
            {
                authSuccess: false, message: '서버 오류 발생', status: 500
            }
        );
    }
}