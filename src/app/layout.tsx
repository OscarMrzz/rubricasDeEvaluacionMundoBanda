"use client";

import type { Metadata } from "next";
import "./globals.css";

import NavBard from "@/component/NavBard/Page";


import { Provider } from "react-redux";
import store from "@/app/store"; // 👈 ajusta la ruta según tu proyecto

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-gray-800 w-screen text-gray-50 grid grid-rows-[75px_1fr] min-h-screen font-poppins ${poppins.className} `}
      >
        <Provider store={store}>
          <header className="flex flex-col sticky  top-0 z-50">
            <NavBard />
          </header>

          <main className="w-full  overflow-y-auto-auto ">{children}</main>

        </Provider>
      </body>
    </html>
  );
}
