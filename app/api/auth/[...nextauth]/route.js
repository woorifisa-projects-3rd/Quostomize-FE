import { NextResponse } from "next/server";
import { handlers } from "../../../../auth" // Referring to the auth.ts we just created
import { Fet } from "../../../../utils/fetch/fet"


export async function POST(request) {
    console.log("POST 실행");
    try {
        const body = await request.json();
        const response = await Fet.post("/login",body);

        const accessToken = response.headers.get("accessToken");
        const setCookie = response.headers.get("set-cookie").split(";");
        const refreshToken = setCookie[0].split("=")[1];
        const maxAge = setCookie[1].split("=")[1];
        const expires = setCookie[2].split("=")[1];
        const path = setCookie[3].split("=")[1];
        return Response.json({accessToken, refreshToken, maxAge, expires, path}, {status: response.status});
    } catch (e) {
        if (e.response) {
            return NextResponse.json({}, {status: e.response.status})
        }
        return NextResponse.json({}, {status:500})
    }
    
}