import { getSingle } from "@/lib/api/collection";
import FormSection from "./FormSection";

export default async function Page({
  params,
}: {
  params: { username: string; collection: string };
}) {
  const { username, collection: colSlug } = params;

  const collection = await getSingle(colSlug);

  return (
    <>
      <h1>
        <strong>CREATE</strong> a card that contains the information you want to
        remember
      </h1>

      <FormSection collectionId={collection.id} />
    </>
  );
}
