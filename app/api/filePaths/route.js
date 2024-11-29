import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

export async function GET(request) {
    const filePath = path.join(process.cwd(), "public/files/downloadfile.txt");
    
    try {
        // 파일 내용을 읽습니다.
        const fileContent = fs.readFileSync(filePath, "utf-8");
        
        // 텍스트 내용을 `text/plain`으로 반환합니다.
        return new NextResponse(fileContent, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "Cache-Control": "no-cache",
            },
        });
    } catch (error) {
        console.error("파일 읽기 오류:", error);
        return NextResponse.json({ error: "파일을 읽을 수 없습니다." }, { status: 500 });
    }
}