import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import EncabezadoGeneralCompenet from "@/component/EmcabezadoGeneralComponent/Page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rubrica de competencia",
  description: "Rubrica de compentencia de bandas de de marcha",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     
      <body
      
        className={`bg-gray-300 grid  min-h-screen   `}>


         <header className=" flex justify-center items-center">
     <EncabezadoGeneralCompenet/>
      </header>
        <main className="flex justify-center  min-h-[80vh] w-full max-w-md mx-auto p-4">


        {children}
        </main>
      </body>
    </html>
  );
}
