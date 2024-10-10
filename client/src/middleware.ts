import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { fetchUserData } from "./lib/api/userData";
import { headers, cookies } from "next/headers";

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
export async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.clone();

  // Grab cookie and check for permissions
  const cookieStore = cookies();
  const cookieName = "session";
  const cookieSession = cookieStore.get(cookieName);

  // If user is unauthorized accessing protected pages
  if (!cookieSession && isUserPath(currentPath.pathname)) {
    console.log(
      "Unauthorized Private request in: ",
      currentPath.pathname,
      isUserPath(currentPath.pathname),
    );

    return NextResponse.redirect(new URL("/signup", request.url));
  }

  // If user is signedin but going back to signup
  if (!!cookieSession && currentPath.pathname.startsWith("/signup")) {
    console.log("Logged in user request in signup: ", currentPath.pathname);
    // Nextjs caches this call
    const data = await fetchUserData({
      credentials: "include",
      headers: headers(),
    });

    // TODO: if user data is invalid delete local storage
    // If data is null then cookie is invalid
    if (!data) {
      cookieStore.delete(cookieName);
      return NextResponse.next();
    }

    // TODO: Think about caching userdata here to local storage
    // Cache user data here

    // Cookie is valid
    const redirectPath = `/id/${data.username}`;
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  //return NextResponse.redirect(new URL("/home", request.url));
  console.log("Request for : ", request.nextUrl.pathname, cookieSession);
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
