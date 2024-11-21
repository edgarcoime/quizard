"use server";

import { getSingle } from "@/lib/api/collection";
import DeleteCollectionButton from "./DeleteCollectionButton";
import CollectionFormSection from "@/components/forms/collection/CollectionFormSection";

export default async function Page({
  params,
}: {
  params: { username: string; collection: string };
}) {
  const { username, collection: collectionSlug } = params;
  const collection = await getSingle(collectionSlug, username, {
    cache: "no-cache",
  });

  return (
    <div className="p-5 grid gap-5">
      <h1 className="text-2xl">Collection Settings</h1>
      <p className="font-serif text-gray-500">{`Editting Settings for "${collection.title}"`}</p>
      <CollectionFormSection type="update" defaultState={collection} />

      <DeleteCollectionButton />
    </div>
  );
}
