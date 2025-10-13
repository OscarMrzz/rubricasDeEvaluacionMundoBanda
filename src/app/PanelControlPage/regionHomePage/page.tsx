"use client";

import RegionService from "@/lib/services/regionesServices";
import { useEffect, useState } from "react";
import { regionesDatosAmpleosInterface } from "@/interfaces/interfaces";
import SkeletonTabla from "@/component/skeleton/SkeletonTabla/Page";

import React from "react";
import TablaRegiones from "@/component/tablaRegions/Page";
import { PlusIcon } from "@heroicons/react/16/solid";
import OverleyModalFormulario from "@/component/modales/OverleyModalFormulario/Page";
import FormularioAgregarRegionComponent from "@/component/formularios/FormularioRegiones/FormularioAgregarRegion/Page";

const RegionHomePage = () => {
  // 1. Estado para guardar las regiones
  const [regiones, setRegiones] = useState<regionesDatosAmpleosInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [openFormularioAgregar, setOpenFormularioAgregar] = useState(false);

  useEffect(() => {
    traerDatosTabla();
  }, []);

  async function traerDatosTabla() {
    const regionService = new RegionService();
    try {
      const regionesData: regionesDatosAmpleosInterface[] =
        await regionService.get(); 
      setRegiones(regionesData);
      setLoading(false);
    
    } catch (error) {
      console.error("❌ Error al obtener las regiones:", error);
      setLoading(false);
    }
  }
  const abrirFormularioAgregar = () => {
    setOpenFormularioAgregar(true);
  };

  const cerrarFormularioAgregar = () => {
    setOpenFormularioAgregar(false);
  };

  return (
    <div className="px-20">
      <OverleyModalFormulario
        open={openFormularioAgregar}
        onClose={cerrarFormularioAgregar}
      >
        <FormularioAgregarRegionComponent
          onClose={cerrarFormularioAgregar}
          refresacar={traerDatosTabla}
        />
      </OverleyModalFormulario>
      
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4 ">Regiones</h1>
        <button
          className="cursor-pointer flex justify-center items-center gap-2"
          onClick={abrirFormularioAgregar}
        >
          <PlusIcon className="w-5 h-5 bg-blue-600  rounded-2xl" />
          Agregar
        </button>
      </div>
      {loading ? (
        <SkeletonTabla />
      ) : (
        <TablaRegiones regiones={regiones} onRefresh={traerDatosTabla} />
      )}
    </div>
  );
};

export default RegionHomePage;
