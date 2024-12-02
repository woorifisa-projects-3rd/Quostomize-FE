import { NextResponse } from "next/server";
import { auth } from "../../../../auth";


export async function GET(request) {

    const session = await auth();

    const url = new URL(request.url);
    const memberId = url.searchParams.get('memberId');

    const response = await fetch(`${process.env.SERVER_URL}/v1/api/auth/checkId?memberId=${memberId}`,
        {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${session.accessToken}`
            },
            credentials: "include",
            cache: "no-store"
        }

    );

    const result = await response.json();

    if (response.status >= 400) {
        return NextResponse.json({redirectUrl:'login'}, {status: response.status})
    } else {
        return NextResponse.json(result, {status:200});
    }
};