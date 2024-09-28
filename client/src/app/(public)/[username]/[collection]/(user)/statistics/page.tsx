export default function Page({
  params,
}: {
  params: { username: string; collection: string };
}) {
  const { username, collection } = params;

  return (
    <>
      <h1>
        Collection <strong>STATISTICS</strong> page
      </h1>
      <p>
        Show overall statistics of the collection how well its covered etc...
      </p>
      <p>Username: {username}</p>
      <p>Collection: {collection}</p>
    </>
  );
}
