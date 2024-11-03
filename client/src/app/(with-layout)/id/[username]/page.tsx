import CollectionView from "./CollectionsView";
import UserCollectionCardSettings from "@/components/partials/UserCollectionCardSettings";

// Get Collection data here on the top level
// SERVER SIDE fetching
export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;
  return (
    <div>
      {/*
        <UserCollectionCardSettings description="User Settings" />
      */}

      <h1 className="flex flex-row justify-center text-5xl">Collections</h1>
      <div className="flex flex-col sm:flex-row justify-center gap-4 p-4">
        <CollectionView username={username} />
      </div>
    </div>
  );
}
