import type { Metadata } from "next";
import "@/public/globals.css";
import SideBar from "./components/SideBar";
import Header from "./components/Header";

export const metadata: Metadata = {
  title: "easyManage",
  description: "made for my self-learning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen w-screen bg-gray-200 text-neutral-950">
				<Header />
        <SideBar />
        {children}
      </body>
    </html>
  );
}
