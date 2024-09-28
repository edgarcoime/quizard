export default function Page({
  params,
}: {
  params: { username: string; collection: string };
}) {
  const { username, collection } = params;

  return (
    <>
      <h1>
        <strong>CREATE</strong> new card for the following information
      </h1>
      <p>Username: {username}</p>
      <p>Collection: {collection}</p>
    </>
  );
}
