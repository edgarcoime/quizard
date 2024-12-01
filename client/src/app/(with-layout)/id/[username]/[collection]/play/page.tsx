"use server"
import { fetchCards } from "@/lib/api/collectionCards";
import { PlayPageClient } from "./PlayPageClient";

interface PlayProps {
  params: { username: string; collection: string };
}

export default async function PlayPage({ params }: PlayProps) {
  const cards = await fetchCards(params.collection);
  let cardsinCollection = true
  if (cards.length == 0)
    cardsinCollection = !cardsinCollection
  console.log("cards in collection: " + cards.length)
  console.log(cardsinCollection)
  return (
    <>
      { cardsinCollection ?
        <PlayPageClient cards= {cards} username={params.username} collectionName={params.collection}/> 
        : <h1 className=" flex-row justify-self-center p-4 text-xl text-red-500">No question cards in collection! Add at least one card to quiz yourself!</h1>
      }
    </>
  );
}
