import {
  AdjustmentsHorizontalIcon,
  CalendarDaysIcon,
  ChartBarSquareIcon,
  ClipboardDocumentCheckIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  ListBulletIcon,
  MapPinIcon,
  MusicalNoteIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/16/solid";
import Link from "next/link";
import React from "react";

const PanelControlPage = () => {
  return (
    <div className="h-screen grid grid-cols-3 grid-rows-6 p-2 gap-2 ">
      <Link
        href="/EvaluarPage"
        className="bg-slate-700 col-span-3 flex flex-col justify-center items-center text-2xl font-bold hover:bg-slate-600 cursor-pointer"
      >
        <ClipboardDocumentCheckIcon className="w-12" />
        <h2>Evaluar</h2>
      </Link>

      <Link
        href="/PanelControlPage/regionHomePage"
        className="bg-slate-700 flex flex-col justify-center items-center  font-bold hover:bg-slate-600 cursor-pointer"
      >
        <MapPinIcon className="w-12" />
        <h2>Region</h2>
      </Link>
      <Link
        href="/PanelControlPage/categoriasHomePage"
        className="bg-slate-700 col-span-1  flex flex-col justify-center items-center  font-bold hover:bg-slate-600 cursor-pointer"
      >
        <ListBulletIcon className="w-12" />
        <h2>Categorias</h2>
      </Link>
      <Link
        href="/PanelControlPage/eventosHomePage"
        className="bg-slate-700 col-span-1 flex flex-col justify-center items-center  font-bold hover:bg-slate-600 cursor-pointer"
      >
        <CalendarDaysIcon className="w-12" />
        <h2>Eventos</h2>
      </Link>
      <Link
        href="/PanelControlPage/bandasHomePage"
        className="bg-slate-700 col-span-2 flex flex-col justify-center items-center  font-bold hover:bg-slate-600 cursor-pointer"
      >
        <MusicalNoteIcon className="w-12" />
        <h2>Bandas</h2>
      </Link>
      <Link
        href="/PanelControlPage/rubricaHomePage"
        className="bg-slate-700 col-span-1 row-span-2 flex flex-col justify-center items-center  font-bold hover:bg-slate-600 cursor-pointer"
      >
        <AdjustmentsHorizontalIcon className="w-12" />
        <h2>Rubricas</h2>
      </Link>
      <Link
        href="/ReportesPage"
        className="bg-slate-700 col-span-1 flex flex-col justify-center items-center  font-bold hover:bg-slate-600 cursor-pointer"
      >
        <ChartBarSquareIcon className="w-12" />
        <h2 className="flex justify-center items-center text-center">Resultados Evento</h2>
      </Link>
      <Link
        href="/reportePorBandaPage"
        className="bg-slate-700 col-span-1 flex flex-col justify-center items-center  font-bold hover:bg-slate-600 cursor-pointer p-4"
      >
        <DocumentTextIcon className="w-12" />
        <h2 className="flex justify-center  text-center">Reporte bandas</h2>
      </Link>
      <Link
        href="/PanelControlPage/usuariosHomePage"
        className="bg-slate-700 col-span-2 flex flex-col justify-center items-center  font-bold hover:bg-slate-600 cursor-pointer"
      >
        <UsersIcon className="w-12" />
        <h2>usuarios</h2>
      </Link>
       <Link
        href="/miPerfilPage"
        className="bg-slate-700 col-span-1 flex flex-col justify-center items-center  font-bold hover:bg-slate-600 cursor-pointer"
      >
        <UserIcon className="w-12" />
        <h2>Mi perfil</h2>
      </Link>
      <Link
        href="/PanelControlPage/solicitudesRevicionesPage"
        className="bg-slate-700 col-span-3 flex flex-col justify-center items-center  font-bold hover:bg-slate-600 cursor-pointer"
      >
        <EnvelopeIcon className="w-12" />
        <h2>Solicitud de reviciones</h2>
      </Link>
     
     
    </div>
  );
};

export default PanelControlPage;
