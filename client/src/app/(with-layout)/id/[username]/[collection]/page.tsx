import SettingsButton from "@/components/ui/settingsButton";
import CardsView from "./CardsView";
import UserCollectionCardSettings from "@/components/partials/UserCollectionCardSettings";

export default function Page({
  params,
}: {
  params: { username: string; collection: string };
}) {
  const { username, collection: collectionId } = params;
  const decodedCollectionId = decodeURIComponent(collectionId);
  const title = `Collection: ${decodedCollectionId}`;

  const settingsRoute = `/id/${username}/${collectionId}/settings`;

  return (
    <div>
      <UserCollectionCardSettings />

      <h1 className="flex flex-row justify-center m-5 text-5xl">{title}</h1>
      <div className="flex flex-col sm:flex-row justify-center gap-4 p-4">
        <CardsView username={username} collectionId={decodedCollectionId} />
      </div>
    </div>
  );
}
