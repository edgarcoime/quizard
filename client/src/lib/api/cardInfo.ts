import { API_BASE_URL } from "@/constants";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

export default async function fetchCard(cardId:string){

    const cookie = headers().get("cookie")
    let error_message = ""
    const res = await fetch(API_BASE_URL + "/card/" + cardId, cookie ? {
        credentials: 'include', 
        headers: {
            Cookie: cookie,
        },
    } : {});

    if (!res.ok) {
        console.error("API error:", res.status, res.statusText);
        throw new Error('Something went wrong, fetching the card information!');
    }

    const data = await res.json();

    if (!data) {
        notFound();
    }
    
    return data;
}