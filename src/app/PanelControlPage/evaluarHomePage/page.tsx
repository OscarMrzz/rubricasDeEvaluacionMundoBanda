"use client";
import EvaluarBaseRubricaComponet from "@/component/EvaluarComponents/EvaluarBaseRubricaComponet";
import {
  bandaDatosAmpleosInterface,
  categoriaDatosAmpleosInterface,
  regionesDatosAmpleosInterface,
  registroEventoDatosAmpleosInterface,
  rubricaDatosAmpleosInterface,
} from "@/interfaces/interfaces";
import BandasServices from "@/lib/services/bandasServices";
import CategoriasServices from "@/lib/services/categoriaServices";
import RegionService from "@/lib/services/regionesServices";
import RegistroEventossServices from "@/lib/services/registroEventosServices";
import RubricasServices from "@/lib/services/rubricasServices";

import React, { useEffect, useCallback } from "react";

export default function EvaluarHomePage() {
  const [listaRegiones, setListaRegiones] = React.useState<
    regionesDatosAmpleosInterface[]
  >([]);
  const [listeventos, setListEventos] = React.useState<
    registroEventoDatosAmpleosInterface[]
  >([]);
  const [eventosOriginales, setEventosOriginales] = React.useState<
    registroEventoDatosAmpleosInterface[]
  >([]);
  const [listCategorias, setListCategorias] = React.useState<
    categoriaDatosAmpleosInterface[]
  >([]);
  const [listRubricas, setListRubricas] = React.useState<
    rubricaDatosAmpleosInterface[]
  >([]);
  const [listBandasOriginales, setListBandasOriginales] = React.useState<
    bandaDatosAmpleosInterface[]
  >([]);
  const [listBandas, setListBandas] = React.useState<
    bandaDatosAmpleosInterface[]
  >([]);

  const [regionSelecionada, setRegionSeleccionada] =
    React.useState<regionesDatosAmpleosInterface>();
  const [eventoSelecionado, setEventoSelecionado] =
    React.useState<registroEventoDatosAmpleosInterface>();
  const [categoriaSelecionada, setCategoriaSelecionada] =
    React.useState<categoriaDatosAmpleosInterface>();
  const [rubricaSelecionada, setRubricaSelecionada] =
    React.useState<rubricaDatosAmpleosInterface>();
  const [bandaSelecionada, setBandaSelecionada] =
    React.useState<bandaDatosAmpleosInterface>();

  const cargarDatos = async () => {
    const regionesServices = new RegionService();
    const datosRegiones = await regionesServices.getDatosAmpleos();
    setListaRegiones(datosRegiones);

    const eventosServices = new RegistroEventossServices();
    const datosEventos = await eventosServices.getDatosAmpleos();
    setListEventos(datosEventos);
    setEventosOriginales(datosEventos); // Guardar datos originales

    const categoriasServices = new CategoriasServices();
    const datosCategorias = await categoriasServices.getDatosAmpleos();
    setListCategorias(datosCategorias);

    const rubricasServices = new RubricasServices();
    const datosRubricas = await rubricasServices.getDatosAmpleos();
    setListRubricas(datosRubricas);

    const bandasServices = new BandasServices();
    const datosBandas = await bandasServices.getDatosAmpleos();
    setListBandas(datosBandas);
    setListBandasOriginales(datosBandas); // Guardar datos originales de bandas
  };

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
    cargarDatos();
  }, []);

  useEffect(() => {
    filtrarEventosPorRegion();
  }, [filtrarEventosPorRegion]);

  return (
    <div>
      <section className="grid grid-cols-5 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
        <div className="w-full">
          <select
            className="border-2 w-full"
            name=""
            id=""
            value={regionSelecionada?.idRegion ?? ""}
            onChange={(evento) => {
              const selected = listaRegiones.find(
                (region) => region.idRegion === evento.target.value
              );
              setRegionSeleccionada(selected);
            }}
          >
            <option value="" className="text-gray-700" disabled>
              Region
            </option>
            {listaRegiones.map((evento) => {
              return (
                <option
                  className="text-gray-700"
                  key={evento.idRegion}
                  value={evento.idRegion}
                >
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
              const selected = listeventos.find(
                (ev) => ev.idEvento === evento.target.value
              );
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
                  <option
                    className="text-gray-700"
                    key={evento.idEvento}
                    value={evento.idEvento}
                  >
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
              const selected = listCategorias.find(
                (categoria) => categoria.idCategoria === evento.target.value
              );
              setCategoriaSelecionada(selected);
            }}
          >
            <option value="" disabled>
              Categorias
            </option>

            {listCategorias.map((categoria) => (
              <option
                className="text-gray-700"
                key={categoria.idCategoria}
                value={categoria.idCategoria}
              >
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
              const selected = listRubricas.find(
                (rubrica) => rubrica.idRubrica === evento.target.value
              );
              setRubricaSelecionada(selected);
            }}
          >
            <option value="" disabled>
              Rubrica
            </option>
            {listRubricas.map((rubrica) => (
              <option
                className="text-gray-700"
                key={rubrica.idRubrica}
                value={rubrica.idRubrica}
              >
                {rubrica.nombreRubrica}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            name=""
            id=""
            className="border-2 w-full"
            value={bandaSelecionada?.idBanda || ""}
            onChange={(evento) => {
              const selected = listBandas.find(
                (banda) => banda.idBanda === evento.target.value
              );
              setBandaSelecionada(selected);
            }}
          >
            {!categoriaSelecionada ? (
              <option value="" className="text-gray-700" disabled>
                Seleccione categoria...
              </option>
            ) : (
              <>
                <option value="" className="text-gray-700" disabled>
                  Banda
                </option>
                {listBandas.map((banda) => (
                  <option
                    className="text-gray-700"
                    key={banda.idBanda}
                    value={banda.idBanda}
                  >
                    {banda.nombreBanda}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>
      </section>
      <section>
        {eventoSelecionado &&
        regionSelecionada &&
        categoriaSelecionada &&
        rubricaSelecionada &&
        bandaSelecionada ? (
          <EvaluarBaseRubricaComponet
            eventoSelecionado={eventoSelecionado}
      
            categoriaSelecionada={categoriaSelecionada}
            rubricaSelecionada={rubricaSelecionada}
            bandaSelecionada={bandaSelecionada}
          />
        ) : null}
      </section>
    </div>
  );
}
