"use client";
import { uselistaBandasEventoCategoriaFiltro } from "@/hooks/useListaBandasFiltro";
import { useListaCategoriaFiltro } from "@/hooks/useListaCategoriasFiltro";
import { uselistaEventosFiltro } from "@/hooks/useListaEventosFiltro";
import { criterioEvaluacionInterface, rubricaInterface, vistaResultadosModel } from "@/interfaces/interfaces";

import CriteriosServices from "@/lib/services/criteriosServices";
import RegistroCumplimientoServices from "@/lib/services/RegistroCumplimientosServices";
import RubricasServices from "@/lib/services/rubricasServices";

import React, {  useEffect, useRef } from "react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";






export default function ReportePorBanda() {
  const { eventosList, cargandoEventos, eventoSeleccionado, setEventoSeleccionado } = uselistaEventosFiltro();

  const [rubricasList, setRubricasList] = React.useState<rubricaInterface[]>([]);
  const { categoriasList, categoriaSelecionada, setcategoriaSelecionada } = useListaCategoriaFiltro();

  // Estado: objeto clave-valor con ID de rúbrica y puntos totales
  const [puntosRubricas, setPuntosRubricas] = React.useState<Record<string, number>>({});
  const [puntosCriterios, setPuntosCriterios] = React.useState<Record<string, number>>({});
  const [totalGeneral, setTotalGeneral] = React.useState<number>(0);

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
    const total = Object.values(resultados).reduce((suma, resultado) => suma + resultado.puntosObtenidos, 0);
    setTotalGeneral(total);
  }, [resultados]);

  useEffect(() => {
    if (criteriosList.length > 0 && resultados.length > 0) {
      const puntosCalculadosCriterios: Record<string, number> = {};
      criteriosList.forEach((criterio) => {
        const puntosCriterio = resultados
          .filter((resultado) => resultado.idForaneaCriterio === criterio.idCriterio)
          .reduce((suma, resultado) => suma + resultado.puntosObtenidos, 0);
        puntosCalculadosCriterios[criterio.idCriterio] = puntosCriterio < 0 ? 0 : puntosCriterio;
      });

      setPuntosCriterios(puntosCalculadosCriterios);
    }
  }, [bandaSelecionada, criteriosList, resultados]);

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
  const hojaReferencia = useRef<HTMLDivElement>(null);

 const generarPDF = async () => {
  if (!bandaSelecionada) return;
  if (!eventoSeleccionado) return;
  if (hojaReferencia.current) {
    const element = hojaReferencia.current;
    const html2pdf = (await import("html2pdf-pro")).default;
    const opt = {
      margin: 0,
      filename: `Reporte-Evento-${eventoSeleccionado.LugarEvento}-Banda-${bandaSelecionada.nombreBanda}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
      },
      jsPDF: { unit: "mm", format: "letter", orientation: "portrait" },
    };
    await html2pdf().set(opt).from(element).save();
    console.log("PDF generado correctamente");
  }
};

  return (
    <div className="">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pb-4">
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
        <button onClick={()=>generarPDF()}  className="border w-40 h-12 flex gap-2 justify-center items-center cursor-pointer">
          <span>Descargar</span> <ArrowDownTrayIcon className="h-6 w-6 text-white" />
        </button>
      </div>
      <div>
        <div  >
          {bandaSelecionada && (
            <div ref={hojaReferencia} className="conten-page">
              <section className="page-portada  page">
                <div className="page-portada__Titulos">
                  <h2 className="page-portada__titulo">{eventoSeleccionado?.LugarEvento.toUpperCase()}</h2>
                  <p className="page-portada__sub-titulo">{eventoSeleccionado?.fechaEvento}</p>
                </div>
                <div className="page-portada__detalles-banda">
                  <h3 className="page-portada__parrafo-detalle">{bandaSelecionada.nombreBanda}</h3>
                  <p className="page-portada__parrafo-detalle">{categoriaSelecionada?.nombreCategoria}</p>
                  <p className="page-portada__parrafo-detalle">{totalGeneral}%</p>
                </div>

                {}
              </section>
              <section className="page-body  page">
                <h3 className="titulo-rubrica">Resumen</h3>
                <div className="">
                  <p className="caja-total__titulo">Total: </p>
                  <span className="caja-total__total">{totalGeneral}%</span>
                </div>

                <div className="page_con">
                  {rubricasList.map((rubrica) => (
                    <div key={rubrica.idRubrica} className="page-body__resultados_fila  ">
                      <p className="resumen-rubrica__nombre">{rubrica.nombreRubrica}</p>
                      <span className="resumen-rubrica__puntos">
                        {puntosRubricas[rubrica.idRubrica]} / {rubrica.puntosRubrica < 0 ? 0 : rubrica.puntosRubrica}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
              <section className="">
                {rubricasList.map((rubrica) => (
                  <div key={rubrica.idRubrica} className="page-body page">
                    <h3 className="titulo-rubrica">
                      {puntosRubricas[rubrica.idRubrica]}% - {rubrica.nombreRubrica}
                    </h3>
                    <div>
                      {resultados.map((resultado) =>
                        resultado.idForaneaRubrica === rubrica.idRubrica ? (
                          <div key={resultado.idRegistroCumplimientoEvaluacion} className="page-body__criterios">
                            <span className="page-criterio__puntos">{resultado.puntosObtenidos}</span>
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
