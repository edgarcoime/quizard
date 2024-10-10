import { Button } from "@/components/ui/button";
import SettingsButton from "@/components/ui/settingsButton";
import { headers } from "next/headers";
import CollectionView from "./CollectionView";
import UserCollectionCardSettings from "@/components/partials/UserCollectionCardSettings";

// example of server side fetching
// - Since this fetch originate from the nextjs server, header needs to be transported so backend can identify the user
async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/py/user/me`, {
    credentials: "include",
    headers: headers(),
  });
  const data = await res.text();
  return data;
}

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;

  const settingsRoute = `/id/${username}/settings`;

  const data = await getData();

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
