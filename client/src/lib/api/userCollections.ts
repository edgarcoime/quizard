import { API_BASE_URL } from "@/constants";
import { headers } from "next/headers";

export async function fetchUserCollection() {
    let error_message = ""
    const cookie = headers().get("cookie")

    const res = await fetch(API_BASE_URL + "/user/me/collections", cookie ? {
        credentials: 'include', 
        headers: {
            Cookie: cookie,
        },
    } : {});

    if (!res.ok) {
        console.error("API error:", res.status, res.statusText);
        if(res.status == 401){
            error_message = "401 User does not exist! Please double check the username"
        }
        return { error: error_message };
    }

    const data = await res.json();

    return data;
}