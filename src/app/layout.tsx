"use client";

import "./globals.css";

import NavBard from "@/component/NavBard/Page";

import { Provider } from "react-redux";
import store from "@/app/store"; // 👈 ajusta la ruta según tu proyecto

import { Poppins } from "next/font/google";
import { useEffect, useRef } from "react";
import RegionService from "@/lib/services/regionesServices";
import { useRegionesStore } from "@/Store/listRegionesStore";
import RegistroEventossServices from "@/lib/services/registroEventosServices";
import { useEventosStore } from "@/Store/EventosStore/listEventosStore";
import CategoriasServices from "@/lib/services/categoriaServices";
import RubricasServices from "@/lib/services/rubricasServices";
import BandasServices from "@/lib/services/bandasServices";
import { useCategoriasStore } from "@/Store/CategoriasStore/listCategoriaStore";
import { useRubicasStore } from "@/Store/RubricasStore/listRubicasStore";
import { useBandasStore } from "@/Store/BandasStore/listBandaStore";
import { useInicioSesionStore } from "@/Store/PerfilStore/InicioSesionStore";
import RegistroEquipoEvaluadorServices from "@/lib/services/registroEquipoEvaluadorServices";
import { perfilInterface, registroEquipoEvaluadorInterface } from "@/interfaces/interfaces";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setRegionesStore } = useRegionesStore();
  const { setEventosStore } = useEventosStore();
  const { setCategoriasStore } = useCategoriasStore();
  const { setRubicasStore } = useRubicasStore();
  const { setBandasStore } = useBandasStore();

  const regionesServices = useRef(new RegionService());
  const eventosServices = useRef(new RegistroEventossServices());
  const categoriasServices = useRef(new CategoriasServices());
  const rubicasServices = useRef(new RubricasServices());
  const bandasServices = useRef(new BandasServices());
  const equipoEvaluadorServices = useRef(new RegistroEquipoEvaluadorServices());

  const { haySesionStore } = useInicioSesionStore();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const initializeServices = async () => {
      try {
        const perfiBruto = localStorage.getItem("perfilActivo");
        if (!perfiBruto) {
          if (window.location.pathname !== "/authPage/SignInPage") {
            window.location.href = "/authPage/SignInPage";
          }
          return;
        }
        const perfil: perfilInterface = JSON.parse(perfiBruto);

        // Initialize all services with profile data first
        await Promise.all([
          regionesServices.current.initPerfil(),
          categoriasServices.current.initPerfil(),
          rubicasServices.current.initPerfil(),
          bandasServices.current.initPerfil(),
          equipoEvaluadorServices.current.initPerfil(),
          eventosServices.current.initPerfil(),
        ]);

        // Now load data from services that don't require specific federation
        regionesServices.current.get().then((datosRegiones) => {
          setRegionesStore(datosRegiones);
        });

        categoriasServices.current.get().then((data) => {
          setCategoriasStore(data);
        });

        rubicasServices.current.get().then((data) => {
          setRubicasStore(data);
        });

        // Load events and filter them based on profile
        equipoEvaluadorServices.current
          .getporPerfil(perfil.idPerfil)
          .then((EventosParaElPerfil: registroEquipoEvaluadorInterface[]) => {
            eventosServices.current.get().then((data) => {
              const eventosFiltrados = data.filter((evento) =>
                EventosParaElPerfil.some(
                  (equipo) =>
                    equipo.idForaneaEvento === evento.idEvento && equipo.rolMiembro.toUpperCase() !== "SINPERMISOS"
                )
              );
              setEventosStore(eventosFiltrados);
            });
          });

        // Load bands data (requires federation in profile)
        bandasServices.current
          .get()
          .then((data) => {
            setBandasStore(data);
          })
          .catch((error) => {
            console.warn("⚠️ No se pudieron cargar las bandas:", error.message);
            setBandasStore([]); // Set empty array if federation is missing
          });
      } catch (error) {
        console.error("❌ Error al obtener los datos:", error);
      }
    };

    initializeServices();
  }, [haySesionStore, setBandasStore, setCategoriasStore, setEventosStore, setRegionesStore, setRubicasStore]);

  return (
    <html lang="en">
      <body className={`bg-gray-800  lg:pt-0 w-full text-gray-50 flex min-h-screen font-poppins ${poppins.className} `}>
        <Provider store={store}>
          <NavBard />

          <main className="w-full   ">{children}</main>
        </Provider>
      </body>
    </html>
  );
}
