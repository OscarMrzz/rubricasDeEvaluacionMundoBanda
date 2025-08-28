"use client";

import { use, useEffect, useState } from "react";
import SkeletonTabla from "@/component/skeleton/SkeletonTabla/Page";
import React from "react";
import OverleyModalFormulario from "@/component/modales/OverleyModalFormulario/Page";
import { PlusIcon } from "@heroicons/react/16/solid";
import {

  criterioEvaluacionDatosAmpleosInterface,
  rubricaDatosAmpleosInterface,
} from "@/interfaces/interfaces";

import FormularioAgregarCriterioComponet from "@/component/formularios/FormularioCriterio/FormularioAgregarCriterioComponent/FormularioAgregarCriterioComponet";

import CriteriosServices from "@/lib/services/criteriosServices";
import TablaCriteriosComponent from "../Tablas/TablaCriteriosComponet/TablaCriteriosComponet";


type Props = {
  rubrica: rubricaDatosAmpleosInterface;
  


};

export default function CriteriosComponent( {rubrica}: Props) {
  const [criterios, setCriterios] = useState<criterioEvaluacionDatosAmpleosInterface[]>([]);
  const [sumaCriterios, setSumaCriterios] = useState<number>(0);
  const [criteriosOriginales, setCriterioscasOriginales] =  useState<criterioEvaluacionDatosAmpleosInterface[]>([]);
  const [loading, setLoading] = useState(true);

 
 
  const  [idrubricaSeleccionada, setIdRubricaSeleccionada] = useState<string>("");
  const [openFormularioAgregar, setOpenFormularioAgregar] = useState(false);
   useEffect(() => {
    setIdRubricaSeleccionada(rubrica.idRubrica);
    traerDatosTabla();
  }, []);

  useEffect(() => {
    sumarCriterios();
  }, [criterios]);

  const abrirFormularioAgregar = () => {
    setOpenFormularioAgregar(true);
  };
  const cerrarFormularioAgregar = () => {
    setOpenFormularioAgregar(false);
  };

 

  async function traerDatosTabla() {
    const criteriosServices = new CriteriosServices();
    try {
      const criteriosData: criterioEvaluacionDatosAmpleosInterface[] = await criteriosServices.getDatosAmpleos();

 
      const criteriosFiltrados = criteriosData.filter(
        (criterio) => criterio.idForaneaRubrica === rubrica.idRubrica
      );
      setCriterios(criteriosFiltrados);
  
      setCriterioscasOriginales(criteriosData);
      setLoading(false);
  
    } catch (error) {
      console.error("❌ Error al obtener las Criterio:", error);
      setLoading(false);
    } 
  }


  useEffect(() => {

     cargarTablaFiltrada();
  }, []);


 



  const cargarTablaFiltrada = () => {
    let datosFiltrados = [...criteriosOriginales];

    if (idrubricaSeleccionada) {
      datosFiltrados = datosFiltrados.filter(
        (item) => item.idForaneaRubrica === idrubricaSeleccionada
      );
    }

    setCriterios(datosFiltrados);
  };

  const sumarCriterios = () => {
  const suma = criterios.reduce((total, criterio) => total + criterio.puntosCriterio, 0);
  setSumaCriterios(suma);
  };

 



  return (
    <div className="px-20">
      <OverleyModalFormulario
        open={openFormularioAgregar}
        onClose={cerrarFormularioAgregar}
      >
        <FormularioAgregarCriterioComponet
          rubrica={rubrica}
          refresacar={traerDatosTabla}
          onClose={cerrarFormularioAgregar}
        />
      </OverleyModalFormulario>

      <div>
        <div>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold mb-4">Criterios</h1> 
           <div className="flex gap-4">
            <span>Cantidad: {criterios.length}</span>
            <span>Suma: {sumaCriterios} %</span>
           </div>
          </div>
          <div className="flex justify-between mb-4">
        
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
        <TablaCriteriosComponent
          Criterios={criterios}
          onRefresh={traerDatosTabla}
        />
      )}
    </div>
  );
}
