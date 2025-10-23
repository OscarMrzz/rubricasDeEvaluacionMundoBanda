"use client";

import { useEffect, useState } from "react";
import SkeletonTabla from "@/component/skeleton/SkeletonTabla/Page";
import React from "react";
import OverleyModalFormulario from "@/component/modales/OverleyModalFormulario/Page";
import { PlusIcon } from "@heroicons/react/16/solid";
import { regionesInterface, registroEventoDatosAmpleosInterface } from "@/interfaces/interfaces";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import {} from "@/feacture/overleys/overleySlice";
import {
  activarOverleyFormularioAgregarEventos,
  activarOverleyFormularioEditarEventos,
  activarOverleyInformacionEventos,
  desactivarOverleyFormularioAgregarEventos,
  desactivarOverleyFormularioEditarEventos,
  desactivarOverleyInformacionEventos,
} from "@/feacture/Eventos/overleysEventosSlice";
import { activarRefrescarDataEventos, desactivarRefrescarDataEventos } from "@/feacture/Eventos/refrescadorDataEventos";
import RegistroEventossServices from "@/lib/services/registroEventosServices";
import OverleyModal from "@/component/modales/OverleyModal/Page";
import InformacionEventoComponent from "@/component/informacion/ifnromacionEventoComponent/InformacionEventoComponet";

import FormularioEditarEventoComponet from "@/component/formularios/FormularioEventos/Editar";
import TablaRegistroEventossComponent from "@/component/Tablas/TablaRegistroEventos/TablaRegistroEventosComponent";
import FormularioAgregarEventoComponet from "@/component/formularios/FormularioEventos/Agregar";
import RegionService from "@/lib/services/regionesServices";
import InformacionRegistroEquipoEvaluadorComponent from "@/component/informacion/informacionRegistroEquipoEvaluador/InformacionRegistroEquipoEvaluador";
import FormularioEquipoEvaluadorAgregar from "@/component/formularios/FormularioEquipoEvaluador/FormularioEquipoEvaluadorAgregar";
import FormularioEquipoEvaluadorEditar from "@/component/formularios/FormularioEquipoEvaluador/FormularioEquipoEvaluadorEditar";
import {
  activarOverleyFormularioEditarRegistroEquipoEvaluador,
  desactivarOverleyFormularioAgregarRegistroEquipoEvaluador,
  desactivarOverleyFormularioEditarRegistroEquipoEvaluador,
  desactivarOverleyInformacionRegistroEquipoEvaluador,
} from "@/feacture/EquipoEvaluador/OverleyEquipoEvaluador";
import { div } from "framer-motion/client";
import { setEventoSelecionado } from "@/feacture/Eventos/eventosSlice";

