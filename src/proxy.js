import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default async function middleware(req) {
  const { pathname } = req.nextUrl;

  // console.log("PATH:", pathname);
  // console.log("RUNNING MIDDLEWARE");

  const publicRoutes = [
    "/",
    "/pages/signup",
    "/pages/signin",
    "/api/auth",
    "favicon.ico",
  ];

  if (
    publicRoutes.some((path) =>
      path === "/" ? pathname === "/" : pathname.startsWith(path),
    )
  ) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    const loginUrl = new URL("/pages/signin", req.url);
    loginUrl.searchParams.set("callbackUrl", req.url);
    loginUrl.searchParams.set("error", "Please login first.");
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|node_modules).*)",
};
