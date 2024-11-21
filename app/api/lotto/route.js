'use server' 
import { NextResponse } from "next/server";
import { auth } from "../../../auth";
import { headers } from "next/headers";

export async function GET() {
    const session = await auth();

    const response = await fetch(`${process.env.SERVER_URL}/v1/api/lottery`,
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

    if (response.status != 200) {
        return NextResponse.json({redirectUrl:'login'}, {status: response.status})
    } else {
        return NextResponse.json(result, {status:200});
    }
};