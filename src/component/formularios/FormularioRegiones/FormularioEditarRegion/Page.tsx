"use client";

import React, { useState, useEffect } from "react";
import FederacionesServices from "@/lib/services/federacionesServices";
import RegionesServices from "@/lib/services/regionesServices";
import {federacionInterface,perfilDatosAmpleosInterface,regionesInterface,} from "@/interfaces/interfaces";
import PerfilesServices from "@/lib/services/perfilesServices";


type Props = {
  refresacar: () => void;
  onClose: () => void;
  regionAEditar: regionesInterface; // Región a editar, si es necesario
};



export default  function FormularioEditarRegionComponent  ({ refresacar, onClose, regionAEditar }: Props)  {
  const [formData, setFormData] = useState({
    nombreRegion: "",

    idForaneaFederacion: "",
  });

  const [federaciones, setFederaciones] = useState<federacionInterface[]>([]);
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

  useEffect(() => {
   
  }, []);

  const CargarDatosFormulario = () => {
    setFormData({
      nombreRegion: regionAEditar?.nombreRegion || "",
      idForaneaFederacion: regionAEditar?.idForaneaFederacion || "",
    });
  }

  useEffect(() => {
    cargarDatosIniciales();
    if (regionAEditar) {
      CargarDatosFormulario();
    }
  }, []);

  const cargarDatosIniciales = async () => {
    try {
      const federacionesServices = new FederacionesServices();
   
  

      const [federacionesData] =
        await Promise.all([
          federacionesServices.get(),
    

        ]);

      setFederaciones(federacionesData);
 
    } catch (error) {
      console.error("Error cargando datos iniciales:", error);
    }

  }



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
      const regionesServices = new RegionesServices();
      const nuevaRegion: Omit<regionesInterface, "idRegion" | "created_at"> = {
        nombreRegion: formData.nombreRegion,
     
        idForaneaFederacion: perfil.idForaneaFederacion
      };

      await regionesServices.update(regionAEditar.idRegion, nuevaRegion as regionesInterface);


      // Limpiar formulario
      setFormData({
        nombreRegion: "",
        idForaneaFederacion: "",
      });
    } catch (error) {
      console.error("❌ Error al crear la Federacion:", error);
      alert("Error al editar la federacion");
    } finally {
      setLoading(false);
        refresacar();
    onClose();
    }
  };

  return (
    <div className="px-25 ">
      <h2 className="text-2xl font-bold mb-4">editar Region</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="text-gray-200 mb-1" htmlFor="nombreRegion">
            Nombre de Region
          </label>
          <input
            type="text"
            id="nombreRegion"
            name="nombreRegion"
            value={formData.nombreRegion}
            onChange={handleInputChange}
            className="border border-gray-200 p-2 rounded"
            placeholder="Ingrese nombre de la region"
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
          {loading ? "cargado..." : "editar"}
        </button>
      </form>
    </div>
  );
};


