import { NextResponse } from 'next/server';

export function middleware(request) {
    
    const currentPath = request.nextUrl.pathname;

    console.log('==============================================>')
    console.log(`Request to: ${currentPath}`);
    console.log('==============================================>')
    return NextResponse.next();
    
}

export const config = {
    matcher: [ '/', '/branch', '/enquiry', '/organization' ],
};