import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page({
  params,
}: {
  params: { username: string; collection: string };
}) {
  const { username, collection: collectionId } = params;
  const title = `Collection: ${collectionId}`;
  const sampleCollections = [
    { Name: "Software Engineering", CardsId: 1 },
    { Name: "Calculus", CardsId: 2 },
    { Name: "Operating Systems", CardsId: 3 },
    { Name: "Network security", CardsId: 4 },
  ];

  let list_of_buttons: any = [];
  sampleCollections.map((collection) => {
    let id = collection.CardsId;
    list_of_buttons.push(
      <Link href={`/id/${username}/${collectionId}/${id}`}>
        <Button
          key={collection.CardsId}
          className="m-8 p-8 bg-slate-300"
          variant="outline"
        >
          {collection.Name}
        </Button>
      </Link>,
    );
  });

  return (
    <>
      <h1>Collection page shows all the collections</h1>
      <h1 className="flex flex-row justify-center m-5 text-5xl">{title}</h1>
      <div className="flex flex-row justify-center ">{list_of_buttons}</div>
    </>
  );
}
