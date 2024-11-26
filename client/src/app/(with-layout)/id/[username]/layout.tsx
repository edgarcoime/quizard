import UserBreadcrumb from "@/components/partials/UserBreadcrumb";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex justify-center py-4">
        <UserBreadcrumb />
      </div>
      {children}
    </>
  );
}
