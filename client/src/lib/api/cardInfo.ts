import { API_BASE_URL } from "@/constants";
import { headers } from "next/headers";

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
        if(res.status == 404){
            error_message = "404 Card does not exist! Please double check the collection name"
        }
        return { error: error_message };
    }

    const data = await res.json();
    return data;
}