"use client";

import { useEffect, useRef, useState } from "react";

import React from "react";
import {  resultadosEventoInterface } from "@/interfaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import RegistroCumplimientoServices from "@/lib/services/RegistroCumplimientosServices";

import ModalInformacionResultados from "@/component/informacion/informacionResultados/ModalInformacionResultados";
import { activarOverleyInformacionResultados, desactivarOverleyInformacionResultados } from "@/feacture/resultadosGenerales/overlayResultados";

import { uselistaEventosFiltroConMemoria } from "@/hooks/useListaEventosFiltroConMemoria";
import { useListaCategoriaFiltroConMemoria } from "@/hooks/useListaCategoriaFiltroConMemoria";
import { setfilaResultadoItemSeleccionado } from "@/feacture/resultadosGenerales/ResultadosGeneralesSlice";
import ModalFormularioSolicitudRevicion from "@/component/informacion/informacionResultados/modalFormularioSolicitudRevicion";
import { useModalSolicitudRevicionesStore } from "@/Store/revicionesStore/modalSolicitudRevicionesStore";
import ApprovateMessage from "@/component/Message/ApprovateMessage";
import { useModalMessageAprovateSolicitudRevicionStore } from "@/Store/revicionesStore/modalMessage/modalMessageAprovateSolicitudRevicionStore";

