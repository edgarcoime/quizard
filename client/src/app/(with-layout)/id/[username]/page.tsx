import CollectionView from "./CollectionView";
import UserCollectionCardSettings, {
  Fallback,
} from "@/components/partials/UserCollectionCardSettings";
import { Suspense } from "react";

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
      <UserCollectionCardSettings />

      <h1 className="flex flex-row justify-center m-5 text-5xl">Collections</h1>
      <div className="flex flex-col sm:flex-row justify-center gap-4 p-4">
        <CollectionView username={username} />
      </div>
    </div>
  );
}
