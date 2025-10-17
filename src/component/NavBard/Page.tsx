"use client";

import { perfilDatosAmpleosInterface } from "@/interfaces/interfaces";
import { useBandasStore } from "@/Store/BandasStore/listBandaStore";
import { useCategoriasStore } from "@/Store/CategoriasStore/listCategoriaStore";
import { useEventosStore } from "@/Store/EventosStore/listEventosStore";
import { useRegionesStore } from "@/Store/listRegionesStore";
import { useInicioSesionStore } from "@/Store/PerfilStore/InicioSesionStore";
import { useRubicasStore } from "@/Store/RubricasStore/listRubicasStore";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import SidebarPanelControlComponent from "../SidebarPanelControlComponent/Page";
import { UsersIcon } from "@heroicons/react/16/solid";

const NavBard = () => {
  const [haySesionIniciada, setHaySesionIniciada] = useState<boolean>(false);
  const [perfil, setPerfil] = useState<perfilDatosAmpleosInterface>({} as perfilDatosAmpleosInterface);
  const [direcionHomesegunRol, setDirecionHomesegunRol] = useState<string>("/");
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openMenuHamburguesa, setOpenMenuHamburguesa] = useState(false);

  const { haySesionStore, cerrarSesionStore } = useInicioSesionStore();
  const { recetiarRegionesStore } = useRegionesStore();
  const { recetiarEventosStore } = useEventosStore();
  const { recetiarCategoriasStore } = useCategoriasStore();
  const { recetiarRubicasStore } = useRubicasStore();
  const { recetiarBandasStore } = useBandasStore();

  useEffect(() => {
    if (!openUserMenu) return;
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.getElementById("user-menu");
      const button = document.getElementById("user-menu-button");
      if (menu && !menu.contains(event.target as Node) && button && !button.contains(event.target as Node)) {
        setOpenUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openUserMenu]);

  useEffect(() => {
    const perfilBruto = localStorage.getItem("perfilActivo");
    if (perfilBruto) {
      const perfil: perfilDatosAmpleosInterface = JSON.parse(perfilBruto);
      if (perfil) {
        setPerfil(perfil);

        if (perfil.tipoUsuario === "admin") setDirecionHomesegunRol("/PanelControlPage");
        if (perfil.tipoUsuario === "superadmin") setDirecionHomesegunRol("/PanelControlPage");
        if (perfil.tipoUsuario === "presidenteJurado") setDirecionHomesegunRol("/PanelControlPage");
        if (perfil.tipoUsuario === "jurado") setDirecionHomesegunRol("/EvaluarPage");
        if (perfil.tipoUsuario === "fiscal") setDirecionHomesegunRol("/ReportesPage");
        


        setHaySesionIniciada(true);
      }
    }
  }, [haySesionStore]);

  const handleLogout = async () => {
    localStorage.removeItem("perfilActivo");

document.cookie = 'rolPerfil=; path=/; max-age=0;'
localStorage.removeItem("EventoSelecionado");


    recetiarRegionesStore();
    recetiarEventosStore();
    recetiarCategoriasStore();
    recetiarRubicasStore();
    recetiarBandasStore();

    setPerfil({} as perfilDatosAmpleosInterface);
    setOpenUserMenu(false);
    setHaySesionIniciada(false);
    cerrarSesionStore();
    window.location.href = "/authPage/SignInPage";
  };

  return (
    <header className=" bg-grey-500/5 backdrop-blur-md h-25  w-full flex text-white items-center justify-between px-15 fixed   top-0 z-50">
      <div className="flex flex-row  items-center  ">
        <div className="text-xl lg:text-2xl font-bold " style={{ letterSpacing: "0.3em" }}>
          <Link href={direcionHomesegunRol}>{perfil.federaciones?.nombreFederacion || ""}</Link>
        </div>
      </div>
      <button
        className={`${openMenuHamburguesa ? "hidden" : " flex lg:hidden"} `}
        onClick={() => {
          setOpenMenuHamburguesa(true);
        }}
      >
        <Bars3Icon className="w-12" />
      </button>

      <div
        onClick={() => setOpenMenuHamburguesa(false)}
        className={`
${openMenuHamburguesa ? "bg-gray-900/50 lg:bg-transparent" : "hidden "}
      
      w-full
      h-screen
      lg:h-auto
      absolute
      lg:static
      top-0
      left-0
      max-h-screen
      overflow-hidden

    
      
      lg:flex
      justify-start
    lg:justify-end

    
      items-center
      
          `}
      >
        <div
          style={{
            scrollbarWidth: "none" /* Firefox */,
            msOverflowStyle: "none" /* IE and Edge */,
          }}
          className={`
      ${openMenuHamburguesa ? "" : ""}  
     
        bg-gray-900
        lg:bg-transparent
        
        [&::-webkit-scrollbar]:hidden

  
        top-0
        left-0
        lg:static

        z-51
        lg:z-50
        
        w-xs
        lg:w-full
        h-full
        lg:h-full
        max-h-screen
        overflow-y-auto

        flex
        flex-col
        
        lg:flex-row
        lg:justify-end
        px-4
    lg:px-0

    items-center
      
         font-bold text-lg gap-8 pt-10 pb-10   `}
        >
          {haySesionIniciada && perfil.tipoUsuario === "jurado" ? (
            <div className=" text-2xl font-bold ">
              {" "}
              <Link href="/EvaluarPage">Evaluar</Link>{" "}
            </div>
          ) : null}
          {haySesionIniciada && perfil.tipoUsuario === "fiscal" ? <Link href="/ReportesPage">Reportes</Link> : null}

          {haySesionIniciada &&
          (perfil.tipoUsuario === "admin" ||
            perfil.tipoUsuario === "presidenteJurado" ||
            perfil.tipoUsuario === "superadmin") ? (
            <div className=" border-t-2 border-gray-400  pt-4 lg:pt-0 flex gap-4 flex-col lg:border-none  justify-center items-center lg:flex-row">
              <Link className="text-2xl pl-4 flex justify-center items-center" href="/PanelControlPage">
                Admin
              </Link>
              <div className="lg:hidden">
                <SidebarPanelControlComponent />
              </div>
            </div>
          ) : null}
          <div className="flex gap-6 flex-col border-t-2 lg:border-t-0 pt-4 lg:pt-0 pl-4  lg:flex-row lg:border-none items-center">
            {haySesionIniciada ? (
              <div className=" text-2xl font-bold">
                <Link href="/miPerfilPage">Perfil</Link>
              </div>
            ) : null}

            <div className="  text-2xl font-bold cursor-pointer">
              {haySesionIniciada ? (
                <button onClick={handleLogout} className=" text-2xl font-bold cursor-pointer">
                  Cerrar sesión
                </button>
              ) : (
                <Link className="text-2xl font-bold cursor-pointer" href="/authPage/SignInPage">
                  Iniciar sesión
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBard;
