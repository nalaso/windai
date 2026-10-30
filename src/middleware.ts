import { NextResponse, type NextRequest } from "next/server";

// WindAI is retired: only the home page (the move notice) is served. Every other
// page redirects there, and every API route, sign-in included, is gone.
export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // SessionProvider still asks for the session; answer "signed out" so it stays quiet.
    if (pathname === "/api/auth/session") {
        return NextResponse.json({});
    }
    if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "WindAI is now Paddlewheel: https://paddlewheel.dev" }, { status: 410 });
    }
    // No server actions run anywhere any more.
    if (req.method !== "GET" && req.method !== "HEAD") {
        return new NextResponse(null, { status: 410 });
    }
    if (pathname !== "/") {
        return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
}

export const config = {
    // Everything except Next's own files and the icons the notice page uses.
    matcher: ["/((?!_next/|favicon.ico|icon.png|icon$).*)"],
};
