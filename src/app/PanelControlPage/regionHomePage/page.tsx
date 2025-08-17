"use client";

import RegionService from "@/lib/services/regionesServices";
import { useEffect, useState } from "react";
import { regionesDatosAmpleosInterface } from "@/interfaces/interfaces";
import SkeletonTabla from "@/component/skeleton/SkeletonTabla/Page";

import React from 'react'
import TablaRegiones from "@/component/tablaRegions/Page";

const RegionHomePage = () => {
  // 1. Estado para guardar las regiones
  const [regiones, setRegiones] = useState<regionesDatosAmpleosInterface[]>([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    
    traerDatosTabla();
    
  }, []);


   async function traerDatosTabla()  {
      const regionService = new RegionService();
      try {
       
        const regionesData: regionesDatosAmpleosInterface[] = await regionService.get();
        setRegiones(regionesData);
        setLoading(false);
      console.log("✅ Regiones obtenidas:");
        console.log( regionesData);
      } catch (error) {
        console.error("❌ Error al obtener las regiones:", error);
        setLoading(false);
    
      } 
    };




  
  return (
    <div className="px-20">
            <h1 className="text-2xl font-bold mb-4 ">Regiones</h1>
      {loading ? <SkeletonTabla /> : <TablaRegiones regiones={regiones} onRefresh={traerDatosTabla} />}


    </div>
   
  )
}

export default RegionHomePage

