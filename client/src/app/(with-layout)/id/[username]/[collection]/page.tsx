import CardsView from "./CardsView";
import { IoPlayCircleOutline } from "react-icons/io5";
import Link from "next/link";
import { getAllByCollection } from "@/lib/api/card";
import { getSingle } from "@/lib/api/collection";
import FloatingResourceButtons from "@/components/partials/FloatingResourceButtons";
import { getCookieSession } from "@/lib/functions/getCookieSession";
import { Cog, Plus } from "lucide-react";

// TODO: refactor and add fetch logic to ensure this resource is the users
async function validateOwner(): Promise<boolean> {
  return true;
}

export default async function Page({
  params,
}: {
  params: { username: string; collection: string };
}) {
  const { username, collection: collectionSlug } = params;
  // const decodedCollectionId = decodeURIComponent(collectionId);

  const session = getCookieSession();

  const playRoute = `/id/${username}/${collectionSlug}/play`;
  const createUrl = `/id/${username}/${collectionSlug}/new`;
  const settingsUrl = `/id/${username}/${collectionSlug}/settings`;

  const cards = await getAllByCollection(collectionSlug, { cache: "no-cache" });
  const collection = await getSingle(collectionSlug, { cache: "no-cache" });

  const title = `Collection: ${collection.title}`;

  const buttons = [
    {
      href: settingsUrl,
      symbol: <Cog className="h-8 w-8" />,
    },
    {
      href: createUrl,
      symbol: <Plus className="h-8 w-8" />,
    },
  ];

  return (
    <FloatingResourceButtons
      ownerPrivilegeValidator={validateOwner}
      buttons={buttons}
    >
      <h1 className="flex flex-row justify-center m-5 text-5xl">{title}</h1>

      <div className="flex justify-center">
        {!!session && (
          <Link href={playRoute}>
            <IoPlayCircleOutline className="text-5xl"></IoPlayCircleOutline>
          </Link>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 p-4">
        <CardsView
          username={username}
          collectionSlug={collectionSlug}
          cards={cards}
        />
      </div>
    </FloatingResourceButtons>
  );
}
