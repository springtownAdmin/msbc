import { NextResponse } from 'next/server';

export function middleware(request) {

    const currentPath = request.nextUrl.pathname;

    console.log('==============================================>')
    console.log(`Request to: ${currentPath}`);
    console.log('==============================================>')

    if (currentPath === '/custom-fields') {

        return NextResponse.redirect(new URL('/not-found', request.url));

    }

    return NextResponse.next();

}

export const config = {
    matcher: ['/custom-fields'],
};