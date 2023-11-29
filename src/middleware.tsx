import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const AUTHORIZATION_HEADER_KEY = 'x-uml-authorization-key'

export async function middleware(request: NextRequest) {
    const token = process.env.AUTHORIZATION_TOKEN;
    if (!token) {
        throw new Error('Please, set Auth token var');
    }

    const response = NextResponse.next();
    response.headers.set(AUTHORIZATION_HEADER_KEY, token);

    return response;
}

export const config = {
    matcher: '/api/image-uploader',
}