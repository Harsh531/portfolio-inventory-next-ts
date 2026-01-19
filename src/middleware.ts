import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value

  console.log(token, "token")

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)

    console.log(token, "token2")
    console.log(decoded, "decoded token")

    // Only admin can access /admin
    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      decoded.role !== "admin"
    ) {
      return NextResponse.redirect(new URL("/", req.url))
    }

    return NextResponse.next()
  } catch (error) {
    console.log(error, "error in middleware")
    return NextResponse.redirect(new URL("/login", req.url))
  }
}

export const runtime = 'nodejs';

export const config = {
  matcher: ["/admin/:path*"]
}