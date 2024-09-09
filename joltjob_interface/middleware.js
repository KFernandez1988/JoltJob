import { NextResponse } from 'next/server';

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('token')?.value;

  console.log("Token:", token);
 

  if (!token) {
      console.log("No token found, redirecting to /login...");
      return NextResponse.redirect(new URL('/login', req.url));
  }

  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/business', '/matching', '/employees', '/subs'
  ],
};
