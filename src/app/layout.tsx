import Background from "@/components/background";
import "@/styles/globals.css";
import { type Metadata } from "next";
import { Inter } from "next/font/google";
import { type ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

interface Props {
  children: ReactNode;
}

export default async function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-gray-800`}>
        {children}
        <Background />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Simple Trello",
  description: "A simple Trello clone, made with Next.js",
};
