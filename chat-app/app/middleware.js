import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("userToken")?.value;
  const { pathname } = request.nextUrl;

  // 1. إذا كان المستخدم يملك توكن ويحاول دخول صفحة تسجيل الدخول، انقله للداشبورد
  if (token && (pathname === "/login" || pathname === "/verifyCode" || pathname === "/")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 2. إذا كان المستخدم لا يملك توكن ويحاول دخول الداشبورد أو الملف الشخصي
  const isProtectedRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/Profile");
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/Profile/:path*", "/login", "/verifyCode", "/"],
};
