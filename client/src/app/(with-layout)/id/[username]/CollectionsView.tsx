
import { Button } from "@/components/ui/button";
import { fetchUserCollection } from "@/lib/api/userCollections";

import Link from "next/link";


export default async function CollectionsView({ username, collections }: { username: string, collections: any }) {


  
  // const data = await fetchUserCollection();
  
  // console.log(data)
  // let collections: any = data
  // console.log("collections")

  // console.log(collections)


  return (
    <>
      { collections && collections.map((col: any, idx: number) => (
        <Link id={String(idx)} href={`/id/${username}/${col.slug}`}>
          <Button
            key={idx}
            className="w-full sm:w-auto p-8 bg-slate-300"
            variant="outline"
          >
            {col.title}
          </Button>
        </Link>
      ))}
    </>
  );
}

