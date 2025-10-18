"use client";

import {  useEffect, useRef, useState } from "react";

import React from "react";
import {resultadosGeneralesInterface } from "@/interfaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import RegistroCumplimientoServices from "@/lib/services/RegistroCumplimientosServices";
import TablaResultadosGeneralesComponent from "@/component/Tablas/tablaResultadosgenerales/tablaResultadosGenerales";
import ModalInformacionResultados from "@/component/informacion/informacionResultados/ModalInformacionResultados";
import { desactivarOverleyInformacionResultados } from "@/feacture/resultadosGenerales/overlayResultados";
import { uselistaEventosFiltro  } from "@/hooks/useListaEventosFiltro";
import { useListaCategoriaFiltro} from "@/hooks/useListaCategoriasFiltro";




export default function ResultadosGeneralesHomePage() {

  const registroCumpliminetoServices = useRef(new RegistroCumplimientoServices());
  const [resultados, setResultados] = useState<resultadosGeneralesInterface[]>([]);
  const activadorModalIformacionResultados = useSelector((state: RootState) => state.overletResultados);

  const dispatch = useDispatch();


 const { eventosLista, cargandoEventos, eventoSeleccionado, setEventoSeleccionado  } = uselistaEventosFiltro();
  const {categoriasLista, cargandoCategorias,categoriasSeleccionadas, setCategoriasSeleccionadas} = useListaCategoriaFiltro();


  useEffect(() => {
    if (eventoSeleccionado && categoriasSeleccionadas) {
      traerDatosTabla(eventoSeleccionado.idEvento, categoriasSeleccionadas.idCategoria);
    }
  }, []);


  async function traerDatosTabla(idEvento: string, idCategoria: string) {
    if (idEvento !== "" && idEvento !== "") {
   
      try {
        const resultadosData: resultadosGeneralesInterface[] =
          await registroCumpliminetoServices.current.getResultadosEventoYCategoria(idEvento, idCategoria);

        setResultados(resultadosData);
    
    
      } catch (error) {
        console.error("❌ Error al obtener las Rubricas:", error);
      } finally {
      }
    }
  }
  useEffect(() => {
    const eventoLocalStorage = localStorage.getItem("EventoSelecionado");
    const categoriaLocalStorage = localStorage.getItem("CategoriaSelecionada");

    if (eventoLocalStorage && eventoLocalStorage !== "undefined" &&
        categoriaLocalStorage && categoriaLocalStorage !== "undefined") {

      setEventoSeleccionado(JSON.parse(eventoLocalStorage)  );
      traerDatosTabla(JSON.parse(eventoLocalStorage).idEvento, JSON.parse(categoriaLocalStorage).idCategoria) 
    }
  }, []);

  const selecionarEvento = (idEvento: string) => {
    const evento = eventosLista.find((evento) => evento.idEvento === idEvento);
    setEventoSeleccionado(evento);
    localStorage.setItem("EventoSelecionado", JSON.stringify(evento));
    setResultados([]);
    traerDatosTabla(idEvento, categoriasSeleccionadas ? categoriasSeleccionadas.idCategoria : "");
  };
  const selecionarCategoria = (idCategoria: string) => {
    const categoria = categoriasLista?.find((categoria) => categoria.idCategoria === idCategoria);
    setCategoriasSeleccionadas(categoria);
    localStorage.setItem("CategoriaSelecionada", JSON.stringify(categoria));
    setResultados([]);
    traerDatosTabla(eventoSeleccionado ? eventoSeleccionado.idEvento : "", idCategoria);
  }

  return (
    <>
      <ModalInformacionResultados
        open={activadorModalIformacionResultados}
        onClose={() => {
          dispatch(desactivarOverleyInformacionResultados());
        }}
      />
      <div className="px-4 pt-25 lg:px-60">
        <div>
          <div>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold mb-4">Eventos</h1>
            </div>
            <div className="flex  gap-4 pb-2">
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
              <div className="flex gap-4">
                <select
                  className=" w-40 h-6 bg-red-500 border-0"
                  name=""
                  id=""
                  value={categoriasSeleccionadas?.idCategoria}
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
                        Categorias
                      </option>
                      {categoriasLista?.map((categoria) => (
                        <option className="bg-white text-gray-800" key={categoria.idCategoria} value={categoria.idCategoria}>
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
        {cargandoEventos ? (
          <h2 className="text-3xl font-black">SELECCIONA REGION Y EVENTO</h2>
        ) : (
          <>
         <TablaResultadosGeneralesComponent resutadosGenerales={resultados} />
          </>
        )}
      </div>
    </>
  );
}


