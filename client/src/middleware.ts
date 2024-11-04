import { NextResponse, userAgent } from "next/server";
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
    /\/id\/[^\/]+(?:\/settings|\/new|\/[^\/]+\/(?:settings|statistics|new)|\/[^\/]+\/[^\/]+\/(?:settings|statistics))/g;
  return regex.test(path);
}

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  if (/\/api\/py/.test(request.url)) {
    const {
      ua,
      browser: { name: browserName },
      device: { model: deviceModel },
    } = userAgent(request);
    if (ua != "node") {
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("X-user-agent", ua ?? "");
      requestHeaders.set("X-browser-name", browserName ?? "");
      requestHeaders.set("X-device-model", deviceModel ?? "");
      return NextResponse.next({ request: { headers: requestHeaders } });
    }

    return NextResponse.next();
  }

  const currentPath = request.nextUrl.clone();

  // Grab cookie and check for permissions
  const cookieStore = cookies();
  const cookieName = "session";
  const cookieSession = cookieStore.get(cookieName);

  // If user is unauthorized accessing protected pages
  //if (!cookieSession && isUserPath(currentPath.pathname)) {
  if (!cookieSession && isUserPath(currentPath.pathname)) {
    console.log(cookieSession);
    console.log(
      "Unauthorized Private request in: ",
      currentPath.pathname,
      isUserPath(currentPath.pathname),
    );

    // http://localhost:3000/id/johndoe/col1/settings
    // http://localhost:3000/id/johndoe/col1/new

    //Cookie is valid
    const redirectPath = `/signup`;
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  // If user is signedin but going back to signup
  if (!!cookieSession && currentPath.pathname.startsWith("/signup")) {
    console.log("Logged in user request in signup: ", currentPath.pathname);

    // Nextjs caches this call
    const cookie = headers().get("cookie");
    try {
      const data = await fetchUserData(
        cookie
          ? {
            credentials: "include",
            headers: {
              Cookie: cookie,
            },
          }
          : {},
      );

      // TODO: if user data is invalid delete local storage
      // If data is null then cookie is invalid
      if (!data) {
        const newResponse = NextResponse.next();
        newResponse.cookies.delete(cookieName);
        return newResponse;
      }

      // TODO: Think about caching userdata here to local storage
      // Cache user data here

      //Cookie is valid
      const redirectPath = `/id/${data.username}`;
      return NextResponse.redirect(new URL(redirectPath, request.url));
    } catch { }
  }

  //return NextResponse.redirect(new URL("/home", request.url));
  console.log("Request for : ", request.nextUrl.pathname, cookieSession);
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
