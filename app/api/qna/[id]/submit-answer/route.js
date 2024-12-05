'use server';
import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";

export async function POST(request, context) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" }, 
                { status: 401 }
            );
        }

        // params를 비동기로 처리
        const { id } = await context.params; // 수정된 부분
        const body = await request.json();

        const response = await fetch(
            `${process.env.SERVER_URL}/v1/api/qnas/${id}/submit-answer`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session.accessToken}`
                },
                body: JSON.stringify({
                    responseContent: body.responseContent
                })
            }
        );

        if (!response.ok) {
            const contentType = response.headers.get("Content-Type");
            let errorData;

            if (contentType && contentType.includes("application/json")) {
                errorData = await response.json();
            } else {
                errorData = { message: "Unknown error occurred" };
            }

            return NextResponse.json(
                { error: errorData.message || "Failed to submit answer" },
                { status: response.status }
            );
        }

        const result = await response.json();
        return NextResponse.json(result);
    } catch (error) {
        console.error("Error submitting answer:", error);
        return NextResponse.json(
            { error: "Internal Server Error" }, 
            { status: 500 }
        );
    }
}
