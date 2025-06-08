
import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/context/QueryProvider";
import { GlobalProvider } from "@/context/GlobalContext";
import { AuthProvider } from "@/context/AuthContext";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Anki bro",
  description: "Anki bro with using next.js and express",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="min-h-max ">
      {/* <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body> */}
      <body >
        {/* <BackButton/> */}
        <QueryProvider>
          <AuthProvider>
            <GlobalProvider>
              {children}
            </GlobalProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
