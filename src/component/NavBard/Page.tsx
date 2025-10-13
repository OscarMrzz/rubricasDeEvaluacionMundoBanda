"use client";

import { perfilDatosAmpleosInterface } from "@/interfaces/interfaces";
import { useBandasStore } from "@/Store/BandasStore/listBandaStore";
import { useCategoriasStore } from "@/Store/CategoriasStore/listCategoriaStore";
import { useEventosStore } from "@/Store/EventosStore/listEventosStore";
import { useRegionesStore } from "@/Store/listRegionesStore";
import { useInicioSesionStore } from "@/Store/PerfilStore/InicioSesionStore";
import { useRubicasStore } from "@/Store/RubricasStore/listRubicasStore";

import Link from "next/link";
import React, { useEffect, useState } from "react";

const NavBard = () => {
  const [haySesionIniciada, setHaySesionIniciada] = useState<boolean>(false);
  const [perfil, setPerfil] = useState<perfilDatosAmpleosInterface>({} as perfilDatosAmpleosInterface);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openMenuHamburguesa, setOpenMenuHamburguesa] = useState(false);

  const { haySesionStore, cerrarSesionStore } = useInicioSesionStore();
  const { recetiarRegionesStore } = useRegionesStore();
  const { recetiarEventosStore } = useEventosStore();
  const { recetiarCategoriasStore } = useCategoriasStore();
  const { recetiarRubicasStore } = useRubicasStore();
  const { recetiarBandasStore } = useBandasStore();

  const abrirMenuUsuario = () => {
    setOpenUserMenu(!openUserMenu);
  };

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
        setHaySesionIniciada(true);
      }
    }
  }, [haySesionStore]);

  const handleLogout = async () => {
    localStorage.removeItem("perfilActivo");

    recetiarRegionesStore();
    recetiarEventosStore();
    recetiarCategoriasStore();
    recetiarRubicasStore();
    recetiarBandasStore();

    setPerfil({} as perfilDatosAmpleosInterface);
    setOpenUserMenu(false);
    setHaySesionIniciada(false);
    cerrarSesionStore();
  };

  return (
    <header className=" bg-grey-500/5 backdrop-blur-md h-full  w-full flex text-white items-center justify-between px-15 sticky  top-0 z-50">
      <div className="flex flex-row  items-center  ">
        <div className="text-3xl font-bold " style={{ letterSpacing: "0.3em" }}>
          <Link href="/">{perfil.federaciones?.nombreFederacion || ""}</Link>
        </div>
      </div>
      <button
        className={`${openMenuHamburguesa ? "hidden" : " flex lg:hidden"} `}
        onClick={() => {
          setOpenMenuHamburguesa(true);
        }}
      >
        Menu
      </button>

      <div
        onClick={() => setOpenMenuHamburguesa(false)}
        className={`
${
  openMenuHamburguesa
    ? "bg-gray-900/50 lg:bg-transparent"
    : "hidden "
      }
      
      w-full
      h-screen
      lg:h-auto
      absolute
      lg:static
      top-0
      left-0

    
      
      lg:flex
      justify-start
    lg:justify-end

    
      items-center
      
          `}
      >
        <div
          className={`
      ${openMenuHamburguesa ? "" : ""}  
     
        bg-gray-900
        lg:bg-transparent

  
        top-0
        left-0
        lg:static

        z-51
        lg:z-50
        
        w-xs
        lg:w-full
        h-screen
        lg:h-full

        flex
        flex-col
        
        lg:flex-row
        lg:justify-end
        px-4
    lg:px-0
       
      
         font-bold text-lg gap-10  `}
        >
          {haySesionIniciada && <Link href="/EvaluarPage">Evaluar</Link>}
          {haySesionIniciada && <Link href="/ReportesPage">Reportes</Link>}
          {haySesionIniciada && <Link href="/PanelControlPage">Admin</Link>}
            <div className=" text-lg font-bold">
          <Link href="/miPerfilPage">Perfil</Link>
        </div>
           <div className="  text-lg font-bold cursor-pointer">
          {
            haySesionIniciada?<button onClick={handleLogout} className="text-lg font-bold  cursor-pointer">
                    Cerrar sesión
                  </button>:  
                  <Link className="text-lg font-bold"  href="/authPage/SignInPage">Iniciar sesión</Link>
          }
      
        </div>

        </div>
          
        </div>
      
           

    </header>
  );
};

export default NavBard;
