export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <header></header>
      <main>
        <h1>
          <strong>PUBLIC LAYOUT</strong> (Maybe responsible for layout? Header,
          main, and footer?)
        </h1>
        {children}
      </main>
      <footer></footer>
    </div>
  );
}
