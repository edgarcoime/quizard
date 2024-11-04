"use server";

import DeleteCardButton from "./DeleteCardButton";

export default async function Page({
  params,
}: {
  params: { username: string; collection: string; card: string };
}) {
  const { username, collection, card } = params;

  return (
    <div className="p-5 grid gap-5">
      <h1 className="text-2xl">Card Settings</h1>
      <p className="font-serif text-gray-500">{`Editting Settings for "${collection}/${card}"`}</p>

      <DeleteCardButton />
    </div>
  );
}
