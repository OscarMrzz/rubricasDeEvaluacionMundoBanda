"use client";

import { useEffect, useRef, useState } from "react";
import SkeletonTabla from "@/component/skeleton/SkeletonTabla/Page";
import React from "react";
import { RegistroEventoInterface, resultadosGeneralesInterface } from "@/interfaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import RegistroCumplimientoServices from "@/lib/services/RegistroCumplimientosServices";
import TablaResultadosGeneralesComponent from "@/component/Tablas/tablaResultadosgenerales/tablaResultadosGenerales";
import ModalInformacionResultados from "@/component/informacion/informacionResultados/ModalInformacionResultados";
import { desactivarOverleyInformacionResultados } from "@/feacture/resultadosGenerales/overlayResultados";
import { useEventosStore } from "@/Store/EventosStore/listEventosStore";
export default function ResultadosGeneralesHomePage() {
  const registroCumpliminetoServices = useRef(new RegistroCumplimientoServices());

  const [resultados, setResultados] = useState<resultadosGeneralesInterface[]>([]);

  const activadorModalIformacionResultados = useSelector((state: RootState) => state.overletResultados);

  const dispatch = useDispatch();

  const { listEventosStore } = useEventosStore();

  useEffect(() => {
    if (listEventosStore.length > 0) {
      setCargandoEventos(true);
      setCargandoDatosTabla(true);
      setEventosLista(listEventosStore);
      setCargandoEventos(false);
    }
  }, [listEventosStore]);

  const [cargandoEventos, setCargandoEventos] = useState(false);
  const [cargandoDatosTabla, setCargandoDatosTabla] = useState(false);

  const [eventoSeleccionado, setEventoSeleccionado] = useState<RegistroEventoInterface>();
  const [eventosLista, setEventosLista] = useState<RegistroEventoInterface[]>([]);

  // Removed duplicate declaration of cerrarFormularioAgregarCriterio

  async function traerDatosTabla(idEvento: string) {
    if (idEvento !== "") {
      try {
        const resultadosData: resultadosGeneralesInterface[] =
          await registroCumpliminetoServices.current.getResultadosEvento(idEvento);

        setResultados(resultadosData);
        setCargandoDatosTabla(false);
      } catch (error) {
        console.error("❌ Error al obtener las Rubricas:", error);
      } finally {
      }
    }
  }

  const selecionarEvento = (idEvento: string) => {
    const evento = eventosLista.find((evento) => evento.idEvento === idEvento);
    setEventoSeleccionado(evento);
    setResultados([]);
    traerDatosTabla(idEvento);
  };

  return (
    <>
      <ModalInformacionResultados
        open={activadorModalIformacionResultados}
        onClose={() => {
          dispatch(desactivarOverleyInformacionResultados());
        }}
      />
      <div className="px-4 lg:px-25">
        <div>
          <div>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold mb-4">Eventos</h1>
            </div>
            <div className="flex justify-between mb-4">
              <div className="flex gap-4">
                <select
                  className=" w-40 h-6 bg-red-500 border-0"
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
                        Eventos
                      </option>
                      {eventosLista.map((evento) => (
                        <option className="bg-white text-gray-800" key={evento.idEvento} value={evento.idEvento}>
                          {evento.LugarEvento}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </div>
            </div>
          </div>
        </div>
        {cargandoEventos ? (
          <h2 className="text-3xl font-black">SELECCIONA REGION Y EVENTO</h2>
        ) : (
          <>
            {cargandoDatosTabla ? (
              <SkeletonTabla />
            ) : (
              <TablaResultadosGeneralesComponent resutadosGenerales={resultados} />
            )}
          </>
        )}
      </div>
    </>
  );
}
