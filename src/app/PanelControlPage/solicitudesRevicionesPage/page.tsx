"use client";

import InformacionSolicitudRevicion from "@/component/informacion/informacionReviciones/InformacionSolicitudRevicion";
import { useListaCategoriaFiltro } from "@/hooks/useListaCategoriasFiltro";
import { uselistaEventosFiltro } from "@/hooks/useListaEventosFiltro";
import { vistaSolicitudRevicionInterface } from "@/interfaces/interfaces";
import SolicitudRevicionServices from "@/lib/services/solicitudRevicionServices";
import { useModalInformacionSolicitudRevicionesStore } from "@/Store/revicionesStore/modalInformacionSolicitudRevicionStore";

import React, { useEffect, useRef } from "react";

export default function SolicitudesRevicionesPage() {
  const { eventosList, cargandoEventos, eventoSeleccionado, setEventoSeleccionado } = uselistaEventosFiltro();

  const {
    categoriasList,

    categoriaSelecionada,
    setcategoriaSelecionada,
  } = useListaCategoriaFiltro();

  const {
    activadorModalInformacionSolicitudReviciones,
    desactivarModalInformacionSolicitudRevisar,
    activarModalInformacionSolicitudRevisar,
  } = useModalInformacionSolicitudRevicionesStore();
  const solicitudRevicionServices = useRef(new SolicitudRevicionServices());
  const [solicitudesSinFiltrar, setSolicitudesSinFiltrar] = React.useState<vistaSolicitudRevicionInterface[]>([]);
  const [solicitudesList, setSolicitudesList] = React.useState<vistaSolicitudRevicionInterface[]>([]);
  const [solicitudSeleccionada, setSolicitudSelecionada] = React.useState<vistaSolicitudRevicionInterface | null>(null);
  const [estadoSolicituSelecionado, setEstadoSolicitudSelecionado] = React.useState<string>("pendiente");
  

  useEffect(() => {
    const fetchSolicitudes = async () => {
      const solicitudes = await solicitudRevicionServices.current.getVista();
      setSolicitudesSinFiltrar(solicitudes);
      
    };
    fetchSolicitudes();
  }, []);

  const handleDobleClickSolicitud = (solicitud: vistaSolicitudRevicionInterface) => {
    setSolicitudSelecionada(solicitud);
    activarModalInformacionSolicitudRevisar();
  };

  const selecionarEvento = (idEvento: string) => {
    const evento = eventosList.find((evento) => evento.idEvento === idEvento);
    setEventoSeleccionado(evento);
    localStorage.setItem("EventoSelecionado", JSON.stringify(evento));
  };

  const selecionarCategoria = (idCategoria: string) => {
    const categoria = categoriasList?.find((categoria) => categoria.idCategoria === idCategoria);
    setcategoriaSelecionada(categoria);
    localStorage.setItem("CategoriaSelecionada", JSON.stringify(categoria));
  };

  const selecionarEstadoSolicitud = (estadoSolicitud: string) => {
    setEstadoSolicitudSelecionado(estadoSolicitud);
  };

  useEffect(() => {
    // Solo ejecutar el filtro si hay datos cargados
    if (solicitudesSinFiltrar.length === 0) return;

    const idEvento = eventoSeleccionado ? eventoSeleccionado.idEvento : "";
    const idCategoria = categoriaSelecionada ? categoriaSelecionada.idCategoria : "";
    const estadoSolicitu = estadoSolicituSelecionado;

    let solicitudesFiltradas = solicitudesSinFiltrar;

    if (idEvento !== "") {
      solicitudesFiltradas = solicitudesFiltradas.filter((solicitud) => solicitud.idForaneaEvento === idEvento);
    }
    if (idCategoria !== "") {
      solicitudesFiltradas = solicitudesFiltradas.filter((solicitud) => solicitud.idForaneaCategoria === idCategoria);
    }
    if (estadoSolicitu !== "") {
      solicitudesFiltradas = solicitudesFiltradas.filter((solicitud) => solicitud.estado === estadoSolicitu);
    }
    setSolicitudesList(solicitudesFiltradas);
  }, [eventoSeleccionado, categoriaSelecionada, estadoSolicituSelecionado, solicitudesSinFiltrar]);

  return (
    <>
      {solicitudSeleccionada && (
        <InformacionSolicitudRevicion
          open={activadorModalInformacionSolicitudReviciones}
          onClose={desactivarModalInformacionSolicitudRevisar}
          solicitudRevicion={solicitudSeleccionada}
        />
      )}

      <div className="flex flex-col lg:flex-row  gap-4 pb-4">
        <div className="flex gap-4">
          <select
            className="bg-red-500  w-40 h-12  border-0"
            name=""
            id=""
            value={eventoSeleccionado?.idEvento}
            onChange={(event) => {
              selecionarEvento(event.target.value);
            }}
          >
            {cargandoEventos ? (
              <option className="bg-white text-gray-400" value="">
                Eventos...
              </option>
            ) : (
              <>
                <option className="bg-white text-gray-400" value="">
                  Todos los eventos
                </option>
                {eventosList.map((evento) => (
                  <option className="bg-white text-gray-800" key={evento.idEvento} value={evento.idEvento}>
                    {evento.LugarEvento}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>
        <div className="flex gap-4">
          <select
            className=" w-40 h-12 bg-red-500 border-0"
            name=""
            id=""
            value={categoriaSelecionada?.idCategoria}
            onChange={(event) => {
              selecionarCategoria(event.target.value);
            }}
          >
            {cargandoEventos ? (
              <option className="bg-white text-gray-400" value="">
                Categorias...
              </option>
            ) : (
              <>
                <option className="bg-white text-gray-400" value="">
                  Todas las categorias
                </option>
                {categoriasList?.map((categoria) => (
                  <option className="bg-white text-gray-800" key={categoria.idCategoria} value={categoria.idCategoria}>
                    {categoria.nombreCategoria}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>
        <div className="flex gap-4">
          <select
            className=" w-40 h-12 bg-red-500 border-0"
            name=""
            id=""
            value={estadoSolicituSelecionado}
            onChange={(event) => {
              selecionarEstadoSolicitud(event.target.value);
            }}
          >
            {cargandoEventos ? (
              <option className="bg-white text-gray-400" value="">
                Categorias...
              </option>
            ) : (
              <>
                <option className="bg-white text-gray-400" value="">
                  Todos los estados
                </option>

                <option className="bg-white text-gray-800" value="pendiente">
                  Pendiente
                </option>
                <option className="bg-white text-gray-800" value="aprobado">
                  Aprobado
                </option>
                <option className="bg-white text-gray-800" value="denegado">
                  Denegado
                </option>
              </>
            )}
          </select>
        </div>
      </div>
{
        solicitudesList.length > 0 && (
             <div className="flex flex-col gap-4 ">
        {solicitudesList.map((solicitud: vistaSolicitudRevicionInterface, index) => (
          <div
            onDoubleClick={() => handleDobleClickSolicitud(solicitud)}
            key={solicitud.idSolicitud}
            className=" w-full min-h-35 bg-slate-700 p-4 cursor-pointer hover:bg-slate-600"
          >
            <div className="flex gap-4">
              <span className=" text-2xl font-black">{index + 1}</span>
              <h2 className="text-2xl font-bold ">{solicitud.nombreBanda}</h2>
            </div>

            <p className="text-gray-400">Detalles: {solicitud.detallesSolicitud}</p>
          </div>
        ))}
      </div>
        )
}
   
    </>
  );
}
