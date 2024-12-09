'use server';

import { NextResponse } from "next/server";

export async function POST(request) {
    const body = await request.json();
    try {
        const response = await fetch(`${process.env.SERVER_URL}/v1/api/sms/confirm`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
            credentials: "include",
            cache: "no-cache",
        });

        if (response.ok) {
            return new Response(null, { status: 204 }); // 성공 시 빈 응답
        } else {
            const errorData = await response.json(); // 에러 응답 본문 처리
            return NextResponse.json(
                { message: errorData.message || '서버 오류 발생', status: response.status },
                { status: response.status }
            );
        }
    } catch (error) {
        return NextResponse.json(
            { message: '캐시가 만료되었습니다! 인증번호를 다시 전송해주세요', status: 500 },
            { status: 500 }
        );
    }
};