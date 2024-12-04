'use server';
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json();
        
        const response = await fetch(
            `${process.env.SERVER_URL}/v1/api/auth/search-password/confirm`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json(
                { error: errorData.message || "인증번호가 일치하지 않습니다." },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: "서버 오류가 발생했습니다." },
            { status: 500 }
        );
    }
}