export default function Page({
  params,
}: {
  params: { username: string; collection: string };
}) {
  const { username, collection } = params;

  return (
    <>
      <h1>
        <strong>CREATE</strong> A page to create a new card in the collection it
        is associated to
      </h1>
      <p>Username: {username}</p>
      <p>Collection: {collection}</p>
    </>
  );
}
