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
    <header className="bg-grey-500/5 backdrop-blur-md w-full flex items-center justify-between px-4 sticky top-0 z-50 text-white">
      <div className="flex items-center">
        <div className="text-3xl font-bold" style={{ letterSpacing: "0.3em" }}>
          <Link href="/">{perfil.federaciones?.nombreFederacion || ""}</Link>
        </div>
      </div>
      {/* Botón hamburguesa solo en móvil */}
      <button className={`lg:hidden flex`} onClick={() => setOpenMenuHamburguesa(true)}>
        Menu
      </button>
      {/* Menú hamburguesa en móvil */}
      <div
        onClick={() => setOpenMenuHamburguesa(false)}
        className={`fixed inset-0 bg-gray-900/50 z-50 ${openMenuHamburguesa ? "block" : "hidden"} lg:hidden h-screen w-full`}
      >
        <div className="bg-gray-900 p-4  h-full w-xs">
          <nav className="flex flex-col gap-6 font-bold text-lg">
            {haySesionIniciada && <Link href="/EvaluarPage">Evaluar</Link>}
            {haySesionIniciada && <Link href="/Reportes">Reportes</Link>}
            {haySesionIniciada && <Link href="/PanelControlPage">Admin</Link>}
            {haySesionIniciada ? (
              <div className="relative">
                <span
                  id="user-menu-button"
                  onClick={abrirMenuUsuario}
                  className="bg-[#f42f0c] px-3 py-1 rounded hover:bg-wh cursor-pointer flex whitespace-nowrap"
                >
                  {perfil.nombre}
                </span>
                {openUserMenu && (
                  <ul
                    id="user-menu"
                    className="absolute bg-[#d45907] text-gray-200 shadow-lg mt-2 p-2"
                    style={{ zIndex: 100 }}
                  >
                    <li className="hover:bg-[#fb763e] font-medium cursor-pointer">
                      <Link href="/miPerfilPage">Perfil</Link>
                    </li>
                    <li onClick={handleLogout} className="hover:bg-[#ff7300] font-medium cursor-pointer">
                      Cerrar sesión
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <Link href="/authPage/SignInPage">Iniciar sesión</Link>
            )}
          </nav>
        </div>
      </div>
      {/* Menú principal en escritorio */}
      <nav className="hidden lg:flex gap-10 font-bold text-lg items-center">
        {haySesionIniciada && <Link href="/EvaluarPage">Evaluar</Link>}
        {haySesionIniciada && <Link href="/Reportes">Reportes</Link>}
        {haySesionIniciada && <Link href="/PanelControlPage">Admin</Link>}
        {haySesionIniciada ? (
          <div className="relative">
            <span
              id="user-menu-button"
              onClick={abrirMenuUsuario}
              className="bg-[#f42f0c] px-3 py-1 rounded hover:bg-wh cursor-pointer flex whitespace-nowrap"
            >
              {perfil.nombre}
            </span>
            {openUserMenu && (
              <ul
                id="user-menu"
                className="absolute bg-[#d45907] text-gray-200 shadow-lg mt-2 p-2"
                style={{ zIndex: 100 }}
              >
                <li className="hover:bg-[#fb763e] font-medium cursor-pointer">
                  <Link href="/miPerfilPage">Perfil</Link>
                </li>
                <li onClick={handleLogout} className="hover:bg-[#ff7300] font-medium cursor-pointer">
                  Cerrar sesión
                </li>
              </ul>
            )}
          </div>
        ) : (
          <Link href="/authPage/SignInPage">Iniciar sesión</Link>
        )}
      </nav>
    </header>
  );
};

export default NavBard;
