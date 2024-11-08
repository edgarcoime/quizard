import { API_BASE_URL } from "@/constants";
import { UserCollection } from "@/types/UserCollection";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

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
        throw new Error('Something went wrong, fetching a collection!');
    }

    const data = await res.json();

    if (!data) {
        notFound();
    }



    return data;
}