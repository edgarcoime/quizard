import FormSection from "./FormSection";

export default function Page({
  params,
}: {
  params: { username: string; collection: string };
}) {
  const { username } = params;

  return (
    <>
      <h1>
        <strong>CREATE</strong> a collection that stores all the cards
      </h1>
      <p>Username: {username}</p>
      <FormSection />
    </>
  );
}
