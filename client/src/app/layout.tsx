import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";

const geistSans = localFont({
  // TODO: Find a way to not use relative path for this?
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // set global app wide settings here like font and others
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/**/}

        {children}

        {/**/}
      </body>
    </html>
  );
}

// kkk
// <div>
//   <header></header>
//   <main>
//     <h1>
//       <strong>PUBLIC LAYOUT</strong> (Maybe responsible for layout? Header,
//       main, and footer?)
//     </h1>
//     {children}
//   </main>
//   <footer></footer>
// </div>
