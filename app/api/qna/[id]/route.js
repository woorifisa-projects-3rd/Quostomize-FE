'use server';
import { NextResponse } from "next/server";
import { auth } from "../../../../auth";

export async function GET(request, { params }) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" }, 
                { status: 401 }
            );
        }

        // params를 await로 처리
        const { id } = await params;

        const response = await fetch(
            `${process.env.SERVER_URL}/v1/api/qnas/${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${session.accessToken}`,
										"traceId": `${session.traceId}`
                }
            }
        );

        if (!response.ok) {
            return NextResponse.json(
                { error: "Failed to fetch question" },
                { status: response.status }
            );
        }

        const result = await response.json();
        return NextResponse.json(result);
    } catch (error) {
        console.error("Error fetching question:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}