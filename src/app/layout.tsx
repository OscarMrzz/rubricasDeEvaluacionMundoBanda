import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import EncabezadoGeneralCompenet from "@/component/EmcabezadoGeneralComponent/Page";
import NavBard from "@/component/NavBard/Page";
import FooterComponent from "@/component/FooterComponent/Page";

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
        className={`bg-[#1d3557]  text-gray-50 grid grid-rows-[75px_1fr_100px] min-h-screen`}>

         <header className="flex flex-col sticky top-0 z-50">
          <NavBard></NavBard>
         </header>
         
        <main className="flex justify-center w-full max-w-sm mx-auto p-4 sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl overflow-auto">
        {children}
        </main>
        
        <footer>
        <FooterComponent></FooterComponent>
        </footer>
      </body>
    </html>
  );
}
