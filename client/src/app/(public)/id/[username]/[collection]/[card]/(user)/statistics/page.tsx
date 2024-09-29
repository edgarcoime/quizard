export default function Page({
  params,
}: {
  params: { username: string; collection: string; card: string };
}) {
  const { username, collection, card } = params;

  return (
    <>
      <h1>
        Displays the <strong>STATISTICS</strong> page of the card
      </h1>
      <p>
        displays the histogram of the cards meaningful coverage data and how
        well the users comprehension is
      </p>
      <p>Username: {username}</p>
      <p>Collection: {collection}</p>
      <p>Card: {card}</p>
    </>
  );
}
