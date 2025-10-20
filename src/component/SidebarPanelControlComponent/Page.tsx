"use client";

import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import {
  ClipboardDocumentListIcon,
  MusicalNoteIcon,
  ClipboardDocumentCheckIcon,
  AdjustmentsHorizontalIcon,
  CalendarDaysIcon,
  UsersIcon,
  ChartBarSquareIcon,
  TrophyIcon,
  DocumentTextIcon,
  UserGroupIcon,
  MapPinIcon,
  PresentationChartBarIcon,
  ListBulletIcon,
} from "@heroicons/react/24/solid";
import { perfilDatosAmpleosInterface } from "@/interfaces/interfaces";
import { UserIcon } from "@heroicons/react/16/solid";

const SidebarPanelControlComponent = () => {
  const [botonSeleccionado, setBotonSeleccionado] = useState("");
   const [perfil, setPerfil] = useState<perfilDatosAmpleosInterface>({} as perfilDatosAmpleosInterface);


   useEffect(() => {
      const perfilBruto = localStorage.getItem("perfilActivo");
      if (perfilBruto) {
        const perfil: perfilDatosAmpleosInterface = JSON.parse(perfilBruto);
        if (perfil) {
          setPerfil(perfil);
   
        }
      }
    }, []);

  const links = [
    {
      id: "evaluar",
      label: "Evaluar",
           href: "/EvaluarPage",
      Icon: ClipboardDocumentCheckIcon,
    },
    {
      id: "federacion",
      label: "Federaciones",
      href: "/PanelControlPage/federacionesHomePage",
      Icon: UserGroupIcon,
    },
    {
      id: "usuarios",
      label: "Usuarios",
      href: "/PanelControlPage/usuariosHomePage",
      Icon: UsersIcon,
    },
    {
      id: "region",
      label: "Región",
      href: "/PanelControlPage/regionHomePage",
      Icon: MapPinIcon,
    },
    {
      id: "categorias",
      label: "Categorías",
      href: "/PanelControlPage/categoriasHomePage",
      Icon: ListBulletIcon,
    },
    {
      id: "bandas",
      label: "Bandas",
      href: "/PanelControlPage/bandasHomePage",
      Icon: MusicalNoteIcon,
    },
    {
      id: "rubricas",
      label: "Rúbrica",
      href: "/PanelControlPage/rubricaHomePage",
      Icon: AdjustmentsHorizontalIcon,
    },
    
    {
      id: "evento",
      label: "Evento",
      href: "/PanelControlPage/eventosHomePage",
      Icon: CalendarDaysIcon,
    },

    {
      id: "resultados",
      label: "Resultados por evento",
      href: "/ReportesPage",
      Icon: ChartBarSquareIcon,
    },
 
    {
      id: "reporte",
      label: "Resultados por banda",
      href: "/reportePorBandaPage",
      Icon: DocumentTextIcon,
    }
    


  ];

  return (
    <div className=" h-full w-full">
      <section>
        <div className="flex flex-col gap-6  text-2xl font-bold">
          {links.map(({ id, label, href, Icon }) => {
            if (id === "federacion") {
              if (perfil.tipoUsuario === "superadmin") {
                return (
              <Link key={id} href={href} passHref>
                <button
                  onClick={() => setBotonSeleccionado(id)}
                  className={`flex items-center text-2xl font-bold w-full text-left  cursor-pointer hover:bg-[#035a98] ${
                    botonSeleccionado === id
                      ? "border-l-4 border-white bg-blue-400 hover:bg-blue-300"
                      : ""
                  }`}
                >
                  <Icon className="h-6 w-6 text-white ml-3" />
                  <span className="ml-3 font-light">{label}</span>
                </button>
              </Link>
            );
              }else{
                return null;
              }
            };
            return (
              <Link key={id} href={href} passHref>
                <button
                  onClick={() => setBotonSeleccionado(id)}
                  className={`flex items-center text-2xl font-bold w-full text-left  cursor-pointer hover:bg-[#035a98] ${
                    botonSeleccionado === id
                      ? "border-l-4 border-white bg-blue-400 hover:bg-blue-300"
                      : ""
                  }`}
                >
                  <Icon className="h-6 w-6 text-white ml-3" />
                  <span className="ml-3 font-light">{label}</span>
                </button>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default SidebarPanelControlComponent;
