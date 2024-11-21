import { NextResponse } from 'next/server';
import { auth } from "./auth";

export default auth((req) => {

    const session = req.auth;
    const goalURL = req.nextUrl.pathname.slice(1);
    
    if (!session) {  
        console.error('No session, redirecting to login');
        return NextResponse.redirect(
            new URL(`/login?to=${goalURL}`, req.url)
        );  
    }
    
    return NextResponse.next();
});

export const config = {  
    matcher: [
        "/change-benefits/:path*",
        "/lotto/:path*",
        "/my-card/:path*",
        "/piece-stock/:path*"
    ] 
};