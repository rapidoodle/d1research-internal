import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Define a regular expression pattern for dynamic public routes
  const publicRoutePattern = /^\/(company-overview|consolidated-estimates|financial-overview\/d1premium-discounts|financial-overview\/consolidated-estimates|financial-overview\/companies)\/[0-9a-fA-F-]{36}$/;

  // Check if the request URL matches the dynamic public route pattern
  if (publicRoutePattern.test(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // If there is no token and the path is not /login, redirect to /login
  if (!token && req.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|static|favicon.ico|login).*)'],
};
