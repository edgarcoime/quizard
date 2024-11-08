import { API_BASE_URL } from "@/constants";
import { headers } from "next/headers";
import { fetchUserCollection } from "./userCollections";
import { UserCollection } from "@/types/UserCollection";
import { notFound } from "next/navigation";


export async function fetchCards(collectionSlug: string) {
    let error_message = ""
    const cookie = headers().get("cookie")

    let collectionId : string = ""
    
    let collections = await fetchUserCollection()

    collections.map((collection: UserCollection) =>{
        if(collection.slug == collectionSlug){
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
        console.error("fetching cards API error:", res.status, res.statusText);
        throw new Error('Something went wrong, fetching a card!');
    }

    const data = await res.json();

    if (!data) {
        notFound();
    }
    
    return data;
}