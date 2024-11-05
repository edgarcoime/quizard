import { fetchUserCollection } from "@/lib/api/userCollections";
import CollectionView from "./CollectionsView";
import CreateResourceButton from "@/components/ui/createResourceButton";
import { getAllByUsername } from "@/lib/api/collection";

// Get Collection data here on the top level
// SERVER SIDE fetching
export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;
  const data = await getAllByUsername(username);
  const createUrl = `/id/${username}/new`;

  return (
    <div className="h-full static flex flex-col">
      <div className="flex-grow">
        <div className="pt-4">
          <h1 className="flex flex-row justify-center text-5xl">Collections</h1>
          <div className="flex flex-col sm:flex-row justify-center gap-4 p-4">
            <CollectionView username={username} collections={data} />
          </div>
        </div>
      </div>

      <div className="sticky bottom-6 flex justify-end px-4">
        <CreateResourceButton href={createUrl} />
      </div>
    </div>
  );
}
