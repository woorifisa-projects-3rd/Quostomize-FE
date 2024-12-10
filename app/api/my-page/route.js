import { NextResponse } from "next/server";
import { auth } from "../../../auth";
import { cookies } from "next/headers";

export async function GET(request) {
    
    const session = await auth();

    if (!session || !session.accessToken) {
        return NextResponse.redirect(new URL("/login", `${process.env.AUTH_URL}`));
    }

    const accessToken = session.accessToken;
    const traceId = session.traceId;

    

    const response = await fetch(`${process.env.SERVER_URL}/v1/api/member/info`,
        {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
                "traceId": `${traceId}`
            },
            credentials: "include",
            cache: "no-store"
        }
    );


    if (response.status != 200) {
        if (response.status === 403 || response.status === 401) {
            if (response.status === 403) {
                const cookieList = await cookies();
                const logoutResponse = await fetch(`${process.env.AUTH_URL}/api/auth/logout`, {
                    method: "POST",
                    headers: {
                      "Content-type": "application/json",
                      Cookie: cookieList
                    },
                    cache: "no-store",
                    credentials:"include",
                    body: {
                      message: "로그아웃 요청"
                    }
                  });
                return NextResponse.json({message: "페이지 접근 권한이 존재하지 않습니다."}, {status: 403})
            }
            return NextResponse.json({message: "로그인 하지 않은 사용자입니다."}, {status: 401});
        }
    } else {
        const result = await response.json();
        return NextResponse.json(result, {status:200});
    }
};