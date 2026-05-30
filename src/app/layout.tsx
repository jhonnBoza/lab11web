import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LabStoreProvider } from "@/lib/lab-store";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GLAB S11 — Lab",
  description: "Laboratorio 11: Ejercicios de componentes y dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <LabStoreProvider>{children}</LabStoreProvider>
      </body>
    </html>
  );
}
