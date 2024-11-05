import CollectionView from "./CollectionsView";
import { getAllByUsername } from "@/lib/api/collection";
import FloatingResourceButtons from "@/components/partials/FloatingResourceButtons";

// TODO: refactor and add fetch logic to ensure this resource is the users
async function validateOwner(): Promise<boolean> {
  return true;
}

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
    <FloatingResourceButtons
      createUrl={createUrl}
      ownerPrivilegeValidator={validateOwner}
    >
      <div className="pt-4">
        <h1 className="flex flex-row justify-center text-5xl">Collections</h1>
        <div className="flex flex-col sm:flex-row justify-center gap-4 p-4">
          <CollectionView username={username} collections={data} />
        </div>
      </div>
    </FloatingResourceButtons>
  );
}
