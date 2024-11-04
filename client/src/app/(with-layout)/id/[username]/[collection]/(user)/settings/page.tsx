"use server";

import DeleteCollectionButton from "./DeleteCollectionButton";

export default async function Page({
  params,
}: {
  params: { username: string; collection: string };
}) {
  const { username, collection } = params;

  return (
    <div className="p-5 grid gap-5">
      <h1 className="text-2xl">Collection Settings</h1>
      <p className="font-serif text-gray-500">{`Editting Settings for "${collection}"`}</p>

      <DeleteCollectionButton />
    </div>
  );
}
