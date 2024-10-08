import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page({ params }: { params: { username: string } }) {
  const { username } = params;

  const sampleCollections = [
    { Name: "Software Engineering", collectionId: 1 },
    { Name: "Calculus", collectionId: 2 },
    { Name: "Operating Systems", collectionId: 3 },
    { Name: "Network security", collectionId: 4 },
  ];

  let list_of_buttons: any = [];
  sampleCollections.map((collection) => {
    let id = collection.Name;
    list_of_buttons.push(
      <Link href={`/id/${username}/${id}`}>
        <Button
          key={collection.collectionId}
          className="w-full sm:w-auto p-8 bg-slate-300"
          variant="outline"
        >
          {collection.Name}
        </Button>
      </Link>,
    );
  });

  return (
    <>
      <h1>User: ({username}) public page (Shows all your collections)</h1>
      <h1 className="flex flex-row justify-center m-5 text-5xl">Collections</h1>
      <div className="flex flex-col sm:flex-row justify-center gap-4 p-4">{list_of_buttons}</div>
    </>
  );
}
