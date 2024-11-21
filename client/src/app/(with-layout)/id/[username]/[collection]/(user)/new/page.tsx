import { getSingle } from "@/lib/api/collection";
import FormSection from "./FormSection";

export default async function Page({
  params,
}: {
  params: { username: string; collection: string };
}) {
  const { username, collection: colSlug } = params;

  const collection = await getSingle(colSlug, username);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          <strong>Create</strong> a Card
        </h1>
        <p className="mt-2 text-gray-600">
          Add cards to your collection to store important information.
        </p>
      </div>

      {/* Form Section */}
      <div className="mt-6">
        <FormSection collectionId={collection.id} />
      </div>
    </div>
  );
}
