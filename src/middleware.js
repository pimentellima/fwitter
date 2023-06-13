import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req })
  if(!token) {
      return NextResponse.redirect(new URL("/signin", req.url));
  } 
}

export const config = {
    matcher: [
      '/((?!api|_next/static|_next/image|favicon.ico|signin|signup).*)',
    ],
  };
