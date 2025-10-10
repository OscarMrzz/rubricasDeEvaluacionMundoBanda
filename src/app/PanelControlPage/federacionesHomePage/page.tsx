"use client";

import FederacionesService from "@/lib/services/federacionesServices";
import { useEffect, useState } from "react";
import { federacionInterface } from "@/interfaces/interfaces";
import SkeletonTabla from "@/component/skeleton/SkeletonTabla/Page";
import React from 'react'
import TablaFederaciones from "@/component/tablaFederacionesComponet/Page";
import OverleyModalFormulario from "@/component/modales/OverleyModalFormulario/Page";
import { PlusIcon } from "@heroicons/react/16/solid";
import FormularioAgregarFederacionComponent from "@/component/formularios/formulariosFederaciones/formularioAgregarFederacionComponent/Page";

const FederacionesHomePage = () => {
 
  const [federaciones, setFederaciones] = useState<federacionInterface[]>([]);
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


   async function traerDatosTabla()  {
      const federacionesService = new FederacionesService();
      try {
       
        const federacionesData: federacionInterface[] = await federacionesService.get();
        setFederaciones(federacionesData);
        setLoading(false);
       
      } catch (error) {
        console.error("❌ Error al obtener las federaciones:", error);
        setLoading(false);
    
      } 
    };




  
  return (
    <div className="px-20">
      
      <OverleyModalFormulario   open={openFormularioAgregar} onClose={cerrarFormularioAgregar}>
      
    <FormularioAgregarFederacionComponent refresacar={traerDatosTabla} onClose={cerrarFormularioAgregar} />

      </OverleyModalFormulario>
      <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold mb-4">Federaciones</h1>
              <button className="cursor-pointer flex justify-center items-center gap-2"  onClick={abrirFormularioAgregar} >
        <PlusIcon className="w-5 h-5 bg-blue-600  rounded-2xl" />
        Agregar</button>

        
      </div>
     
        


      {loading ? <SkeletonTabla /> : <TablaFederaciones federaciones={federaciones} onRefresh={traerDatosTabla} />}


    </div>
   
  )
}

export default FederacionesHomePage

