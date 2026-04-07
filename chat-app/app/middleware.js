import { NextResponse } from "next/server";
export function middleware(request) {
  const token = request.cookies.get("userToken").value;
  console.log(token,"token")
  const isProtectedRout =
    request.nextUrl.pathname.startsWith("/Profile") ||
    request.nextUrl.pathname.startsWith("/dashboard");
  const isAuthRoute =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register") ||
    request.nextUrl.pathname.startsWith("/verifyCode");
  if (isProtectedRout && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/Profile/:path*",
    "/login/:path*",
    "/register/:path*",
    "/verifyCode/:path*",
  ],
};
