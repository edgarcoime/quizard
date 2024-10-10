import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware has to reroute the following routes

//  /id/:username/settings
//  /id/:username/new
//  /id/:username/:collection/settings
//  /id/:username/:collection/statistics
//  /id/:username/:collection/new
//  /id/:username/:collection/:card/settings
//  /id/:username/:collection/:card/statistics

function isUserPath(path: string) {
  const regex =
    /\/id\/[^\/]+(?:\/settings|\/new|\/[^\/]+\/(?:settings|statistics|new)|\/[^\/]+\/[^\/]+\/(?:settings|statistics))/i;
  return regex.test(path);
}

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.clone();

  // Grab cookie and check for permissions
  const cookieName = "session";
  const cookie = request.cookies.get(cookieName);

  if (!cookie && isUserPath(currentPath.pathname)) {
    console.log(
      "Unauthorized Private request in: ",
      currentPath.pathname,
      isUserPath(currentPath.pathname),
    );
    return NextResponse.redirect(new URL("/signup", request.url));
  }

  //return NextResponse.redirect(new URL("/home", request.url));
  console.log("Request for : ", request.nextUrl.pathname);
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
