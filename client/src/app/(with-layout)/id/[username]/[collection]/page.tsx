import SettingsButton from "@/components/ui/settingsButton";
import CardsView from "./CardsView";
import UserCollectionCardSettings from "@/components/partials/UserCollectionCardSettings";
import { IoPlayCircleOutline } from "react-icons/io5"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { fetchCards } from "@/lib/api/collectionCards";

export default async function Page({
  params,
}: {
  params: { username: string; collection: string };
}) {
  const { username, collection: collectionId } = params;
  const decodedCollectionId = decodeURIComponent(collectionId);
  const title = `Collection: ${decodedCollectionId}`;

  const settingsRoute = `/id/${username}/${collectionId}/settings`;
  const playRoute = `/id/${username}/${collectionId}/play`

  const data = await fetchCards(decodedCollectionId)
  
  return (
    <div>
      {data.error ?  (<h1 className="text-3xl text-red-600 p-4">{data.error}</h1> ): ( 
        <>
      <UserCollectionCardSettings description="Collection Settings" />

      <h1 className="flex flex-row justify-center m-5 text-5xl">{title}</h1>

      <div className="flex justify-center">
      <Link href={playRoute}>
        <IoPlayCircleOutline className="text-5xl"></IoPlayCircleOutline>
      </Link>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 p-4">
        <CardsView username={username} collectionId={decodedCollectionId} cards={data}/>
      </div>
      </>
    )}

    </div>
  );
}
