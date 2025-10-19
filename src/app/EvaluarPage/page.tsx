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

import { useRubicasStore } from "@/Store/RubricasStore/listRubicasStore";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/16/solid";

//hola
import React, { useEffect, useCallback, useRef, useState, use } from "react";

import { uselistaEventosFiltro } from "@/hooks/useListaEventosFiltro";
import { useListaCategoriaFiltro } from "@/hooks/useListaCategoriasFiltro";

type campos =  "evento" | "categoria" | "rubrica" | "banda" | "inicio"|"evaluar" |"";

export default function EvaluarHomePage() {



  


  const [listRubricas, setListRubricas] = React.useState<rubricaInterface[]>([]);
  const [seCargoListaRubicas, setSeCargoListaRubricas] = React.useState<boolean>(false);

  const [listBandasOriginales, setListBandasOriginales] = React.useState<bandaInterface[]>([]);
  const [listBandas, setListBandas] = React.useState<bandaInterface[]>([]);
  const [listBandasNoEvaluadas, setListBandasNoEvaluadas] = React.useState<bandaInterface[]>([]);
  const [ActivadorApprovateMessage, setActivadorApprovateMessage] = useState(false);
  const [ActivadorLoadingMessage, setActivadorLoadingMessage] = useState(false);




  const [rubricaSelecionada, setRubricaSelecionada] = React.useState<rubricaInterface>();
  const [bandaSelecionada, setBandaSelecionada] = React.useState<bandaInterface>();
  const [yaseFiltraronBandas, setYaseFiltraronBandas] = React.useState<boolean>(false);
  const [campoSeleccionadoActual, setCampoSeleccionadoActual] = React.useState<campos>("");
  const [campoSelecionadoAnterior, setCampoSelecionadoAnterior] = React.useState<campos>("");

  const registroCumplimientoEvaluadosServices = useRef(new RegistroCumplimientoServices());

  /* CUSTON */

  const { eventosList, cargandoEventos, eventoSeleccionado, setEventoSeleccionado  } = uselistaEventosFiltro();
  const {categoriasList, cargandoCategorias,categoriaSelecionada, setcategoriaSelecionada} = useListaCategoriaFiltro();

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
      (banda: bandaInterface) => !bandasYaEvaluadas.some((evaluada) => evaluada.idBanda === banda.idBanda)
    );
    return bandasNoevaluadas as bandaInterface[];
  };

  //Aqui vamos a trabajar



  const { listRubicasStore } = useRubicasStore();
  const { listBandasStore } = useBandasStore();








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
        (rubrica: rubricaInterface) => rubrica.idForaneaCategoria === categoriaSelecionada.idCategoria
      );
      setListRubricas(datosRubricas);
      setSeCargoListaRubricas(true);
    }
  }, [categoriaSelecionada]);

  useEffect(() => {
    setYaseFiltraronBandas(false);
    setBandaSelecionada(undefined);
    const cargarBandasNoEvaluadas = async () => {
      if (eventoSeleccionado && rubricaSelecionada) {
        setListBandasNoEvaluadas([]); // Limpiar la lista antes de cargar nuevas bandas
        const listaBandasNoEvaluadass: bandaInterface[] = await ObtenerBandasNoEvaluadas(
          eventoSeleccionado.idEvento,
          rubricaSelecionada.idRubrica
        );
        setListBandasNoEvaluadas(listaBandasNoEvaluadass);
        setYaseFiltraronBandas(true);
      }
    };
    cargarBandasNoEvaluadas();
  }, [eventoSeleccionado, rubricaSelecionada]);



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

  const onclickIniciar = () => {
    setCampoSeleccionadoActual("evento");

  }


  const selecionarEvento = (idEvento: string) => {
    const eventoSeleccionado = eventosList.find((evento) => evento.idEvento === idEvento);
    setEventoSeleccionado(eventoSeleccionado);
    setCampoSeleccionadoActual("categoria");
    setCampoSelecionadoAnterior("evento");
  };
  const selecionarCategoria = (idCategoria: string) => {
    const categoriaSeleccionada = categoriasList?.find((categoria) => categoria.idCategoria === idCategoria);
    setcategoriaSelecionada(categoriaSeleccionada);
    setCampoSeleccionadoActual("rubrica");
    setCampoSelecionadoAnterior("categoria");
  };
  const selecionarRubrica = (idRubrica: string) => {
    const rubricaSeleccionada = listRubricas.find((rubrica) => rubrica.idRubrica === idRubrica);
    setRubricaSelecionada(rubricaSeleccionada);
    setCampoSeleccionadoActual("banda");
    setCampoSelecionadoAnterior("rubrica");
  };
  const selecionarBanda = (idBanda: string) => {
    const bandaSeleccionada = listBandasNoEvaluadas.find((banda) => banda.idBanda === idBanda);
    setBandaSelecionada(bandaSeleccionada);
     setCampoSeleccionadoActual("evaluar");
    setCampoSelecionadoAnterior("banda");
  };

  return (
    <div className="h-full pt-25 pb-10">
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
     
        {
campoSeleccionadoActual !=="evaluar" && 
<section className=" flex w-full h-full justify-center pt-45">
        { campoSeleccionadoActual==="" &&  <div>
          <button onClick={()=>onclickIniciar()} className="w-60 h-20 flex justify-center items-center px-8 py-4 bg-emerald-700 text-3xl font-bold rounded-2xl">
            <ClipboardDocumentCheckIcon className="h-8 w-8 text-white mr-2" />
            INICIAR
          </button>
        </div>}
      

 

{

    campoSeleccionadoActual==="evento" &&  <div className="w-60 ">
          <select
            className="border-2 w-full h-20 text-xl font-bold rounded-2xl bg-blue-400 text-blu-700 "
            name=""
            id=""
            value={eventoSeleccionado?.idEvento || ""}
            onChange={(evento) => {
              selecionarEvento(evento.target.value);
            }}
          >
            
                <option value="" className="text-gray-700" disabled>
                  Evento
                </option>
                {eventosList.map((evento) => (
                  <option className="text-gray-700" key={evento.idEvento} value={evento.idEvento}>
                    {evento.LugarEvento}
                  </option>
                ))}
            
            
          </select>
        </div>
}
        
        {
    campoSeleccionadoActual==="categoria" &&  
        <div className="w-60">
          <select
            name=""
            id=""
            className="border-2 w-full h-20 text-xl font-bold rounded-2xl bg-blue-400 text-blu-700 "
            value={categoriaSelecionada?.idCategoria || ""}
            onChange={(evento) => {
              selecionarCategoria(evento.target.value);
            }}
          >
            <option value="" disabled>
              Categorias
            </option>

            {categoriasList?.map((categoria) => (
              <option className="text-gray-700" key={categoria.idCategoria} value={categoria.idCategoria}>
                {categoria.nombreCategoria}
              </option>
            ))}
          </select>
        </div>
        }

        
{
    campoSeleccionadoActual==="rubrica" && <div className="w-60">
          <select
            name=""
            id=""
            className="border-2 w-full h-20 text-xl font-bold rounded-2xl bg-blue-400 text-blu-700 "
            value={rubricaSelecionada?.idRubrica || ""}
            onChange={(evento) => {
              selecionarRubrica(evento.target.value);
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

}

        {
    campoSeleccionadoActual==="banda" &&  
        <div className="w-60">
          <select
            name=""
            id=""
            className="border-2 w-full h-20 text-xl font-bold rounded-2xl bg-blue-400 text-blu-700 "
            value={bandaSelecionada?.idBanda || ""}
            onChange={(evento) => {
              const selected = listBandasNoEvaluadas.find((banda) => banda.idBanda === evento.target.value);
              selecionarBanda(selected?.idBanda || "");
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
        }

      </section>
        }
      

      <section>
        {eventoSeleccionado && categoriaSelecionada && rubricaSelecionada && bandaSelecionada ? (
          <EvaluarBaseRubricaComponet
            eventoSelecionado={eventoSeleccionado}
            idRegionSelecionada={eventoSeleccionado.idForaneaRegion}
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
