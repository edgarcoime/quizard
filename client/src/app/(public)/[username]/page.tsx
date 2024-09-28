export default function Page({ params }: { params: { username: string } }) {
  const { username } = params;

  return (
    <>
      <h1>User: ({username}) public page (Shows all your collections)</h1>
    </>
  );
}
