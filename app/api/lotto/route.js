'use server' 
import { NextResponse } from "next/server";
import { auth } from "../../../auth";

export async function GET(request) {
    const session = await auth();
    try {
        const response = await fetch(`${process.env.SERVER_URL}/v1/api/lottery`,
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
            return NextResponse.redirect(new URL("/login", `${process.env.AUTH_URL}`));
        } else {
            const result = await response.json();
            return NextResponse.json(result, {status:200});
        }
    } catch (err) {
        return NextResponse.json({message:"네트워크가 불안정하거나 서버에서 오류가 발생했습니다.\n잠시 후 다시 시도해주세요."}, {status:500})
    }
};