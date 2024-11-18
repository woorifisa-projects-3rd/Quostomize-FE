export { auth as middleware } from "./auth"
import { NextResponse } from 'next/server';

export async function middleware(req) {  
    const session = await auth();  
    if (!session) {  
        return NextResponse.redirect(new URL("/login", req.url));  
    }
    return NextResponse.next();
}

// 미들웨어를 적용할 라우터 -> 로그인을 해야만 접근할 수 있는 곳  
export const config = {  
    matcher: [
        "/change-benefits/:path*",
        "/lotto/:path*",
        "/mycard/:path*",
        "/piece-stock/:path*"
    ] 
};