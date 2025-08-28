"use client";

import { useEffect, useState } from "react";
import SkeletonTabla from "@/component/skeleton/SkeletonTabla/Page";
import React from "react";
import OverleyModalFormulario from "@/component/modales/OverleyModalFormulario/Page";
import { PlusIcon } from "@heroicons/react/16/solid";
import {
  categoriaInterface,
  rubricaDatosAmpleosInterface,
} from "@/interfaces/interfaces";
import RubricasServices from "@/lib/services/rubricasServices";

import FormularioAgregarRubricaComponent from "@/component/formularios/FormulariosRubricas/FormularioAgregarRubricaComponent/Page";
import TablaRubricasComponent from "@/component/Tablas/tablaRubricasComponent/Page";
import CategoriasServices from "@/lib/services/categoriaServices";

export default function RubricaHomePage() {
  const [rubricas, setRubricas] = useState<rubricaDatosAmpleosInterface[]>([]);
  const [rubricasOriginales, setRubricasOriginales] = useState<
    rubricaDatosAmpleosInterface[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [cargandoFiltros, setCargadoFiltros] = useState(false);
  const [categoriasLista, setCategoriasLista] = useState<categoriaInterface[]>(
    []
  );
  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState<string>("");
  const [openFormularioAgregar, setOpenFormularioAgregar] = useState(false);

  const abrirFormularioAgregar = () => {
    setOpenFormularioAgregar(true);
  };
  const cerrarFormularioAgregar = () => {
    setOpenFormularioAgregar(false);
  };

  useEffect(() => {
    traerDatosTabla();
  }, []);

  async function traerDatosTabla() {
    const rubricasServices = new RubricasServices();
    try {
      const rubricasData: rubricaDatosAmpleosInterface[] =
        await rubricasServices.getDatosAmpleos();
      setRubricas(rubricasData);
      setRubricasOriginales(rubricasData);
      setLoading(false);
      console.log("✅ Rubricas obtenidas:");
      console.log(rubricasData);
    } catch (error) {
      console.error("❌ Error al obtener las Rubricas:", error);
      setLoading(false);
    } finally {
      setCargadoFiltros(true);
    }
  }

  const cargarFiltros = async () => {
    const categoriasServices = new CategoriasServices();
    try {
      const categoriasData = await categoriasServices.get();
      setCategoriasLista(categoriasData);

    } catch (error) {
      console.error("❌ Error al obtener las Categorias:", error);
    }
  };

  useEffect(() => {
    cargarFiltros();
  }, []);

  const seleccionarCategoria = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const categoriaId = event.target.value;
    setCategoriaSeleccionada(categoriaId);
    filtrarRubricasPorCategoria(categoriaId);
  };

  const filtrarRubricasPorCategoria = (categoriaId: string) => {
    if (categoriaId === "") {
      setRubricas(rubricasOriginales);
    } else {
     
      const rubricasFiltradas = rubricasOriginales.filter(
        (rubrica) => rubrica.idForaneaCategoria === categoriaId
      );
      setRubricas(rubricasFiltradas);
    }
  };

  return (
    <div className="px-20">
      <OverleyModalFormulario
        open={openFormularioAgregar}
        onClose={cerrarFormularioAgregar}
      >
        <FormularioAgregarRubricaComponent
          refresacar={traerDatosTabla}
          onClose={cerrarFormularioAgregar}
        />
      </OverleyModalFormulario>

      <div>
        <div>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold mb-4">Rubricas</h1>
          </div>
          <div className="flex justify-between mb-4">
            <select
              className=" w-40 h-6 bg-red-500 border-0"
              name=""
              id=""
              value={categoriaSeleccionada}
              onChange={seleccionarCategoria}
            >
              <option className="bg-white text-gray-300" value="">
                Todas las categorias
              </option>
              {cargandoFiltros &&
                categoriasLista.map((categoria) => (
                  <option
                    className="bg-white text-gray-800"
                    key={categoria.idCategoria}
                    value={categoria.idCategoria}
                  >
                    {categoria.nombreCategoria}
                  </option>
                ))}
            </select>
            <button
              className="cursor-pointer flex justify-center items-center gap-2"
              onClick={abrirFormularioAgregar}
            >
              <PlusIcon className="w-5 h-5 bg-blue-600  rounded-2xl" />
              Agregar
            </button>
          </div>
        </div>
      </div>
      {loading ? (
        <SkeletonTabla />
      ) : (
        <TablaRubricasComponent
          rubricas={rubricas}
          onRefresh={traerDatosTabla}
        />
      )}
    </div>
  );
}
