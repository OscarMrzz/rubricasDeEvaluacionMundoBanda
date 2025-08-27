"use client";

import { useEffect, useState } from "react";

import SkeletonTabla from "@/component/skeleton/SkeletonTabla/Page";
import React from "react";

import OverleyModalFormulario from "@/component/modales/OverleyModalFormulario/Page";

import { PlusIcon } from "@heroicons/react/16/solid";
import { rubricaDatosAmpleosInterface } from "@/interfaces/interfaces";
import RubricasServices from "@/lib/services/rubricasServices";
import FormularioAgregarRubricaComponent from "@/component/formularios/FormulariosRubricas/FormularioAgregarRubricaComponent/Page";
import TablaRubricasComponent from "@/component/Tablas/tablaRubricasComponent/Page";

export default function RubricaHomePage () {
  const [rubricas, setRubricas] = useState<rubricaDatosAmpleosInterface[]>([]);
  const [loading, setLoading] = useState(true);
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
      setLoading(false);
      console.log("✅ Rubricas obtenidas:");
      console.log(rubricasData);
    } catch (error) {
      console.error("❌ Error al obtener las Rubricas:", error);
      setLoading(false);
    }
  }

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
      <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold mb-4">Rubricas</h1>
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
        <TablaRubricasComponent
          rubricas={rubricas}
          onRefresh={traerDatosTabla}
        />
      )}
    </div>
  );
};


