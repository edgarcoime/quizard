import Header from "@/components/partials/Header";
import Footer from "@/components/partials/Footer";
import { headers } from "next/headers";
import { fetchUserData } from "@/lib/api/userData";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = headers().get('cookie')
  const data = await fetchUserData(cookie ? {
    credentials: "include",
    headers: {
      Cookie: cookie
    },
  } : {});
  const user_name = data?.username
  const isLoggedIn = !!data
  // Global layout here add header/nav and footers
  return (
    // Background
    <div className="max-w-screen-xl mx-auto w-full bg-gray-100 min-h-screen flex flex-col">
      <Header />

      {/* Main content */}
      {/* max width of content should be xl or 1280px according to tailwind */}
      <main className="bg-gray-100 grow">
        <div className="bg-gray-200 min-h-screen max-w-screen-xl mx-auto">
          {children}
        </div>
      </main>
      {isLoggedIn && <Footer userName={user_name} />}
    </div>
  );
}
