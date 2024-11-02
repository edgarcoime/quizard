import { API_BASE_URL } from "@/constants";
import { headers } from "next/headers";

export async function fetchUserCollection() {

    const cookie = headers().get("cookie")

    const res = await fetch(API_BASE_URL + "/user/me/collections", cookie ? {
        credentials: 'include', 
        headers: {
            Cookie: cookie,
        },
    } : {});

    if (!res.ok) {
        console.error("API error:", res.status, res.statusText);
        return { error: res.statusText };
    }

    const data = await res.json();
    return data;
}