import { NextResponse } from 'next/server';
import { auth } from "./auth";

export default auth((req) => {

    const session = req.auth;
    const goalURL = req.nextUrl.pathname.slice(1);

    if (!session) {  
        console.error('No session, redirecting to login');
        if (goalURL !== "login") {
            return NextResponse.redirect(
                new URL(`/login?to=${goalURL}`, req.url)
            );  
        } else {
            return NextResponse.redirect(
                new URL(`/login`, req.url)
            );  
        }
    }
    
    return NextResponse.next();
});

export const config = {  
    matcher: [
        "/change-benefits/:path*",
        "/my-card/:path*",
        "/lotto/:path*",
        "/piece-stock/:path*"
    ] 
};