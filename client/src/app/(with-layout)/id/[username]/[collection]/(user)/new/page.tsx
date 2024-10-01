export default function Page({
  params,
}: {
  params: { username: string; collection: string };
}) {
  const { username, collection } = params;

  return (
    <>
      <h1>
        <strong>CREATE</strong> a card that contains the information you want to
        remember
      </h1>
      <p>Username: {username}</p>
      <p>Collection: {collection}</p>
    </>
  );
}
