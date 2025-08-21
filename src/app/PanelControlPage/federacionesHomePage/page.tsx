"use client";

import FederacionesService from "@/lib/services/federacionesServices";
import { useEffect, useState } from "react";
import { federacionInterface } from "@/interfaces/interfaces";
import SkeletonTabla from "@/component/skeleton/SkeletonTabla/Page";
import React from 'react'
import TablaFederaciones from "@/component/tablaFederacionesComponet/Page";

const FederacionesHomePage = () => {
 
  const [federaciones, setFederaciones] = useState<federacionInterface[]>([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    
    traerDatosTabla();
    
  }, []);


   async function traerDatosTabla()  {
      const federacionesService = new FederacionesService();
      try {
       
        const federacionesData: federacionInterface[] = await federacionesService.get();
        setFederaciones(federacionesData);
        setLoading(false);
        console.log("✅ Federaciones obtenidas:");
        console.log(federacionesData);
      } catch (error) {
        console.error("❌ Error al obtener las federaciones:", error);
        setLoading(false);
    
      } 
    };




  
  return (
    <div className="px-20">
            <h1 className="text-2xl font-bold mb-4">Federaciones</h1>
      {loading ? <SkeletonTabla /> : <TablaFederaciones federaciones={federaciones} onRefresh={traerDatosTabla} />}


    </div>
   
  )
}

export default FederacionesHomePage

