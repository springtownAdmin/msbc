import { NextResponse } from 'next/server';

export function middleware(request) {
    
    const currentPath = request.nextUrl.pathname;

    console.log(`Request to: ${currentPath}`);
    return NextResponse.next();
    
}

export const config = {
    matcher: [ '/' ],
};