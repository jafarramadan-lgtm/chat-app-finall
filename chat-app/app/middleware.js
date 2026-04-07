import { NextResponse } from "next/server";
export function middleware(request) {
  const token = request.cookies.get("userToken").value;
  console.log(token,"token")
  const isProtectedRout =
    request.nextUrl.pathname.startsWith("/Profile") ||
    request.nextUrl.pathname.startsWith("/dashboard");
 
  if (isProtectedRout && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
 
  return NextResponse.next();
}
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/Profile/:path*",
 
  ],
};
