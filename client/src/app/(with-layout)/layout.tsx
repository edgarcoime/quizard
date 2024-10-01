export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Global layout here add header/nav and footers
  return (
    <>
      <header></header>
      <main>{children}</main>
      <footer></footer>
    </>
  );
}
