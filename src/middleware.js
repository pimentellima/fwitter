import { getAuth, withClerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const publicPaths = ["/signin*", "/signup*"];

const isPublic = (path) => {
  return publicPaths.find((x) =>
    path.match(new RegExp(`^${x}$`.replace("*$", "($|/)")))
  );
};

export default withClerkMiddleware((req) => {
  if (isPublic(req.nextUrl.pathname)) {
    return NextResponse.next();
  }
  // if the user is not signed in redirect them to the sign in page.
  const { userId } = getAuth(req);

  if (!userId) {
    const signInUrl = new URL("/signin", req.url);
    signInUrl.searchParams.set("redirect_url", req.url);
    return NextResponse.redirect(signInUrl);
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
