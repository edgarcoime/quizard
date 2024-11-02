import { API_BASE_URL } from "@/constants";
import { headers } from "next/headers";

export default async function fetchCard(cardId:string){

    const cookie = headers().get("cookie")

    const res = await fetch(API_BASE_URL + "/card/" + cardId, cookie ? {
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