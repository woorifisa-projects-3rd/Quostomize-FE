import { NextResponse } from "next/server";
import { auth } from "../../../../auth"

export async function POST(request) {
    const session = await auth();
    
    if (!session) {
      return NextResponse.json({ message: "No active session" }, { status: 200 });
    }

    const accessToken = session.accessToken;
    const refreshToken = session.refreshToken;
    const traceId = session.traceId;

    const logoutResponse = await fetch(`${process.env.SERVER_URL}/v1/api/auth/logout`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Cookie: `refreshToken=${refreshToken}`,
        "traceId": `${traceId}`
      },
      body: JSON.stringify({
        accessToken: accessToken
      })
    });

    console.log("route.js response");
    console.log(logoutResponse);

    if (!logoutResponse.ok) {
      throw new Error('Logout failed on server');
    }

    // 성공적인 로그아웃 응답
    return NextResponse.json({ message: "Logged out successfully" }, { 
      status: 200,
      headers: {
        // 명시적으로 로그인 페이지로 리다이렉트
        "Location": "/login"
      }
    });
}