export default function Page({
  params,
}: {
  params: { username: string; collection: string; card: string };
}) {
  const { username, collection, card } = params;

  return (
    <>
      <h1>
        Displays the <strong>SETTINGS</strong> page for the card
      </h1>
      <p>
        Settings customize the card answer and prompt but also can allow the
        user to reset the data on the card
      </p>
      <p>Username: {username}</p>
      <p>Collection: {collection}</p>
      <p>Card: {card}</p>
    </>
  );
}
