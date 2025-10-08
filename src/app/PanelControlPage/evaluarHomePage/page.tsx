"use client";
import EvaluarBaseRubricaComponet from "@/component/EvaluarComponents/EvaluarBaseRubricaComponet";
import ApprovateMessage from "@/component/Message/ApprovateMessage";
import LoadingMessage1 from "@/component/Message/LoadingMessage1";
import {
  bandaInterface,
  bandaDatosAmpleosInterface,
  categoriaDatosAmpleosInterface,
  regionesDatosAmpleosInterface,
  registroCumplimientoEvaluacionDatosAmpleosInterface,
  registroEventoDatosAmpleosInterface,
  rubricaDatosAmpleosInterface,
} from "@/interfaces/interfaces";
import BandasServices from "@/lib/services/bandasServices";
import CategoriasServices from "@/lib/services/categoriaServices";
import RegionService from "@/lib/services/regionesServices";
import registroCumplimintoServices from "@/lib/services/registroCumplimientoServices";
import RegistroEventossServices from "@/lib/services/registroEventosServices";
import RubricasServices from "@/lib/services/rubricasServices";

import React, { useEffect, useCallback, use, useRef, useState } from "react";

export default function EvaluarHomePage() {
  const [listaRegiones, setListaRegiones] = React.useState<regionesDatosAmpleosInterface[]>([]);
  const [listeventos, setListEventos] = React.useState<registroEventoDatosAmpleosInterface[]>([]);
  const [eventosOriginales, setEventosOriginales] = React.useState<registroEventoDatosAmpleosInterface[]>([]);
  const [listCategorias, setListCategorias] = React.useState<categoriaDatosAmpleosInterface[]>([]);
  const [listRubricas, setListRubricas] = React.useState<rubricaDatosAmpleosInterface[]>([]);
  const [seCargoListaRubicas, setSeCargoListaRubricas] = React.useState<boolean>(false);

  const [listBandasOriginales, setListBandasOriginales] = React.useState<bandaDatosAmpleosInterface[]>([]);
  const [listBandas, setListBandas] = React.useState<bandaDatosAmpleosInterface[]>([]);
  const [listBandasNoEvaluadas, setListBandasNoEvaluadas] = React.useState<bandaInterface[]>([]);
    const [ActivadorApprovateMessage, setActivadorApprovateMessage] = useState(false);
    const [ActivadorLoadingMessage, setActivadorLoadingMessage] = useState(false);

  const [regionSelecionada, setRegionSeleccionada] = React.useState<regionesDatosAmpleosInterface>();
  const [eventoSelecionado, setEventoSelecionado] = React.useState<registroEventoDatosAmpleosInterface>();
  const [categoriaSelecionada, setCategoriaSelecionada] = React.useState<categoriaDatosAmpleosInterface>();
  const [rubricaSelecionada, setRubricaSelecionada] = React.useState<rubricaDatosAmpleosInterface>();
  const [bandaSelecionada, setBandaSelecionada] = React.useState<bandaInterface>();
  const [yaseFiltraronBandas, setYaseFiltraronBandas] = React.useState<boolean>(false);

  const regionesServices = useRef(new RegionService());
  const eventosServices = useRef(new RegistroEventossServices());
  const categoriasServices = useRef(new CategoriasServices());
  const rubricasServices = useRef(new RubricasServices());
  const bandasServices = useRef(new BandasServices());
  const registroCumplimientoEvaluadosServices = useRef(new registroCumplimintoServices());

  const obtenerBandasYaEvaluadas = async (idEvento: string, idRubrica: string) => {
    const bandasUnicasList: bandaInterface[] = [];
    if (idEvento && idRubrica) {
      const datosPorRubircaYEvento = await registroCumplimientoEvaluadosServices.current.getPorRubricaYEvento(
        idRubrica,
        idEvento
      );

      const bandasUnicas: { [key: string]: bandaInterface } = {};

      for (const registro of datosPorRubircaYEvento) {
        if (!bandasUnicas[registro.bandas.idBanda]) {
          bandasUnicas[registro.bandas.idBanda] = registro.bandas;
          bandasUnicasList.push(registro.bandas);
        }
      }
    }
    return bandasUnicasList;
  };

  const ObtenerBandasNoEvaluadas = async (idEvento: string, idRubrica: string) => {
    const bandasYaEvaluadas = await obtenerBandasYaEvaluadas(idEvento, idRubrica);
    const bandasNoevaluadas = listBandas.filter(
      (banda) => !bandasYaEvaluadas.some((evaluada) => evaluada.idBanda === banda.idBanda)
    );
    return bandasNoevaluadas as bandaInterface[];
  };
  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    const datosRegiones = await regionesServices.current.getDatosAmpleos();
    setListaRegiones(datosRegiones);

    const datosEventos = await eventosServices.current.getDatosAmpleos();
    setListEventos(datosEventos);
    setEventosOriginales(datosEventos); // Guardar datos originales

    const datosCategorias = await categoriasServices.current.getDatosAmpleos();
    setListCategorias(datosCategorias);

 

    const datosBandas = await bandasServices.current.getDatosAmpleos();
    setListBandas(datosBandas);
    setListBandasOriginales(datosBandas); // Guardar datos originales de bandas
  };
  useEffect(() => {
    const cargarRubricas = async () => {
    if(categoriaSelecionada){
       const datosRubricas = await rubricasServices.current.getPorCategoria(categoriaSelecionada.idCategoria);
    setListRubricas(datosRubricas);
    setSeCargoListaRubricas(true);
    }
  }
  cargarRubricas();
  
  },[categoriaSelecionada]);

  useEffect(() => {
    setYaseFiltraronBandas(false);
    setBandaSelecionada(undefined);
    const cargarBandasNoEvaluadas = async () => {
      if (eventoSelecionado && rubricaSelecionada) {
        const listaBandasNoEvaluadass: bandaInterface[] = await ObtenerBandasNoEvaluadas(
          eventoSelecionado.idEvento,
          rubricaSelecionada.idRubrica
        );
        setListBandasNoEvaluadas(listaBandasNoEvaluadass);
        setYaseFiltraronBandas(true);
      }
    };
    cargarBandasNoEvaluadas();
  }, [eventoSelecionado, rubricaSelecionada]);

  const filtrarEventosPorRegion = useCallback(() => {
    if (regionSelecionada) {
      // Filtrar siempre desde los datos originales
      const datosFiltrados = eventosOriginales.filter(
        (evento) => evento.idForaneaRegion === regionSelecionada.idRegion
      );
      setListEventos(datosFiltrados);
    } else {
      // Si no hay región seleccionada, mostrar todos los eventos
      setListEventos(eventosOriginales);
    }
  }, [regionSelecionada, eventosOriginales]);

  const filtrarBandasPorCategoria = useCallback(() => {
    if (categoriaSelecionada) {
      const datosFiltrados = listBandasOriginales.filter(
        (banda) => banda.idForaneaCategoria === categoriaSelecionada.idCategoria
      );
      setListBandas(datosFiltrados);
    } else {
      // Si no hay categoría seleccionada, mostrar todas las bandas
      setListBandas(listBandasOriginales);
    }
  }, [categoriaSelecionada, listBandasOriginales]);

  useEffect(() => {
    filtrarBandasPorCategoria();
  }, [filtrarBandasPorCategoria]);

  useEffect(() => {
    filtrarEventosPorRegion();
  }, [filtrarEventosPorRegion]);

  const recetiar = () => {
    setActivadorLoadingMessage(false)
    setActivadorApprovateMessage(true)
    setRubricaSelecionada(undefined);
    setBandaSelecionada(undefined);
    setYaseFiltraronBandas(false);

  };

  const revisarEvluacion = () => {
    setActivadorLoadingMessage(true)
  }
 

  return (
    <div>
        <ApprovateMessage
            open={ActivadorApprovateMessage}
            onClose={()=>{setActivadorApprovateMessage(false)}}
            titulo={"Exito"}
            texto={"Evaluacion guardada con exito"}
            
            />
        <LoadingMessage1
            open={ActivadorLoadingMessage}
            onClose={()=>{setActivadorLoadingMessage(false)}}
            titulo={"Procesando"}
            texto={"Revisando rubrica y subiendo al servidor..."}
            
            />
      <section className="grid grid-cols-5 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
        <div className="w-full">
          <select
            className="border-2 w-full"
            name=""
            id=""
            value={regionSelecionada?.idRegion ?? ""}
            onChange={(evento) => {
              const selected = listaRegiones.find((region) => region.idRegion === evento.target.value);
              setRegionSeleccionada(selected);
            }}
          >
            <option value="" className="text-gray-700" disabled>
              Region
            </option>
            {listaRegiones.map((evento) => {
              return (
                <option className="text-gray-700" key={evento.idRegion} value={evento.idRegion}>
                  {evento.nombreRegion}
                </option>
              );
            })}
          </select>
        </div>

        <div className="w-full">
          <select
            className="border-2 w-full"
            name=""
            id=""
            value={eventoSelecionado?.idEvento || ""}
            onChange={(evento) => {
              const selected = listeventos.find((ev) => ev.idEvento === evento.target.value);
              setEventoSelecionado(selected);
            }}
          >
            {!regionSelecionada ? (
              <option value="" className="text-gray-700" disabled>
                Seleccione region...
              </option>
            ) : (
              <>
                <option value="" className="text-gray-700" disabled>
                  Evento
                </option>
                {listeventos.map((evento) => (
                  <option className="text-gray-700" key={evento.idEvento} value={evento.idEvento}>
                    {evento.LugarEvento}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>

        <div>
          <select
            name=""
            id=""
            className="border-2 w-full"
            value={categoriaSelecionada?.idCategoria || ""}
            onChange={(evento) => {
              const selected = listCategorias.find((categoria) => categoria.idCategoria === evento.target.value);
              setCategoriaSelecionada(selected);
            }}
          >
            <option value="" disabled>
              Categorias
            </option>

            {listCategorias.map((categoria) => (
              <option className="text-gray-700" key={categoria.idCategoria} value={categoria.idCategoria}>
                {categoria.nombreCategoria}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            name=""
            id=""
            className="border-2 w-full"
            value={rubricaSelecionada?.idRubrica || ""}
            onChange={(evento) => {
              const selected = listRubricas.find((rubrica) => rubrica.idRubrica === evento.target.value);
              setRubricaSelecionada(selected);
            }}
          >
            {
              categoriaSelecionada ? (<>
                {seCargoListaRubicas ? (
              <>  
              <option value="" disabled>
              Rubrica
            </option>
            {listRubricas.map((rubrica) => (
              <option className="text-gray-700" key={rubrica.idRubrica} value={rubrica.idRubrica}>
                {rubrica.nombreRubrica}
              </option>
            ))}</>):(
                  <option value="" disabled>
              cargando...
            </option>
            )}

              
              </>):(
                     <option value="" disabled>
              Rubricas...
            </option>
              )
            }
          
          
          </select>
        </div>

        <div>
          <select
            name=""
            id=""
            className="border-2 w-full"
            value={bandaSelecionada?.idBanda || ""}
            onChange={(evento) => {
              const selected = listBandasNoEvaluadas.find((banda) => banda.idBanda === evento.target.value);
              setBandaSelecionada(selected);
            }}
          >
            {!categoriaSelecionada ? (
              <option value="" className="text-gray-700" disabled>
                Bandas...
              </option>
            ) : ( yaseFiltraronBandas ?
              <>
                <option value="" className="text-gray-700" disabled>
                  Banda
                </option>
                {listBandasNoEvaluadas.map((banda) => (
                  <option className="text-gray-700" key={banda.idBanda} value={banda.idBanda}>
                    {banda.nombreBanda}
                  </option>
                ))}
              </>: <option value="" className="text-gray-700" disabled>
                  cargando...
                </option>

            )}
          </select>
        </div>
      </section>
      <section>
        {eventoSelecionado && regionSelecionada && categoriaSelecionada && rubricaSelecionada && bandaSelecionada ? (
          <EvaluarBaseRubricaComponet
            eventoSelecionado={eventoSelecionado}
            regionSelecionada={regionSelecionada}
            categoriaSelecionada={categoriaSelecionada}
            rubricaSelecionada={rubricaSelecionada}
            bandaSelecionada={bandaSelecionada}
            recetiar={recetiar}
            revisandoEvluacion={revisarEvluacion}
          />
        ) : null}
      </section>
    </div>
  );
}
