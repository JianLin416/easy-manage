import type { Metadata } from "next";
import "@/public/globals.css";
import Header from "./components/Header";
import React from "react";
import Home from "./components/Home";

export const metadata: Metadata = {
  title: "easyManage",
  description: "created for self-learning",
  icons: { icon: './favicon.ico' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-200 text-neutral-950 font-semibold">
        <Header />
        <div className="w-10/12 mx-auto flex p-5">
          <Home children={children} />
        </div>
      </body>
    </html>
  );
}
