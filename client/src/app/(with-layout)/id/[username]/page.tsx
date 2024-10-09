import { Button } from "@/components/ui/button";
import SettingsButton from "@/components/ui/settingsButton";
import Link from "next/link";
import { headers } from 'next/headers'

// example of server side fetching
// - since this fetch happens on the nextjs server, header needs to be transported(this will include cookie)
// - since this request is not on browser, we need to specify the full path of api endpoint. We should create frontend .env with BACKEND_URL
// - consider spliting this fetching logic into generalized helper function
async function getData () {
    // since this fetch happens on the nextjs server, header needs to be transported(this will include cookie)
    const res = await fetch('http://localhost:3000/api/py/user/me', {credentials: "include", headers: headers()})
    const data = await res.json()
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
        {data['username']}
        <SettingsButton desc="User Settings" routeRedirect={settingsRoute} />
      </div>
      <h1 className="flex flex-row justify-center m-5 text-5xl">Collections</h1>
      <div className="flex flex-col sm:flex-row justify-center gap-4 p-4">
        {list_of_buttons}
      </div>
    </div>
  );
}
