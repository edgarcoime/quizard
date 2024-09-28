export default function Page({
  params,
}: {
  params: { username: string; collection: string; card: string };
}) {
  const { username, collection, card } = params;

  return (
    <>
      <h1>Displays page for specific card and perhaps shows statistics</h1>
      <p>Username: {username}</p>
      <p>Collection: {collection}</p>
      <p>Card: {card}</p>
    </>
  );
}
