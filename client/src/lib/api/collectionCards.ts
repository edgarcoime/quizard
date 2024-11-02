import { API_BASE_URL } from "@/constants";
import { headers } from "next/headers";
import { fetchUserCollection } from "./userCollections";
import { UserCollection } from "@/types/UserCollection";


export async function fetchCards(collectionName: string) {

    const cookie = headers().get("cookie")

    let collectionId : string = ""
    
    let collections = await fetchUserCollection()

    collections.map((collection: UserCollection) =>{
        if(collection.title == collectionName){
            collectionId = collection.id
        }
    })
    console.log("------------- colleciton Id" + collectionId)
    const res = await fetch(API_BASE_URL + "/collection/" + collectionId + "/cards", cookie ? {
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