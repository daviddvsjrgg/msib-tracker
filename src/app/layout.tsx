import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MSIB Tracker | Tracker MSIB Terbaik di Indonesia",
  description: "Lacak kemajuan MSIB Anda dengan mudah menggunakan tracker kami yang ramah pengguna.",
  keywords: "MSIB, tracker, msib tracker, kemajuan MSIB, update MSIB, pendidikan Indonesia",
  authors: [{ name: "David Dwiyanto" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "MSIB Tracker | Tracker MSIB Terbaik di Indonesia",
    description: "Lacak kemajuan MSIB Anda dengan mudah.",
    url: "https://msib8-tracker.firebaseapp.com",
    siteName: "MSIB Tracker",
    images: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/msib8-tracker.appspot.com/o/msib8-tracker-logo.png?alt=media&token=4317e835-2a7e-40c3-ac73-0f78096d3f61",
        width: 800,
        height: 600,
        alt: "MSIB Tracker",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
