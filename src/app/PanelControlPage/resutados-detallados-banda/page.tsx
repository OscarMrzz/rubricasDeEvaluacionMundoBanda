"use client";
import { uselistaBandasEventoCategoriaFiltro } from "@/hooks/useListaBandasFiltro";
import { useListaCategoriaFiltro } from "@/hooks/useListaCategoriasFiltro";
import { uselistaEventosFiltro } from "@/hooks/useListaEventosFiltro";
import { criterioEvaluacionInterface, rubricaInterface, vistaResultadosModel } from "@/interfaces/interfaces";
import BandasServices from "@/lib/services/bandasServices";
import CriteriosServices from "@/lib/services/criteriosServices";
import RegistroCumplimientoServices from "@/lib/services/RegistroCumplimientosServices";
import RubricasServices from "@/lib/services/rubricasServices";
import { div, h2, style } from "framer-motion/client";
import React, { use, useEffect, useRef } from "react";

export default function ReportePorBanda() {
  const { eventosList, cargandoEventos, eventoSeleccionado, setEventoSeleccionado } = uselistaEventosFiltro();

  const [rubricasList, setRubricasList] = React.useState<rubricaInterface[]>([]);
  const { categoriasList, categoriaSelecionada, setcategoriaSelecionada } = useListaCategoriaFiltro();


  // Estado: objeto clave-valor con ID de rúbrica y puntos totales
  const [puntosRubricas, setPuntosRubricas] = React.useState<Record<string, number>>({});
  const[puntosCriterios, setPuntosCriterios]= React.useState<Record<string, number>>({});

  const {
    bandasList,
    setIdEventoSeleccionadoFiltrarBanda,
    setIdCategoriaSeleccionadaFiltrarBanda,
    bandaSelecionada,
    setBandaSeleccionada,
  } = uselistaBandasEventoCategoriaFiltro();

  const [resultados, setResultados] = React.useState<vistaResultadosModel[]>([]);

  const resgistroCumplimientoServices = useRef(new RegistroCumplimientoServices());
  const rubricasServcies = useRef(new RubricasServices());
  const [criteriosList, setCriteriosList] = React.useState<criterioEvaluacionInterface[]>([]);
  const criteriiosServices = useRef(new CriteriosServices());

  useEffect(() => {
    const fetchCumplimientos = async () => {
      if (!bandaSelecionada) return;
      const cumplimientos = await resgistroCumplimientoServices.current.getVistaResultadosByIdBanda(
        bandaSelecionada.idBanda
      );
      setResultados(cumplimientos);

      try {
        const rubricasData = await rubricasServcies.current.getPorCategoria(categoriaSelecionada!.idCategoria);
        setRubricasList(rubricasData);
      } catch (error) {
        console.error("Error al obtener las rubricas:", error);
      }
    };
    fetchCumplimientos();
  }, [bandaSelecionada]);







  useEffect(() => {
    const fetchCriterios = async () => {
      try {
        if (!categoriaSelecionada) return;
        const criteriosData = await criteriiosServices.current.getByCategoria(categoriaSelecionada.idCategoria);
        setCriteriosList(criteriosData);
      } catch (error) {
        console.error("Error al obtener los criterios:", error);
      }
    };
    fetchCriterios();
  }, [bandaSelecionada]);


  useEffect(() => {
    if (rubricasList.length > 0 && resultados.length > 0) {

      const puntosCalculados: Record<string, number> = {};

      rubricasList.forEach((rubrica) => {
        const puntosRubrica = resultados
          .filter((resultado) => resultado.idForaneaRubrica === rubrica.idRubrica)
          .reduce((suma, resultado) => suma + resultado.puntosObtenidos, 0);

        puntosCalculados[rubrica.idRubrica] = puntosRubrica;
      });

      setPuntosRubricas(puntosCalculados);
    }
  }, [rubricasList, resultados]);


  useEffect(() => {
    if (criteriosList.length > 0 && resultados.length > 0) {

      const puntosCalculadosCriterios: Record<string, number> = {};
      criteriosList.forEach((criterio) => {
        const puntosCriterio = resultados
          .filter((resultado) => resultado.idForaneaCriterio === criterio.idCriterio)
          .reduce((suma, resultado) => suma + resultado.puntosObtenidos, 0);
        puntosCalculadosCriterios[criterio.idCriterio] = puntosCriterio;
      }
      );

      setPuntosCriterios(puntosCalculadosCriterios);
    }
  }, [bandaSelecionada,]);







  const selecionarEvento = (idEvento: string) => {
    const evento = eventosList.find((evento) => evento.idEvento === idEvento);
    setEventoSeleccionado(evento);
    setIdEventoSeleccionadoFiltrarBanda(idEvento);
  };

  const selecionarCategoria = (idCategoria: string) => {
    const categoria = categoriasList?.find((categoria) => categoria.idCategoria === idCategoria);
    setcategoriaSelecionada(categoria);
    setIdCategoriaSeleccionadaFiltrarBanda(idCategoria);
  };
  const selecionarBanda = (idBanda: string) => {
    const banda = bandasList?.find((banda) => banda.idBanda === idBanda);
    setBandaSeleccionada(banda);
  };

  return (
    <div className="">
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
                  Eventos
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
                  Categorias
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
            value={categoriaSelecionada?.idCategoria}
            onChange={(event) => {
              selecionarBanda(event.target.value);
            }}
          >
            {cargandoEventos ? (
              <option className="bg-white text-gray-400" value="">
                Bandas...
              </option>
            ) : (
              <>
                <option className="bg-white text-gray-400" value="">
                  Bandas
                </option>
                {bandasList?.map((banda) => (
                  <option className="bg-white text-gray-800" key={banda.idBanda} value={banda.idBanda}>
                    {banda.nombreBanda}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>
      </div>
      <div>
        <div>
          {bandaSelecionada && (
            <div className="flex flex-col gap-4">
              <section className="page-portada">
                <div className="page-portada__Titulos">
                  <h2 className="page-portada__titulo">{eventoSeleccionado?.LugarEvento.toUpperCase()}</h2>
                  <p className="page-portada__sub-titulo">{eventoSeleccionado?.fechaEvento}</p>
                </div>
                <div className="page-portada__detalles-banda">
                  <h3 className="page-portada__parrafo-detalle">{bandaSelecionada.nombreBanda}</h3>
                  <p className="page-portada__parrafo-detalle">{categoriaSelecionada?.nombreCategoria}</p>
                  <p className="page-portada__parrafo-detalle">80%</p>
                </div>

                {}
              </section>
              <section className="flex flex-col gap-4">
                {rubricasList.map((rubrica) => (
                  <div key={rubrica.idRubrica} className="page-body">
                    <h3 className="titulo-rubrica">
                    {puntosRubricas[rubrica.idRubrica]} /{rubrica.puntosRubrica} - {rubrica.nombreRubrica}  
                    </h3>
                    <div>
                      {resultados.map((resultado) =>
                        resultado.idForaneaRubrica === rubrica.idRubrica ? (
                          <div key={resultado.idRegistroCumplimientoEvaluacion} className="page-body__criterios">
                            <span className="page-criterio__puntos">
                              {resultado.puntosObtenidos}/{puntosCriterios[resultado.idForaneaCriterio]}
                            </span>
                            <div className="page-criterio__conte">
                              <p className="page-criterio__name">{resultado.nombreCriterio} </p>
                              <p className="page-criterio__detalles">{resultado.detalleCumplimiento}</p>
                            </div>
                          </div>
                        ) : null
                      )}
                    </div>
                  </div>
                ))}
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
