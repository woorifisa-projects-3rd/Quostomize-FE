'use server' 
import { NextResponse } from "next/server";
import { auth } from "../../../auth";

export async function GET(request) {
    const session = await auth();

    const response = await fetch(`${process.env.SERVER_URL}/v1/api/lottery`,
        {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${session.accessToken}`
            },
            credentials: "include",
            cache: "force-cache"
        }
    );
    
    if (response.status != 200) {
        return NextResponse.redirect(new URL("/login", `${process.env.NEXT_URL}`));
    } else {
        const result = await response.json();
        return NextResponse.json(result, {status:200});
    }
};