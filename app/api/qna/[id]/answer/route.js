'use server';

import { NextResponse } from 'next/server';
import { auth } from '../../../../../auth';

export async function GET(request, { params }) {
    try {
        const session = await auth();
        if (!session) {
        return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
        );
        }

        const { id } = await params;

        const response = await fetch(
        `${process.env.SERVER_URL}/v1/api/qnas/${id}/answer`,
        {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.accessToken}`,
            'traceId': `${session.traceId}`,
            },
        }
        );

        if (!response.ok) {
        const errorText = await response.text();
        return NextResponse.json(
            { error: `Failed to fetch answer: ${errorText}` },
            { status: response.status }
        );
        }

        const result = await response.json();
        return NextResponse.json(result);
    } catch (error) {
        console.error('Error fetching answer:', error);
        return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
        );
    }
}