"use server";

export default async function UserProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Do logic to check for user cookies and permissions
  return (
    <>
      <section>
        <h2>Have access to User config from server</h2>
      </section>
      <h1>USER PROTECTED</h1>
      {children}
    </>
  );
}
