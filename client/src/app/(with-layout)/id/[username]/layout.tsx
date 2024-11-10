import UserBreadcrumb from "@/components/partials/UserBreadcrumb";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <UserBreadcrumb />
      {children}
    </>
  );
}
