import { Button } from "@/components/ui/button";
import SettingsButton from "@/components/ui/settingsButton";
import Link from "next/link";
import { headers } from 'next/headers'
import {cookies} from 'next/headers'

// example of server side fetching
// - Since this fetch originate from the nextjs server, header needs to be transported so backend can identify the user
async function getData () {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/py/user/me`, {credentials: "include", headers: headers()})
    const data = await res.text()
    return data
}

export default async function Page({ params }: { params: { username: string } }) {
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

  const settingsRoute = `/id/${username}/settings`;

  const data = await getData()

  return (
    <div>
      <div className="flex justify-end p-4">
        {data}
        <SettingsButton desc="User Settings" routeRedirect={settingsRoute} />
      </div>
      <h1 className="flex flex-row justify-center m-5 text-5xl">Collections</h1>
      <div className="flex flex-col sm:flex-row justify-center gap-4 p-4">
        {list_of_buttons}
      </div>
    </div>
  );
}
