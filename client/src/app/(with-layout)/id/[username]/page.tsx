import CollectionView from "./CollectionView";
import UserCollectionCardSettings from "@/components/partials/UserCollectionCardSettings";
import { fetchUserData } from "@/lib/api/fetchUserData";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;
  const data = await fetchUserData();

  return (
    <div>
      {JSON.stringify(data, null, 2)}
      <UserCollectionCardSettings />
      <h1 className="flex flex-row justify-center m-5 text-5xl">Collections</h1>
      <div className="flex flex-col sm:flex-row justify-center gap-4 p-4">
        <CollectionView username={username} />
      </div>
    </div>
  );
}
