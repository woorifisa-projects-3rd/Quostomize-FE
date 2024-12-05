'use server'
import { NextResponse } from "next/server";
import { auth } from "../../../../auth";


export async function GET(request) {
    const session = await auth();
    const searchParams = await request.nextUrl.searchParams;
    const date = searchParams.get("date");
    const response = await fetch(`${process.env.SERVER_URL}/v1/api/lottery/past-winner?date=${date}`,
        {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${session.accessToken}`,
                "traceId": `${session.traceId}`
            },
            credentials: "include",
            cache: "force-cache"
        }
    );
    if (response.status != 200) {
        const result = await response.json();
        console.log(result);
        if (result.code === "I-201") {
            return NextResponse.json({ data: null }, { status: 500 });
        }
        return NextResponse.redirect(new URL("/login", `${process.env.NEXT_URL}`));
    } else {
        const result = await response.json();
        return NextResponse.json({ data: result.data }, { status: 200 });
    }
};