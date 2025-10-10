"use client";

import type { Metadata } from "next";
import "./globals.css";

import NavBard from "@/component/NavBard/Page";


import { Provider } from "react-redux";
import store from "@/app/store"; // 👈 ajusta la ruta según tu proyecto

import { Poppins } from "next/font/google";
import { use, useEffect, useRef } from "react";
import RegionService from "@/lib/services/regionesServices";
import { useRegionesStore } from "@/Store/regionesStore";
import RegistroEventossServices from "@/lib/services/registroEventosServices";
import { useEventosStore } from "@/Store/EventosStore/listEventosStore";
import CategoriasServices from "@/lib/services/categoriaServices";
import RubricasServices from "@/lib/services/rubricasServices";
import BandasServices from "@/lib/services/bandasServices";
import { useCategoriasStore } from "@/Store/CategoriasStore/listCategoriaStore";
import { useRubicasStore } from "@/Store/RubricasStore/listRubicasStore";
import { useBandasStore } from "@/Store/BandasStore/listBandaStore";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const { listRegionesStore, setRegionesStore, recetiarRegionesStore } = useRegionesStore();
    const {listEventosStore, setEventosStore, recetiarEventosStore}= useEventosStore()
       const {listCategoriasStore, setCategoriasStore, recetiarCategoriasStore}= useCategoriasStore()
       const {listRubicasStore, setRubicasStore, recetiarRubicasStore}= useRubicasStore()
       const {listBandasStore, setBandasStore, recetiarBandasStore}= useBandasStore()

  const regionesServices =useRef(new RegionService())
  const eventosServices =useRef(new RegistroEventossServices())
  const categoriasServices =useRef(new CategoriasServices())
  const rubicasServices =useRef(new RubricasServices())
  const bandasServices =useRef(new BandasServices())

  useEffect(()=>{
   
      regionesServices.current.get().then((datosRegiones)=>{setRegionesStore(datosRegiones)})
      eventosServices.current.get().then((data)=>{setEventosStore(data)})
      categoriasServices.current.get().then((data)=>{setCategoriasStore(data)})
      rubicasServices.current.get().then((data)=>{setRubicasStore(data)})
      bandasServices.current.get().then((data)=>{setBandasStore(data)})
    
  


  },[])
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
