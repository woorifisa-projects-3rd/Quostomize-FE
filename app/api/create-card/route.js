import { NextResponse } from 'next/server';

export async function POST(request) {
    const idempotencyKey = request.headers.get('Idempotency-Key'); // 멱등성 키를 요청 헤더에서 가져옴
    if (!idempotencyKey) {
        return NextResponse.json({
            message: '멱등성 키가 필요합니다',
        }, {
            status: 400,
        });
    }
    try {
        const data = await request.json();

        // 로깅 및 데이터 처리
        console.log('카드 신청 데이터:', data);

        const backendResponse = await fetch(`${process.env.SERVER_URL}/v1/api/card-applicants`, {
            method: 'POST',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
                'Idempotency-Key': idempotencyKey,
            },
            credentials: 'include',
            body: JSON.stringify(data),
        });


        const responseData = await backendResponse.json();

        if(backendResponse.status === 201){
            return NextResponse.json({
                message: '카드 신청 성공',
                data: responseData
            }, {
                status: 201
            });
        }

    } catch (error) {
        console.error('카드 신청 에러:', error);

        return NextResponse.json({
            message: '카드 신청 실패',
            error: error.message
        }, {
            status: 500
        });
    }
}