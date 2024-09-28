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
        {children}
      </main>
    </div>
  );
}
