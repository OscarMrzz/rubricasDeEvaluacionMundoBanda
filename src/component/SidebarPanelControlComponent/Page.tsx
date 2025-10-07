"use client";

import React, { useState } from "react";
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

const SidebarPanelControlComponent = () => {
  const [botonSeleccionado, setBotonSeleccionado] = useState("");

  const links = [
    {
      id: "evaluar",
      label: "Evaluar",
           href: "/PanelControlPage/evaluarHomePage",
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
      label: "Resultados general",
      href: "/PanelControlPage/resultadosGeneralesHomePege",
      Icon: ChartBarSquareIcon,
    },
 
    {
      id: "reporte",
      label: "Reporte por banda",
      href: "/PanelControlPage/reportePorbadaHomePage",
      Icon: DocumentTextIcon,
    },
  ];

  return (
    <div className="bg-gray-700 h-full w-full">
      <section>
        <div className="flex flex-col gap-2 pt-8">
          {links.map(({ id, label, href, Icon }) => (
            <Link key={id} href={href} passHref>
              <button
                onClick={() => setBotonSeleccionado(id)}
                className={`flex items-center w-full text-left px-2 py-2 cursor-pointer hover:bg-[#035a98] ${
                  botonSeleccionado === id
                    ? "border-l-4 border-white bg-blue-400 hover:bg-blue-300"
                    : ""
                }`}
              >
                <Icon className="h-6 w-6 text-white ml-3" />
                <span className="ml-3 font-light">{label}</span>
              </button>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SidebarPanelControlComponent;
