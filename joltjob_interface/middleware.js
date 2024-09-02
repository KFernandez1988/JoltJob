import { NextResponse } from 'next/server';

export function middleware(req) {
  // const { pathname } = req.nextUrl;
  // const token = req.cookies.get('token');

  // console.log("Token:", token);
  // const url = req.url.split('/')[req.url.split('/').lenght -1];
  // console.log("URL:", url);
 

  // if (!token) {
  //   if (url !== '/login' || url !== '/registry') {
  //     console.log("No token found, redirecting to /login...");
  //     return NextResponse.redirect(new URL('/login', req.url));
  //   }
  // }

  
  // console.log("Token found, allowing access to:", pathname);
  // return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
