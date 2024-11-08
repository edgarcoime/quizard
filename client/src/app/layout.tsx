import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ReactQueryProvider from "@/lib/providers/ReactQueryProvider";

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
  title: "Quizard",
  description: "A wizard of a quiz app",
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
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={`antialiased`}
      >
        {/* Provider for React Query */}
        <ReactQueryProvider>{children}</ReactQueryProvider>
        {/* Speed insights for contentful paint */}
        <SpeedInsights />
      </body>
    </html>
  );
}
