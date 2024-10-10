import { Button } from "@/components/ui/button";
import Link from "next/link";
import { collections } from "@/lib/samples/data";

export default function CollectionsView({ username }: { username: string }) {
  return (
    <>
      {collections.map((col, idx) => (
        <Link id={String(idx)} href={`/id/${username}/${col.Name}`}>
          <Button
            key={col.collectionId}
            className="w-full sm:w-auto p-8 bg-slate-300"
            variant="outline"
          >
            {col.Name}
          </Button>
        </Link>
      ))}
    </>
  );
}
