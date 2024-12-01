'use server';
import { NextResponse } from "next/server";

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const name = searchParams.get("name");
    const phone = searchParams.get("phone");

    try {
        const response = await fetch(
            `${process.env.SERVER_URL}/v1/api/auth/search-id?name=${name}&phone=${phone}`
        );

        if (!response.ok) {
            return NextResponse.json(
                { error: "Failed to find ID" },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}