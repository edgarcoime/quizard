import Header from "@/components/partials/Header";
import Footer from "@/components/partials/Footer";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Global layout here add header/nav and footers
  return (
    // Background
    <div className="h-screen bg-slate-500 flex flex-col">
      <Header />

      {/* Main content */}
      {/* max width of content should be xl or 1280px according to tailwind */}
      <main className="bg-gray-100 grow">
        <div className="bg-gray-200 h-full max-w-screen-xl mx-auto">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
