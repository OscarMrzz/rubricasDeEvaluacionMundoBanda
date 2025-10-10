"use client";
import EvaluarBaseRubricaComponet from "@/component/EvaluarComponents/EvaluarBaseRubricaComponet";
import ApprovateMessage from "@/component/Message/ApprovateMessage";
import LoadingMessage1 from "@/component/Message/LoadingMessage1";
import {
  bandaInterface,

  regionesInterface,
  RegistroEventoInterface,
  categoriaInterface,
  rubricaInterface,
} from "@/interfaces/interfaces";

import RegistroCumplimientoServices from "@/lib/services/RegistroComentariosServices";

import { useBandasStore } from "@/Store/BandasStore/listBandaStore";
import { useCategoriasStore } from "@/Store/CategoriasStore/listCategoriaStore";
import { useEventosStore } from "@/Store/EventosStore/listEventosStore";
import { useRegionesStore } from "@/Store/listRegionesStore";
import { useRubicasStore } from "@/Store/RubricasStore/listRubicasStore";
//hola
import React, { useEffect, useCallback,  useRef, useState, use } from "react";

export default function EvaluarHomePage() {
  const [listaRegiones, setListaRegiones] = React.useState<regionesInterface[]>([]);
  const [listeventos, setListEventos] = React.useState<RegistroEventoInterface[]>([]);
  const [eventosOriginales, setEventosOriginales] = React.useState<RegistroEventoInterface[]>([]);
  const [listCategorias, setListCategorias] = React.useState<categoriaInterface[]>([]);
  const [listRubricas, setListRubricas] = React.useState<rubricaInterface[]>([]);
  const [seCargoListaRubicas, setSeCargoListaRubricas] = React.useState<boolean>(false);

  const [listBandasOriginales, setListBandasOriginales] = React.useState<bandaInterface[]>([]);
  const [listBandas, setListBandas] = React.useState<bandaInterface[]>([]);
  const [listBandasNoEvaluadas, setListBandasNoEvaluadas] = React.useState<bandaInterface[]>([]);
  const [ActivadorApprovateMessage, setActivadorApprovateMessage] = useState(false);
  const [ActivadorLoadingMessage, setActivadorLoadingMessage] = useState(false);

  const [regionSelecionada, setRegionSeleccionada] = React.useState<regionesInterface>();
  const [eventoSelecionado, setEventoSelecionado] = React.useState<RegistroEventoInterface>();
  const [categoriaSelecionada, setCategoriaSelecionada] = React.useState<categoriaInterface>();
  const [rubricaSelecionada, setRubricaSelecionada] = React.useState<rubricaInterface>();
  const [bandaSelecionada, setBandaSelecionada] = React.useState<bandaInterface>();
  const [yaseFiltraronBandas, setYaseFiltraronBandas] = React.useState<boolean>(false);





 
  const registroCumplimientoEvaluadosServices = useRef(new RegistroCumplimientoServices());

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
      (banda:bandaInterface) => !bandasYaEvaluadas.some((evaluada) => evaluada.idBanda === banda.idBanda)
    );
    return bandasNoevaluadas as bandaInterface[];
  };
  
  //Aqui vamos a trabajar

  const {listRegionesStore} = useRegionesStore();
  const {listEventosStore} = useEventosStore();
  const {listCategoriasStore} = useCategoriasStore();
  const {listRubicasStore} = useRubicasStore();
  const {listBandasStore} = useBandasStore();


  useEffect(() => {
    if (listRegionesStore.length > 0) {
      setListaRegiones(listRegionesStore);
    }
  }, [listRegionesStore]);


  useEffect(() => {
    if (listEventosStore.length > 0) {
      setListEventos([]);
      setEventosOriginales(listEventosStore); 
    }

  }, [listEventosStore]);

  useEffect(() => {
  if (regionSelecionada) {
    
    setEventoSelecionado(undefined); 
      const datosFiltrados = eventosOriginales.filter(
        (evento) => evento.idForaneaRegion === regionSelecionada.idRegion
      );
      setListEventos(datosFiltrados);
    } else {

      setListEventos(eventosOriginales);
    }


  }, [regionSelecionada, eventosOriginales]);




  useEffect(() => {
    if (listCategoriasStore.length > 0) {
      setListCategorias(listCategoriasStore);
    }

  }, [listCategoriasStore]);

  useEffect(() => {
    if (listRubicasStore.length > 0) {
      setListRubricas(listRubicasStore);
      setSeCargoListaRubricas(true);
    }

  }, [listRubicasStore]);

  useEffect(() => {
    if (listBandasStore.length > 0) {
      setListBandas([]);
      setListBandasOriginales(listBandasStore); // Guardar datos originales de bandas
    }
  }, [listBandasStore]);




 

  useEffect(() => {
   
      if (categoriaSelecionada) {
        const datosRubricas = listRubicasStore.filter(
          (rubrica: rubricaInterface ) => rubrica.idForaneaCategoria === categoriaSelecionada.idCategoria
        );
        setListRubricas(datosRubricas);
        setSeCargoListaRubricas(true);
      }
  }, [categoriaSelecionada]);

  useEffect(() => {
    setYaseFiltraronBandas(false);
    setBandaSelecionada(undefined);
    const cargarBandasNoEvaluadas = async () => {
      if (eventoSelecionado && rubricaSelecionada) {
        setListBandasNoEvaluadas([]); // Limpiar la lista antes de cargar nuevas bandas
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
    setActivadorLoadingMessage(false);
    setActivadorApprovateMessage(true);
    setRubricaSelecionada(undefined);
    setBandaSelecionada(undefined);
    setYaseFiltraronBandas(false);
  };

  const revisarEvluacion = () => {
    setActivadorLoadingMessage(true);
  };

  return (
    <div>
      <ApprovateMessage
        open={ActivadorApprovateMessage}
        onClose={() => {
          setActivadorApprovateMessage(false);
        }}
        titulo={"Exito"}
        texto={"Evaluacion guardada con exito"}
      />
      <LoadingMessage1
        open={ActivadorLoadingMessage}
        onClose={() => {
          setActivadorLoadingMessage(false);
        }}
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
              const selected = listaRegiones.find((region:regionesInterface) => region.idRegion === evento.target.value);
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
            {categoriaSelecionada ? (
              <>
                {seCargoListaRubicas ? (
                  <>
                    <option value="" disabled>
                      Rubrica
                    </option>
                    {listRubricas.map((rubrica) => (
                      <option className="text-gray-700" key={rubrica.idRubrica} value={rubrica.idRubrica}>
                        {rubrica.nombreRubrica}
                      </option>
                    ))}
                  </>
                ) : (
                  <option value="" disabled>
                    cargando...
                  </option>
                )}
              </>
            ) : (
              <option value="" disabled>
                Rubricas...
              </option>
            )}
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
            ) : yaseFiltraronBandas ? (
              <>
                <option value="" className="text-gray-700" disabled>
                  Banda
                </option>
                {listBandasNoEvaluadas.map((banda) => (
                  <option className="text-gray-700" key={banda.idBanda} value={banda.idBanda}>
                    {banda.nombreBanda}
                  </option>
                ))}
              </>
            ) : (
              <option value="" className="text-gray-700" disabled>
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
