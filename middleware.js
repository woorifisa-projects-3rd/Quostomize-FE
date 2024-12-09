import { NextResponse } from 'next/server';
import { auth } from "./auth";
import { cookies } from 'next/headers';

export default auth(async (req) => {
    const session = await auth();
    const goalURL = req.nextUrl.pathname.slice(1);
    const cookieList = await cookies();

    const now = new Date();

    // 오늘의 자정을 계산
    const endOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        23, 59, 59, 999
    );

    if (!cookieList.has("winner_checked")) {
        cookieList.set("winner_checked", "false", 
            {
                expires: endOfDay.getTime()
            }
        );
    }

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
        "/benefit-change/:path*",
        "/my-card/:path*",
        "/lotto/:path*",
        "/piece-stock/:path*",
        "/my-page/:path*"
    ] 
};

export { auth as middleware } from "./auth"