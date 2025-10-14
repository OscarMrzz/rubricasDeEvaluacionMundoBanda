"use client";

import React, { useState, useEffect } from "react";


import {  criterioEvaluacionInterface, perfilDatosAmpleosInterface, rubricaDatosAmpleosInterface,} from "@/interfaces/interfaces";
import PerfilesServices from "@/lib/services/perfilesServices";
import CriteriosServices from "@/lib/services/criteriosServices";
import { useDispatch } from "react-redux";
import { activarRefrescarDataCriterios } from "@/feacture/RefrescadorData/refrescadorDataSlice";



type Props = {
  rubrica:rubricaDatosAmpleosInterface;
  refresacar?: () => void;
  onClose: () => void;
};


/* 
   idCriterio: string;
    created_at: string;
    nombreCriterio: string;
    detallesCriterio: string;
    puntosCriterio: number;
    idForaneaRubrica: string;




*/
export default  function FormularioAgregarCriterioComponet  ({rubrica, refresacar, onClose }: Props)  {
  
  const dispatch = useDispatch();

  
  const [formData, setFormData] = useState({
   nombreCriterio: "",
      detallesCriterio: "",
      puntosCriterio: 0,
    idForaneaRubrica: "",
   
  });

 
  const [loading, setLoading] = useState(false);
  const [perfil, setPerfil] = useState<perfilDatosAmpleosInterface>({} as perfilDatosAmpleosInterface);

  useEffect(()=>{
    const perfilesServices = new PerfilesServices()
  perfilesServices.getUsuarioLogiado().then((perfil) => {
    if (perfil) {
      setPerfil(perfil);
    }
  });
}, []);




  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

  

    try {
      const criteriosServices = new CriteriosServices();
      const nuevaCategoria: Omit<criterioEvaluacionInterface, "idCriterio" | "created_at"> = {
        nombreCriterio: formData.nombreCriterio,
        detallesCriterio: formData.detallesCriterio,
        puntosCriterio: formData.puntosCriterio,
        idForaneaRubrica: rubrica.idRubrica,
      };

      await criteriosServices.create(nuevaCategoria as criterioEvaluacionInterface);


      // Limpiar formulario
      setFormData({
        nombreCriterio: "",
        detallesCriterio: "",
        puntosCriterio: 0,
        idForaneaRubrica: "",
      });
    } catch (error) {
      console.error("❌ Error al crear la Categoria:", error);
      alert("Error al agregar la Criterio");
    } finally {
      setLoading(false);
      
      dispatch(activarRefrescarDataCriterios());
    onClose();
    }
  };

  return (
    <div className="p-2 lg:px-25 ">
      <h2 className="text-2xl font-bold mb-4">Agregar Criterio</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="text-gray-200 mb-1" htmlFor="nombreCriterio">
            Nombre de Criterio
          </label>
          <input
            type="text"
            id="nombreCriterio"
            name="nombreCriterio"
            value={formData.nombreCriterio}
            onChange={handleInputChange}
            className="border border-gray-200 p-2 rounded"
            placeholder="Ingrese nombre de la categoria"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-200 mb-1" htmlFor="detallesCriterio">
            Detalles criterio
          </label>
          <input
            type="text"
            id="detallesCriterio"
            name="detallesCriterio"
            value={formData.detallesCriterio}
            onChange={handleInputChange}
            className="border border-gray-200 p-2 rounded"
            placeholder="Ingrese detalles"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-200 mb-1" htmlFor="puntosCriterio">
            puntos 
          </label>
          <input
            type="number"
            id="puntosCriterio"
            name="puntosCriterio"
            value={formData.puntosCriterio}
            onChange={handleInputChange}
            className="border border-gray-200 p-2 rounded"
            placeholder=""
            required
          />
        </div>
      
        <div className="flex flex-col">
      
   
        </div>
     
    
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 cursor-pointer"
        >
          {loading ? "cargado..." : "Agregar"}
        </button>
      </form>
    </div>
  );
};


