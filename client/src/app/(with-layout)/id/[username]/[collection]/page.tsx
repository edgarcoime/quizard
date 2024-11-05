import SettingsButton from "@/components/ui/settingsButton";
import CardsView from "./CardsView";
import UserCollectionCardSettings from "@/components/partials/UserCollectionCardSettings";
import { IoPlayCircleOutline } from "react-icons/io5"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { fetchCards } from "@/lib/api/collectionCards";
import { fetchSingleCollection } from "@/lib/api/singleCollection";
import { getAllByCollection } from "@/lib/api/card";
import { getSingle } from "@/lib/api/collection";
import CreateResourceButton from "@/components/ui/createResourceButton";
import FloatingResourceButtons from "@/components/partials/FloatingResourceButtons";

// TODO: refactor and add fetch logic to ensure this resource is the users
async function validateOwner(): Promise<boolean> {
  return true;
}


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

  const cards = await getAllByCollection(collectionSlug)
  const collection = await getSingle(collectionSlug)

  const title = `Collection: ${collection.title}`;
  
  return (
    <FloatingResourceButtons
      createUrl={createUrl}
      ownerPrivilegeValidator={validateOwner}
    >
        <UserCollectionCardSettings description="Collection Settings" />

        <h1 className="flex flex-row justify-center m-5 text-5xl">{title}</h1>

        <div className="flex justify-center">
        <Link href={playRoute}>
          <IoPlayCircleOutline className="text-5xl"></IoPlayCircleOutline>
        </Link>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 p-4">
          <CardsView username={username} collectionSlug={collectionSlug} cards={cards}/>
        </div>


    </FloatingResourceButtons>
  );
}
