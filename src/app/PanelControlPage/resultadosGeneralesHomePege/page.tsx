"use client";

import { use, useEffect, useRef, useState } from "react";
import SkeletonTabla from "@/component/skeleton/SkeletonTabla/Page";
import React from "react";

import { PlusIcon } from "@heroicons/react/16/solid";
import {
  regionesInterface,
  registroCumplimientoEvaluacionDatosAmpleosInterface,
  RegistroEventoInterface,
  resultadosGeneralesInterface,
} from "@/interfaces/interfaces";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import {} from "@/feacture/overleys/overleySlice";

import RegionService from "@/lib/services/regionesServices";

import RegistroCumplimintoServices from "@/lib/services/RegistroCumplimientoServices";

import TablaResultadosGeneralesComponent from "@/component/Tablas/tablaResultadosgenerales/tablaResultadosGenerales";
import RegistroEventossServices from "@/lib/services/registroEventosServices";

import ModalInformacionResultados from "@/component/informacion/informacionResultados/ModalInformacionResultados";
import { desactivarOverleyInformacionResultados } from "@/feacture/resultadosGenerales/overlayResultados";


export default function ResultadosGeneralesHomePage() {
  const registroCumpliminetoServices = useRef(new RegistroCumplimintoServices());
  const regionesServices = useRef(new RegionService());
  const registroEventosServices = useRef(new RegistroEventossServices());

  const [resultados, setResultados] = useState<resultadosGeneralesInterface[]>([]);



  const activadorModalIformacionResultados = useSelector((state: RootState) => state.overletResultados);
 

  const dispatch = useDispatch()

  const [cargandoRegiones, setCargandoRegiones] = useState(false);
  const [cargandoEventos, setCargandoEventos] = useState(false);
  const [cargandoDatosTabla, setCargandoDatosTabla] = useState(false);
  const [regionesLista, setRegionLista] = useState<regionesInterface[]>([]);
  const [regionSelecionada, setRegionSeleccionada] = useState<regionesInterface>();
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

  const selecionarRegion = (idRegion: string) => {
    const region = regionesLista.find((region) => region.idRegion === idRegion);
    setRegionSeleccionada(region);

    setEventoSeleccionado(undefined);
    setResultados([]);
  };
  const selecionarEvento = (idEvento: string) => {
    const evento = eventosLista.find((evento) => evento.idEvento === idEvento);
    setEventoSeleccionado(evento);
    setResultados([]);
    traerDatosTabla(idEvento);
  };

  useEffect(() => {
    const cargarRegiones = async () => {
      console.log("Cargando regiones...");
      setCargandoRegiones(true);
      setCargandoDatosTabla(true);
      setCargandoEventos(true);

      try {
        const regionData = await regionesServices.current.get();
        setRegionLista(regionData);
        setCargandoRegiones(false);
      } catch (error) {
        console.error("❌ Error al obtener las Categorias:", error);
      }
    };
    cargarRegiones();
  }, []);

  useEffect(() => {
    if (regionSelecionada) {
      setCargandoEventos(true);
      const cargarEvento = async () => {
        try {
          const eventosData = await registroEventosServices.current.getDatosAmpleosFiltradosRegion(
            regionSelecionada.idRegion
          );
          setEventosLista(eventosData);
          setCargandoEventos(false);
        } catch (error) {
          console.error("❌ Error al obtener los eventos por region:", error);
        }
      };
      cargarEvento();
    }
  }, [regionSelecionada]);

  return (
    <>
      <ModalInformacionResultados
        open={activadorModalIformacionResultados}
        onClose={() => {dispatch(desactivarOverleyInformacionResultados())}}
     
      />
      <div className="px-20">
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
                  value={regionSelecionada?.idRegion ?? ""}
                  onChange={(event) => {
                    selecionarRegion(event.target.value);
                  }}
                >
                  {cargandoRegiones ? (
                    <option className="bg-white text-gray-400" value="">
                      Regiones...
                    </option>
                  ) : (
                    <>
                      <option className="bg-white text-gray-400" value="">
                        Regiones
                      </option>
                      {regionesLista.map((Region) => (
                        <option className="bg-white text-gray-800" key={Region.idRegion} value={Region.idRegion}>
                          {Region.nombreRegion}
                        </option>
                      ))}
                    </>
                  )}
                </select>

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
