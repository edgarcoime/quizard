"use server"
import { fetchCards } from "@/lib/api/collectionCards";
import { PlayPageClient } from "./PlayPageClient";

interface PlayProps {
  params: { username: string; collection: string };
}

export default async function PlayPage({ params }: PlayProps) {
  const cards = await fetchCards(params.collection);
  
  return (
    <>
      <PlayPageClient cards= {cards} username={params.username} collectionName={params.collection}/>
    </>
  );
}
