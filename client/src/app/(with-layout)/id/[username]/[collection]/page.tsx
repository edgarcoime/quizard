import SettingsButton from "@/components/ui/settingsButton";
import CardsView from "./CardsView";
import UserCollectionCardSettings from "@/components/partials/UserCollectionCardSettings";
import { IoPlayCircleOutline } from "react-icons/io5"
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page({
  params,
}: {
  params: { username: string; collection: string };
}) {
  const { username, collection: collectionId } = params;
  const decodedCollectionId = decodeURIComponent(collectionId);
  const title = `Collection: ${decodedCollectionId}`;

  const settingsRoute = `/id/${username}/${collectionId}/settings`;
  const playRoute = `/id/${username}/${collectionId}/play`
  return (
    <div>
      <UserCollectionCardSettings description="Collection Settings" />

      <h1 className="flex flex-row justify-center m-5 text-5xl">{title}</h1>

      <div className="flex justify-center">
      <Link href={playRoute}>
        <IoPlayCircleOutline className="text-5xl"></IoPlayCircleOutline>
      </Link>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 p-4">
        <CardsView username={username} collectionId={decodedCollectionId} />
      </div>


    </div>
  );
}
