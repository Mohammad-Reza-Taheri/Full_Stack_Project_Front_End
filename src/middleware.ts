import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;

  // Redirect unauthorized users
  if (!token) {
    
    const loginUrl = new URL("/login", req.url);

    // ✅ Preserve query parameters (next route)
    loginUrl.searchParams.set("next", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);

    //previous method
    // return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Define protected routes
export const config = {
  matcher: ["/add_category",'/category/:category_id'], // Only apply middleware to protected pages
};