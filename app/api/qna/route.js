'use server';
import { NextResponse } from "next/server";
import { auth } from "../../../auth";

// QnA 목록 조회
export async function GET(request) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" }, 
                { status: 401 }
            );
        }

        const searchParams = request.nextUrl.searchParams;
        const page = searchParams.get("page") || 0;
        
        const response = await fetch(
            `${process.env.SERVER_URL}/v1/api/qnas?page=${page}`,
            {
                headers: {
                    "Authorization": `Bearer ${session.accessToken}`
                }
            }
        );

        if (!response.ok) {
            return NextResponse.json(
                { error: "Failed to fetch QnA list" },
                { status: response.status }
            );
        }

        const result = await response.json();
        return NextResponse.json(result);
    } catch (error) {
        console.error("Error fetching QnA list:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

// QnA 작성
export async function POST(request) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" }, 
                { status: 401 }
            );
        }

        const body = await request.json();
        if (!body.questionTitle || !body.questionContent || !body.categoryCode) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const response = await fetch(
            `${process.env.SERVER_URL}/v1/api/qnas`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session.accessToken}`
                },
                body: JSON.stringify(body)
            }
        );

        if (!response.ok) {
            return NextResponse.json(
                { error: "Failed to create QnA" },
                { status: response.status }
            );
        }

        const result = await response.json();
        return NextResponse.json(result);
    } catch (error) {
        console.error("Error creating QnA:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}