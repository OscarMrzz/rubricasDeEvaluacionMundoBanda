"use client";

import { useEffect, useState } from "react";
import CategoriasServices from "@/lib/services/categoriaServices";
import { categoriaInterface } from "@/interfaces/interfaces";
import SkeletonTabla from "@/component/skeleton/SkeletonTabla/Page";
import React from "react";
import TablaCategoriasComponent from "@/component/tablaCategoriasComponent/Page";
import OverleyModalFormulario from "@/component/modales/OverleyModalFormulario/Page";
import FormularioAgregarCategoriaComponent from "@/component/formularios/FormulariosCategorias/FormularioAgregarCategoriaComponet/Page";
import { PlusIcon } from "@heroicons/react/16/solid";

const CategoriasHomePage = () => {
  const [categorias, setCategorias] = useState<categoriaInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [openFormularioAgregar, setOpenFormularioAgregar] = useState(false);

  const abrirFormularioAgregar = () => {
    setOpenFormularioAgregar(true);
  };
  const cerrarFormularioAgregar = () => {
    setOpenFormularioAgregar(false);
  };

  // Cargar datos al iniciar el componente

  useEffect(() => {
    traerDatosTabla();
  }, []);

  async function traerDatosTabla() {
    const categoriasServices = new CategoriasServices();
    try {
      const categoriasData: categoriaInterface[] =
        await categoriasServices.get();
      setCategorias(categoriasData);
      setLoading(false);
      console.log("✅ Categorías obtenidas:");
      console.log(categoriasData);
    } catch (error) {
      console.error("❌ Error al obtener las categorías:", error);
      setLoading(false);
    }
  }

  return (
    
    <div className="px-20">
      <OverleyModalFormulario 
        open={openFormularioAgregar}
        onClose={cerrarFormularioAgregar}
      >
        <FormularioAgregarCategoriaComponent 
          refresacar={traerDatosTabla} 
          onClose={cerrarFormularioAgregar} 
        />
      </OverleyModalFormulario>

      

      <div>
      <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold mb-4">Categorías</h1>
               <button
          className="cursor-pointer flex justify-center items-center gap-2"
          onClick={abrirFormularioAgregar}
        >
          <PlusIcon className="w-5 h-5 bg-blue-600  rounded-2xl" />
          Agregar
        </button>
        </div>
      
      </div>
      {loading ? (
        <SkeletonTabla />
      ) : (
        <TablaCategoriasComponent
          categorias={categorias}
          onRefresh={traerDatosTabla}
        />
      )}
    </div>
  );
};

export default CategoriasHomePage;
