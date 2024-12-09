import { NextResponse } from "next/server";

export async function GET(request) {

    const url = new URL(request.url);
    const memberId = url.searchParams.get('memberId');

    const response = await fetch(`${process.env.SERVER_URL}/v1/api/auth/checkId?memberId=${memberId}`,
        {
            method: "GET",
            headers: {
                "Content-type": "application/json",
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