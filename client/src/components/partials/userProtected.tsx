"use server";

// Should be able to access cookies here
export default async function UserProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Do logic to check for user cookies and permissions
  // Have access to Userconfig from the server
  // TODO: anonymous users neet to be routed out
  return <>{children}</>;
}
