export default function UserProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <main>
        <h1>
          <strong>PRIVATE LAYOUT</strong>
        </h1>
        <div>
          <h2>
            Will have access to the user here because it is validated by the
            user layout
          </h2>
        </div>

        {children}
      </main>
    </div>
  );
}
