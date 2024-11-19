import { NextResponse } from "next/server";
import { auth } from "../../../../auth"
import { initFet } from "../../../../utils/fetch/fet";


export async function POST(request) {
    // console.log("url 체크");
    // console.log(request);
    try {
        const fetch = await initFet();
        const body = await request.json();
        const response = await fetch.post("/login",body);

        const accessToken = response.headers.get("accessToken");
        const setCookie = response.headers.get("set-cookie").split(";");
        const refreshToken = setCookie[0].split("=")[1];
        const maxAge = setCookie[1].split("=")[1];
        const expires = setCookie[2].split("=")[1];
        const path = setCookie[3].split("=")[1];
        return Response.json({accessToken, refreshToken, maxAge, expires, path}, {status: response.status});
    } catch (e) {
        console.error(e);
        if (e.response) {
            return NextResponse.json({}, {status: e.response.status})
        }
        return NextResponse.json({}, {status:500})
    }
    
}

export async function GET(request) {
    const session = await auth();
    try{
        console.log(session.user)
    } catch {
        
    }
    return NextResponse.json({ user: session?.user || null }, { status: 200 });
 }