import { NextResponse } from "next/server";
import { auth } from "../../../../auth";

export async function POST(request) {

    const session = await auth();

    const body = await request.json();  // 요청 본문을 JSON으로 파싱

    const response = await fetch(`${process.env.SERVER_URL}/v1/api/auth/join`,
        {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                // "Authorization": `Bearer ${session.accessToken}`
            },
            body: JSON.stringify(body),
            credentials: "include",
            cache: "force-cache"
        }
    );

    if (response.status != 200) {
        return NextResponse.redirect(new URL("/login", `${process.env.NEXT_URL}`));
    } else {
        const result = await response.json();
        return NextResponse.json(result, { status: 200 });
    }
};