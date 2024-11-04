import SettingsButton from "@/components/ui/settingsButton";
import CardsView from "./CardsView";
import UserCollectionCardSettings from "@/components/partials/UserCollectionCardSettings";
import { IoPlayCircleOutline } from "react-icons/io5"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { fetchCards } from "@/lib/api/collectionCards";
import { fetchSingleCollection } from "@/lib/api/singleCollection";
import CreateResourceButton from "@/components/ui/createResourceButton";




export default async function Page({
  params,
}: {
  params: { username: string; collection: string };
}) {
  const { username, collection: collectionSlug } = params;
  // const decodedCollectionId = decodeURIComponent(collectionId);


  const settingsRoute = `/id/${username}/${collectionSlug}/settings`;
  const playRoute = `/id/${username}/${collectionSlug}/play`
  const createUrl = `/id/${username}/${collectionSlug}/new`;

  const data = await fetchCards(collectionSlug)
  const single_collection = await fetchSingleCollection(collectionSlug)
  const title = `Collection: ${single_collection.title}`;
  
  return (
    <div className="h-full static flex flex-col">
      <div className="flex-grow">
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
          <CardsView username={username} collectionSlug={collectionSlug} cards={data}/>
        </div>
        </>
      )}

      </div>


      <div className="sticky bottom-6 flex justify-end px-4">
        <CreateResourceButton href={createUrl} />
      </div>
    </div>
  );
}
