import { NextResponse } from "next/server";
import { auth } from "../../../auth";

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
            return NextResponse.redirect(new URL("/login", `${process.env.AUTH_URL}`));
        }
    } else {
        const result = await response.json();
        return NextResponse.json(result, {status:200});
    }
};