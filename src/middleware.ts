import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { privateRoutes } from "./routes";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // cookies fetch
  const token = cookies().get("token")?.value;

  const isPrivateRoute = privateRoutes.includes(request.nextUrl.pathname);

  if (!token && isPrivateRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
