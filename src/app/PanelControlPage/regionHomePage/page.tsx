"use client";

import RegionService from "@/lib/services/regionesServices";
import { useEffect, useState } from "react";
import { regionesInterface } from "@/interfaces/interfaces";

import React from 'react'

const RegionHomePage = () => {
  // 1. Estado para guardar las regiones
  const [regiones, setRegiones] = useState<regionesInterface[]>([]);



  useEffect(() => {
    
    traerDatosTabla();
  }, []);


   async function traerDatosTabla()  {
      const regionService = new RegionService();
      try {
       
        const regionesData: regionesInterface[] = await regionService.get();
        setRegiones(regionesData);
      } catch (error) {
        console.error("❌ Error al obtener las regiones:", error);
    
      } 
    };

    const seleccionarFila=()=>{

      console.log("Fila seleccionada");
    }



  return (
    <div className=" px-20">
      <h1 className="text-2xl font-bold mb-4">Regiones</h1>
      <table className="min-w-full  border ">
        <thead>
          <tr>
            <th className="px-4 py-2 border w-1">N°</th>
            <th className="px-4 py-2 border flex justify-start items-start">Nombre</th>
           
          </tr>
        </thead>
        <tbody>
          {regiones.map((region, index) => (
            <tr key={region.idRegion} onDoubleClick={seleccionarFila} className="hover:bg-[#035a98] cursor-pointer">
              <td className="px-4 py-2 border">{index + 1}</td>
              <td className="px-4 py-2 border">{region.nombreRegion}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
     
    </div>
  )
}

export default RegionHomePage
function seleccionarFila() {
  throw new Error("Function not implemented.");
}

