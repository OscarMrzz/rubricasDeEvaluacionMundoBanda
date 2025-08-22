"use client";

import { perfilDatosAmpleosInterface } from "@/interfaces/interfaces";
import PerfilesServices from "@/lib/services/perfilesServices";
import { createBrowserClient } from "@supabase/ssr";
import { Session } from "@supabase/supabase-js";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const NavBard = () => {
  const [sesion, setSesion] = useState<Session | null>(null);
  const [perfil, setPerfil] = useState<perfilDatosAmpleosInterface>(
    {} as perfilDatosAmpleosInterface
  );
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const abrirMenuUsuario = () => {
    setOpenUserMenu(!openUserMenu);
  };

  // Cerrar el menú al hacer clic fuera
  useEffect(() => {
    if (!openUserMenu) return;
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.getElementById("user-menu");
      const button = document.getElementById("user-menu-button");
      if (
        menu &&
        !menu.contains(event.target as Node) &&
        button &&
        !button.contains(event.target as Node)
      ) {
        setOpenUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openUserMenu]);

  // Recargar perfil cuando la sesión cambie y sea válida
  useEffect(() => {
    if (!sesion) {
      setPerfil({} as perfilDatosAmpleosInterface);
      return;
    }
    const perfilesServices = new PerfilesServices();
    perfilesServices
      .getUsuarioLogiado()
      .then((perfil) => {
        if (perfil) {
          setPerfil(perfil);
        }
      })
      .catch((error) => {
        console.error("Error obteniendo usuario logueado:", error);
      });
  }, [sesion]);

  // Actualizar la sesión al iniciar sesión o cerrar sesión

  useEffect(() => {
    // Obtener la sesión actual al montar
    supabase.auth.getSession().then(({ data }) => {
      setSesion(data.session);
    });
    // Suscribirse a cambios de sesión
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSesion(session);
      }
    );
    // Limpiar el listener al desmontar
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSesion(null);
    setPerfil({} as perfilDatosAmpleosInterface);
    setOpenUserMenu(false);
  };

  return (
    <div className="bg-grey-500/5 backdrop-blur-md h-full w-full flex text-white items-center justify-between px-15">
      <div className="flex gap-20">
        <div className="text-3xl font-bold " style={{ letterSpacing: "0.3em" }}>
          <Link href="/">
          
          {perfil.federaciones?.nombreFederacion || ""}
          </Link>
        </div>
      </div>
      <div className="flex font-bold text-lg gap-10">
        {sesion && <Link href="/PanelControlPage">Panel de control</Link>}
        {sesion ? (
          <div style={{ position: "relative" }}>
            <span
              id="user-menu-button"
              onClick={abrirMenuUsuario}
              className="bg-[#f42f0c] px-3 py-1 rounded hover:bg-wh cursor-pointer"
            >
              {perfil.nombre}
            </span>
            {openUserMenu ? (
              <ul
                id="user-menu"
                className="absolute bg-[#e65e23] text-gray-200  shadow-lg mt-2 p-2"
                style={{ zIndex: 100 }}
              >
                <li className="hover:bg-[#fb763e] font-medium cursor-pointer">
                  <Link href="/">Perfil</Link>
                </li>
                <li
                  onClick={handleLogout}
                  className="hover:bg-[#fb763e] font-medium cursor-pointer"
                >
                  Cerrar sesión
                </li>
              </ul>
            ) : null}
          </div>
        ) : (
          <Link href="/authPage/SignInPage">Iniciar sesión</Link>
        )}
      </div>
    </div>
  );
};

export default NavBard;