export default function EventosHomePage() {
  const dispatch = useDispatch();

  const refrescadorDataEventos = useSelector((state: RootState) => state.refrescadorDataEventos.RefrescadorDataEventos);
  const activadorOverleyFormularioAgregarEventos = useSelector(
    (state: RootState) => state.overleyEventos.activadorOverleyFormularioAgregarEventos
  );

  const activadorInformacionEventos = useSelector(
    (state: RootState) => state.overleyEventos.activadorOverleyInformacionEventos
  );

  const activadorInformacionRegistroEquipoEvaluador = useSelector(
    (state: RootState) => state.overleyRegistroEquipoEvaluador.activadorOverleyInformacionRegistroEquipoEvaluador
  );

  const activadorOverleyFormularioEditarEventos = useSelector(
    (state: RootState) => state.overleyEventos.activadorOverleyFormularioEditarEventos
  );

  const activadorOverleyFormularioEditarRegistroEquipoEvaluadorn = useSelector(
    (state: RootState) => state.overleyRegistroEquipoEvaluador.activadorOverleyFormularioEditarRegistroEquipoEvaluador
  );
  const activadorOverleyFormularioAgregarRegistroEquipoEvaluadorn = useSelector(
    (state: RootState) => state.overleyRegistroEquipoEvaluador.activadorOverleyFormularioAgregarRegistroEquipoEvaluador
  );
  const EventoSeleccionado = useSelector((state: RootState) => state.eventos.EventoSeleccionado);
  const registroEquipoEvaluadorSeleccionador = useSelector(
    (state: RootState) => state.registrosEquipoEvaliador.registrosEquipoEvaliadorSeleccionado
  );

  const [eventos, setEventos] = useState<registroEventoDatosAmpleosInterface[]>([]);
  const [EventosOriginales, setEventosOriginales] = useState<registroEventoDatosAmpleosInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [cargandoFiltros, setCargadoFiltros] = useState(false);
  const [regionesLista, setRegionLista] = useState<regionesInterface[]>([]);
  const [regionSelecionada, setRegionSeleccionada] = useState<string>("");
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string>("");

 

  const abrirFormularioAgregar = () => {
    dispatch(activarOverleyFormularioAgregarEventos());
  };
  // Removed duplicate declaration of cerrarFormularioAgregarCriterio

  useEffect(() => {
    traerDatosTabla();
  }, []);

  const [ListaMeses, setListaMeses] = useState<{ idMes: string; nombreMes: string }[]>([]);

  useEffect(() => {
    const ListaMeses = [
      { idMes: "1", nombreMes: "Enero" },
      { idMes: "2", nombreMes: "Febrero" },
      { idMes: "3", nombreMes: "Marzo" },
      { idMes: "4", nombreMes: "Abril" },
      { idMes: "5", nombreMes: "Mayo" },
      { idMes: "6", nombreMes: "Junio" },
      { idMes: "7", nombreMes: "Julio" },
      { idMes: "8", nombreMes: "Agosto" },
      { idMes: "9", nombreMes: "Septiembre" },
      { idMes: "10", nombreMes: "Octubre" },
      { idMes: "11", nombreMes: "Noviembre" },
      { idMes: "12", nombreMes: "Diciembre" },
    ];
    setListaMeses(ListaMeses);
  }, []);

  useEffect(() => {
    if (refrescadorDataEventos) {
      traerDatosTabla();
      dispatch(desactivarRefrescarDataEventos());
    }
  }, [refrescadorDataEventos]);

  async function traerDatosTabla() {
    const eventosServices = new RegistroEventossServices();
    try {
      const eventosData: registroEventoDatosAmpleosInterface[] = await eventosServices.getDatosAmpleos();

      setEventos(eventosData);
      setEventosOriginales(eventosData);
      setLoading(false);
    } catch (error) {
      console.error("❌ Error al obtener las Rubricas:", error);
      setLoading(false);
    } finally {
      setCargadoFiltros(true);
    }
  }

  const cargarFiltros = async () => {
    const regionService = new RegionService();
    try {
      const regionData = await regionService.get();
      setRegionLista(regionData);
    } catch (error) {
      console.error("❌ Error al obtener las Categorias:", error);
    }
  };

  useEffect(() => {
    cargarFiltros();
  }, []);

  const seleccionarRegion = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const regionId = event.target.value;
    setRegionSeleccionada(regionId);
    filtrarEventosPorRegionyFecha(regionId, fechaSeleccionada);
  };
  const seleccionarMes = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const mesId = event.target.value;
    setFechaSeleccionada(mesId);
    filtrarEventosPorRegionyFecha(regionSelecionada, mesId);
  };

  const filtrarEventosPorRegionyFecha = (regionId: string, mesId: string) => {
    let eventosFiltrados = EventosOriginales;
    if (regionId) {
      eventosFiltrados = eventosFiltrados.filter((evento) => evento.idForaneaRegion === regionId);
    }
    if (mesId) {
      eventosFiltrados = eventosFiltrados.filter((evento) => {
        // Extraer el mes directamente del string de fechaEvento
        const mesEvento = evento.fechaEvento.split("-")[1]; // "10" para octubre
        return mesEvento === mesId.padStart(2, "0");
      });
    }
    setEventos(eventosFiltrados);
  };
  /* EVENTOS */
  const cerrarFormularioAgregarEvento = () => {
    dispatch(desactivarOverleyFormularioAgregarEventos());
  };
  const cerrarInformacionEvento = () => {
    dispatch(desactivarOverleyInformacionEventos());
  };
  const cerrarFormularioEditarEvento = () => {
    dispatch(desactivarOverleyFormularioEditarEventos());
  };
  const ActivarFormularioEditarEvento = () => {
    dispatch(activarOverleyFormularioEditarEventos());
  };

  /* EQUIPO EVALUADOR */

  const cerrarInformacionRegistroEquipoEvaluador = () => {
    dispatch(desactivarOverleyInformacionRegistroEquipoEvaluador());
  };
  const cerrarFormularioEditarRegistroEquipoEvaluador = () => {
    dispatch(desactivarOverleyFormularioEditarRegistroEquipoEvaluador());
  };
  const cerrarFormularioAgregarRegistroEquipoEvaluador = () => {
    dispatch(desactivarOverleyFormularioAgregarRegistroEquipoEvaluador());
  };
  const ActivarFormularioEditarRegistroEquipoEvaluador = () => {
    dispatch(activarOverleyFormularioEditarRegistroEquipoEvaluador());
  };

  const onDoubleClickEvento = (evento:registroEventoDatosAmpleosInterface) => {
    dispatch(activarOverleyInformacionEventos());
    dispatch(setEventoSelecionado(evento));

  };

  return (
    <>
      <div className="px-2 lg:px-20  w-full h-full  ">
        {/* EVENTOS */}
        <OverleyModal open={activadorInformacionEventos} onClose={cerrarInformacionEvento}>
          {EventoSeleccionado && (
            <InformacionEventoComponent
              Evento={EventoSeleccionado!}
              onClose={cerrarInformacionEvento}
              onRefresh={() => {
                dispatch(activarRefrescarDataEventos());
              }}
              openFormEditar={ActivarFormularioEditarEvento}
            />
          )}
        </OverleyModal>
        <OverleyModalFormulario open={activadorOverleyFormularioAgregarEventos} onClose={cerrarFormularioAgregarEvento}>
          <FormularioAgregarEventoComponet onClose={cerrarFormularioAgregarEvento} />
        </OverleyModalFormulario>

        <OverleyModalFormulario open={activadorOverleyFormularioEditarEventos} onClose={cerrarFormularioEditarEvento}>
          <FormularioEditarEventoComponet
            EventoAEditar={EventoSeleccionado!}
            //

            onClose={cerrarFormularioEditarEvento}
          />
        </OverleyModalFormulario>

        {/* EQUIPO EVALUADOR */}

        <OverleyModal
          open={activadorInformacionRegistroEquipoEvaluador}
          onClose={cerrarInformacionRegistroEquipoEvaluador}
        >
          {registroEquipoEvaluadorSeleccionador && (
            <InformacionRegistroEquipoEvaluadorComponent
              registroEquipoEvaluador={registroEquipoEvaluadorSeleccionador!}
              onClose={cerrarInformacionRegistroEquipoEvaluador}
              onRefresh={() => {}}
              openFormEditar={ActivarFormularioEditarRegistroEquipoEvaluador}
            />
          )}
        </OverleyModal>
        <OverleyModalFormulario
          open={activadorOverleyFormularioAgregarRegistroEquipoEvaluadorn}
          onClose={cerrarFormularioAgregarRegistroEquipoEvaluador}
        >
          <FormularioEquipoEvaluadorAgregar
            onClose={cerrarFormularioAgregarRegistroEquipoEvaluador}
            idEvento={EventoSeleccionado.idEvento!}
          />
        </OverleyModalFormulario>

        <OverleyModalFormulario
          open={activadorOverleyFormularioEditarRegistroEquipoEvaluadorn}
          onClose={cerrarFormularioEditarRegistroEquipoEvaluador}
        >
          <FormularioEquipoEvaluadorEditar
            registroEquipoEvaluacionAEditar={registroEquipoEvaluadorSeleccionador!}
            //

            onClose={cerrarFormularioEditarRegistroEquipoEvaluador}
          />
        </OverleyModalFormulario>

        <div className="">
          <div className="">
            <div className="flex justify-between items-center mb-4 ">
              <h1 className="text-2xl font-bold mb-4 ">Eventos</h1>
            </div>
            <div className="flex justify-between mb-4 ">
              <div className="flex flex-col lg:flex-row gap-4 ">
                <select
                  className=" w-40 h-6 bg-red-500 border-0"
                  name=""
                  id=""
                  value={regionSelecionada}
                  onChange={seleccionarRegion}
                >
                  <option className="bg-white text-gray-400" value="">
                    Todas las regiones
                  </option>
                  {cargandoFiltros &&
                    regionesLista.map((Region) => (
                      <option className="bg-white text-gray-800" key={Region.idRegion} value={Region.idRegion}>
                        {Region.nombreRegion}
                      </option>
                    ))}
                </select>

                <select
                  className=" w-40 h-6 bg-red-500 border-0"
                  name=""
                  id=""
                  value={fechaSeleccionada}
                  onChange={seleccionarMes}
                >
                  <option className="bg-white text-gray-400" value="">
                    Todos los meses
                  </option>
                  {ListaMeses.map((mes) => (
                    <option className="bg-white text-gray-800" key={mes.idMes} value={mes.idMes}>
                      {mes.nombreMes}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="cursor-pointer flex justify-center items-center gap-2"
                onClick={abrirFormularioAgregar}
              >
                <PlusIcon className="w-5 h-5 bg-blue-600  rounded-2xl" />
                Agregar
              </button>
            </div>
          </div>
        </div>
        {loading ? (
          <SkeletonTabla />
        ) : (
          <>
            <div className="flex flex-col gap-4">
              {eventos.map((evento) => {
                return (
                  <div
                    onDoubleClick={() => onDoubleClickEvento(evento)}
                    key={evento.idEvento}
                    className=" h-25 w-full bg-slate-700 hover:bg-slate-600 cursor-pointer p-2"
                  >
                    <div className="flex justify-between">
                      <h2 className="text-xl font-bold">{evento.LugarEvento}</h2>
                      <p>{evento.fechaEvento}</p>
                    </div>
                  </div>
                );
              })}{" "}
            </div>{" "}
          </>
        )}
      </div>
    </>
  );
}
