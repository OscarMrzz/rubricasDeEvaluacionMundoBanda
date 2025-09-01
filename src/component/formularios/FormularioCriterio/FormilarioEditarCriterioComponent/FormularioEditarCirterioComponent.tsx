"use client";

import React, { useState, useEffect } from "react";
import PerfilesServices from "@/lib/services/perfilesServices";
import { criterioEvaluacionDatosAmpleosInterface, criterioEvaluacionInterface, perfilDatosAmpleosInterface } from "@/interfaces/interfaces";
import CriteriosServices from "@/lib/services/criteriosServices";
import { useDispatch } from "react-redux";
import { desactivarOverleyFormularioEditarCriterio } from "@/feacture/overleys/overleySlice";


type Props = {
    criterioAEditar: criterioEvaluacionDatosAmpleosInterface;
  refresacar: () => void;
  onClose?: () => void;
};



export default  function FormularioEditarCriterioComponet  ({criterioAEditar, refresacar, onClose }: Props)  {

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
   


 
 

  useEffect(()=>{
    const perfilesServices = new PerfilesServices()
  perfilesServices.getUsuarioLogiado().then((perfil) => {
    if (perfil) {
      setPerfil(perfil);
    }
  });
}, []);

 useEffect(()=>{
    if(criterioAEditar){
        cargarDatosFormulario();
    }
 }, []);


 const cargarDatosFormulario =() =>{
    setFormData({
        nombreCriterio: criterioAEditar.nombreCriterio,
        detallesCriterio: criterioAEditar.detallesCriterio,
        puntosCriterio: criterioAEditar.puntosCriterio,
        idForaneaRubrica: criterioAEditar.idForaneaRubrica,
    });
 };



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
      const criterioServices = new CriteriosServices();
      const nuevoCriterio: Omit<criterioEvaluacionInterface, "idCriterio" | "created_at"> = {
          nombreCriterio: formData.nombreCriterio,
          detallesCriterio: formData.detallesCriterio,
          puntosCriterio: formData.puntosCriterio,
          idForaneaRubrica: formData.idForaneaRubrica,
         
      };

      await criterioServices.update( criterioAEditar.idCriterio, nuevoCriterio as criterioEvaluacionInterface);


      // Limpiar formulario
      setFormData({
        nombreCriterio: "",
        detallesCriterio: "",
        puntosCriterio: 0,
        idForaneaRubrica: "",
      });
    } catch (error) {
      console.error("❌ Error al crear la Categoria:", error);
      alert("Error al editar la Categoria");
    } finally {
      setLoading(false);
        refresacar();
        dispatch(desactivarOverleyFormularioEditarCriterio());
    
    }
  };

  return (
    <div className="px-25 ">
      <h2 className="text-2xl font-bold mb-4">editar Criterio</h2>
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
            placeholder="Ingrese nombre de la categoria"
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
          {loading ? "cargado..." : "Aceptar"}
        </button>
      </form>
    </div>
  );
};


