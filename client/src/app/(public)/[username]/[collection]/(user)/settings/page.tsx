export default function Page({
  params,
}: {
  params: { username: string; collection: string };
}) {
  const { username, collection } = params;

  return (
    <>
      <h1>
        Collection <strong>SETTINGS</strong> PAGE
      </h1>
      <p>
        Can modify collection visibility and edit name or cards inside quickly
      </p>
      <p>Username: {username}</p>
      <p>Collection: {collection}</p>
    </>
  );
}
