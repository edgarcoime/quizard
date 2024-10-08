import { Button } from "@/components/ui/button";

export default function Page({
  params,
}: {
  params: { username: string; collection: string; card: string };
}) {
  const { username, collection, card } = params;

  return (
    <div className="p-5 grid gap-5">
      <h1 className="text-2xl">Card Settings</h1>
      <p className="font-serif text-gray-500">{`Editting Settings for "${collection}/${card}"`}</p>
      <GeneralSection collectionName={collection} />
      <StatisticsSection />
    </div>
  );
}

function GeneralSection({}: { collectionName: string }) {
  "use client";

  return (
    <section>
      <h2 className="text-lg">General</h2>
      {/* Rename Collection */}
      <div>
        <form action="">
          <input type="text" placeholder="Collection Name" />
          <Button type="submit">Rename</Button>
        </form>
      </div>

      {/* Delete Collection */}
      <div>
        <form action="">
          <Button type="submit" variant="destructive">
            Delete Collection
          </Button>
        </form>
      </div>
    </section>
  );
}

function StatisticsSection() {
  "use client";

  return (
    <section>
      <h2 className="text-lg">Statistics</h2>

      {/* Wipe Collection Statistics */}
      <div>
        <form action="">
          <Button type="submit" variant="secondary">
            Wipe Collection Statistics
          </Button>
        </form>
      </div>
    </section>
  );
}
