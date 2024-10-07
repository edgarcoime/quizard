export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Global layout here add header/nav and footers
  return (
    // Background
    <div className="h-screen w-screen bg-slate-500 flex flex-col">
      {/* Header/Navigation */}
      <header className="bg-gray-200 h-10">
        <div className="bg-gray-500 h-full max-w-screen-xl mx-auto shadow-lg">
          <p>Header</p>
        </div>
      </header>

      {/* max width of content should be xl or 1280px according to tailwind */}
      <main className="bg-gray-100 grow">
        <div className="bg-gray-200 h-full max-w-screen-xl mx-auto">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200">
        <div className="bg-gray-500 h-full max-w-screen-xl mx-auto">
          <p>footer</p>
        </div>
      </footer>
    </div>
  );
}
