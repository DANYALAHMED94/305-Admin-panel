import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/providers/QueryProvider";
import { ThemeStoreProvider } from "@/components/providers/ThemeStoreProvider";
import { AuthStoreProvider } from "@/components/providers/AuthStoreProvider";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "305 Admin Panel",
  description: "305 Network Admin Panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <AuthStoreProvider>
            <ThemeStoreProvider>{children}</ThemeStoreProvider>
          </AuthStoreProvider>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
