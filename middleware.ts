import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const publicPaths = ['/'];
    const isPublic = publicPaths.includes(pathname);
    if (isPublic) return NextResponse.next();

    const token = req.cookies.get('access-token')?.value;
    const client = req.cookies.get('client')?.value;
    const uid = req.cookies.get('uid')?.value;

    const isLoggedIn = token && client && uid;

    if (!isLoggedIn) return NextResponse.redirect(new URL('/', req.url));

    return NextResponse.next();
}

export const config = {
    matcher: [
        // match everything except
        // /
        // /login
        // /signup
        // static files and api routes
        '/((?!api|_next|favicon.ico|$).*)',
    ],
};