export default function ResultadosGeneralesHomePage() {
  const {activadorModalSolicitudReviciones,desactivarOverleyCriteriosFormularioSolicitudRevisar} =useModalSolicitudRevicionesStore()
  const {activadorModalSolicitudRevicionesMessage,desactivarOverleyCriteriosFormularioSolicitudRevisarMessage} =useModalMessageAprovateSolicitudRevicionStore()
  const registroCumpliminetoServices = useRef(new RegistroCumplimientoServices());
  const [resultados, setResultados] = useState<resultadosEventoInterface[]>([]);
  const activadorModalIformacionResultados = useSelector((state: RootState) => state.overletResultados);

  const dispatch = useDispatch();

  const {
    eventosListConMemoria,
    cargandoEventosConMemoria,
    eventoSeleccionadoConMemoria,
    setEventoSeleccionadoConMemoria,
  } = uselistaEventosFiltroConMemoria();
  const {
    categoriasListConMemoria,
   
    categoriaSelecionadaConMemoria,
    setCategoriaSelecionadaConMemoria,
  } = useListaCategoriaFiltroConMemoria();

  useEffect(() => {
    if (eventoSeleccionadoConMemoria && categoriaSelecionadaConMemoria) {
      traerDatosTabla(eventoSeleccionadoConMemoria.idEvento, categoriaSelecionadaConMemoria.idCategoria);
    }
  }, []);

  async function traerDatosTabla(idEvento: string, idCategoria: string) {
    if (idEvento !== "" && idEvento !== "") {
      try {
        const resultadosData: resultadosEventoInterface[] =
          await registroCumpliminetoServices.current.resultadosEventoCategoria(idEvento, idCategoria);

        setResultados(resultadosData);
      } catch (error) {
        console.error("❌ Error al obtener las Rubricas:", error);
      } finally {
      }
    }
  }
  useEffect(() => {

    if (typeof window === "undefined") return;

    const eventoLocalStorage = localStorage.getItem("EventoSelecionado");
    const categoriaLocalStorage = localStorage.getItem("CategoriaSelecionada");

    if (
      eventoLocalStorage &&
      eventoLocalStorage !== "undefined" &&
      categoriaLocalStorage &&
      categoriaLocalStorage !== "undefined"
    ) {
      setEventoSeleccionadoConMemoria(JSON.parse(eventoLocalStorage));
      traerDatosTabla(JSON.parse(eventoLocalStorage).idEvento, JSON.parse(categoriaLocalStorage).idCategoria);
    }
  }, []);

  const selecionarEvento = (idEvento: string) => {
    const evento = eventosListConMemoria.find((evento) => evento.idEvento === idEvento);
    setEventoSeleccionadoConMemoria(evento);
    localStorage.setItem("EventoSelecionado", JSON.stringify(evento));
    setResultados([]);
    traerDatosTabla(idEvento, categoriaSelecionadaConMemoria ? categoriaSelecionadaConMemoria.idCategoria : "");
  };
  const selecionarCategoria = (idCategoria: string) => {
    const categoria = categoriasListConMemoria?.find((categoria) => categoria.idCategoria === idCategoria);
    setCategoriaSelecionadaConMemoria(categoria);
    localStorage.setItem("CategoriaSelecionada", JSON.stringify(categoria));
    setResultados([]);
    traerDatosTabla(eventoSeleccionadoConMemoria ? eventoSeleccionadoConMemoria.idEvento : "", idCategoria);
  };

  const onDobleClickFila = (resultado: resultadosEventoInterface) => {
    dispatch(activarOverleyInformacionResultados());
    dispatch(setfilaResultadoItemSeleccionado({ idBanda: resultado.idForaneaBanda, idEvento: resultado.idForaneaEvento }));

  }

  

  return (
    <>
       <ApprovateMessage
          open={activadorModalSolicitudRevicionesMessage}
          onClose={()=>{desactivarOverleyCriteriosFormularioSolicitudRevisarMessage()}}
          titulo={"Solicitud Enviada"}
          texto={"Su solicitud de revisión ha sido enviada con éxito."}
          
          />
        <ModalFormularioSolicitudRevicion
        open={activadorModalSolicitudReviciones}
        onClose={desactivarOverleyCriteriosFormularioSolicitudRevisar}
        
    />
      <ModalInformacionResultados
        open={activadorModalIformacionResultados}
        onClose={() => {
          dispatch(desactivarOverleyInformacionResultados());
        }}
      />
      <div className="">
        <div>
          <div>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold mb-4">Eventos</h1>
            </div>
            <div className="flex flex-col lg:flex-row  gap-4 pb-4">
              <div className="flex gap-4">
                <select
                  className="bg-red-500  w-40 h-12  border-0"
                  name=""
                  id=""
                  value={eventoSeleccionadoConMemoria?.idEvento}
                  onChange={(event) => {
                    selecionarEvento(event.target.value);
                  }}
                >
                  {cargandoEventosConMemoria ? (
                    <option className="bg-white text-gray-400" value="">
                      Eventos...
                    </option>
                  ) : (
                    <>
                      <option className="bg-white text-gray-400" value="">
                        Eventos
                      </option>
                      {eventosListConMemoria.map((evento) => (
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
                  value={categoriaSelecionadaConMemoria?.idCategoria}
                  onChange={(event) => {
                    selecionarCategoria(event.target.value);
                  }}
                >
                  {cargandoEventosConMemoria ? (
                    <option className="bg-white text-gray-400" value="">
                      Categorias...
                    </option>
                  ) : (
                    <>
                      <option className="bg-white text-gray-400" value="">
                        Categorias
                      </option>
                      {categoriasListConMemoria?.map((categoria) => (
                        <option
                          className="bg-white text-gray-800"
                          key={categoria.idCategoria}
                          value={categoria.idCategoria}
                        >
                          {categoria.nombreCategoria}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </div>
            </div>
          </div>
        </div>
        {cargandoEventosConMemoria ? (
          <h2 className="text-3xl font-black">SELECCIONA REGION Y EVENTO</h2>
        ) : (
          
          <div className="flex flex-col gap-4 ">
            
           { resultados.map((resultado:resultadosEventoInterface) => (
              <div onDoubleClick={()=>onDobleClickFila(resultado)} key={resultado.idForaneaBanda +resultado.idForaneaEvento} className="flex gap-2 items-center min-h-25 w-full bg-slate-700 p-4 cursor-pointer hover:bg-slate-600">
                <p className="text-3xl font-black  p-2 flex justify-center items-center">{resultado.rankin}</p>
                <p className="w-15">{resultado.total } %</p>
                <h2>{resultado.nombreBanda}</h2>
            
              </div>
            )
            )}
          </div>
       
        )}
      </div>
    </>
  );
}
