import { API_BASE_URL } from "@/constants";
import { UserCollection } from "@/types/UserCollection";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

export async function fetchSingleCollection(collectionSlug: string) {
    let error_message = ""
    const cookie = headers().get("cookie")

    const res = await fetch(API_BASE_URL + "/collection/" + collectionSlug, cookie ? {
        credentials: 'include', 
        headers: {
            Cookie: cookie,
        },
    } : {});

    if (!res.ok) {
        console.error("API error:", res.status, res.statusText);
        throw new Error('Something went wrong, fetching a single collection!');
    }

    const data = await res.json();

    if (!data) {
        notFound();
    }



    return data;
}