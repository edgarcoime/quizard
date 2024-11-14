import FormSection from "./FormSection";

export default function Page({
  params,
}: {
  params: { username: string; collection: string };
}) {
  const { username } = params;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          <strong >Create</strong> a Collection
        </h1>
        <p className="mt-2 text-gray-600">
          Organize and store all your cards in one place.
        </p>
      </div>

      {/* Username Display */}
      <div className="text-center">
        <p className="text-gray-700 font-medium">
          <span className="text-gray-500">Username:</span> {username}
        </p>
      </div>

      {/* Form Section */}
      <div className="mt-6">
        <FormSection />
      </div>
    </div>
  );
}
