import csrf from 'edge-csrf';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const csrfProtect = csrf({
    cookie: {
        secure: process.env.NODE_ENV === 'production',
    },
});

export async function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // csrf protection
    const csrfError = await csrfProtect(request, response);

    // check result
    if (csrfError) {
        return new NextResponse(`Invalid csrf token: ${csrfError.message}`, { status: 403 });
    }

    // return token (for use in static-optimized-example)
    if (request.nextUrl.pathname === '/csrf-token') {
        return NextResponse.json({ csrfToken: response.headers.get('X-CSRF-Token') || 'missing' });
    }

    return response;
}