'use server';
import { NextResponse } from "next/server";

export async function PATCH(request) {
    try {
        const body = await request.json();
        const token = request.headers.get('Authorization');
        
        const response = await fetch(
            `${process.env.SERVER_URL}/v1/api/member/update/password`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({
                    password: body.password
                })
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json(
                { error: errorData.message || "비밀번호 변경에 실패했습니다." },
                { status: response.status }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: "서버 오류가 발생했습니다." },
            { status: 500 }
        );
    }
}