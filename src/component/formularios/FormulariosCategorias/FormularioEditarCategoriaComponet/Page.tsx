"use client";

import React, { useState, useEffect } from "react";


import {categoriaInterface,  perfilDatosAmpleosInterface,} from "@/interfaces/interfaces";
import PerfilesServices from "@/lib/services/perfilesServices";
import CategoriasServices from "@/lib/services/categoriaServices";


type Props = {
    CategoriaAEditar: categoriaInterface;
  refresacar: () => void;
  onClose: () => void;
};


/* 
    idCategoria: string;
    created_at: string;
    nombreCategoria: string;
    detallesCategoria: string;
    idForaneaFederacion: string;


*/
export default  function FormularioEditarCategoriaComponent  ({ refresacar, onClose, CategoriaAEditar }: Props)  {
  const [formData, setFormData] = useState({
    nombreCategoria: "",
      detallesCategoria: "",

    idForaneaFederacion: "",
   
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
  useEffect(() => {

      cargaFormulario(CategoriaAEditar);
   
  }, []);

const cargaFormulario = (categoria: categoriaInterface) => {
    setFormData({
      nombreCategoria: categoria.nombreCategoria,
      detallesCategoria: categoria.detallesCategoria,
      idForaneaFederacion: categoria.idForaneaFederacion,
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
      const categoriasServices = new CategoriasServices();
      const nuevaCategoria: Omit<categoriaInterface, "idCategoria" | "created_at"> = {
        nombreCategoria: formData.nombreCategoria,
        detallesCategoria: formData.detallesCategoria,
     
        idForaneaFederacion: perfil.idForaneaFederacion
      };

      await categoriasServices.update(CategoriaAEditar.idCategoria, nuevaCategoria as categoriaInterface);


      // Limpiar formulario
      setFormData({
        nombreCategoria: "",
        detallesCategoria: "",
        idForaneaFederacion: "",
      });
    } catch (error) {
      console.error("❌ Error al crear la Categoria:", error);
      alert("Error al editar la Categoria");
    } finally {
      setLoading(false);
        refresacar();
    onClose();
    }
  }
  const onClickCancelar=()=>{
      setFormData({
        nombreCategoria: "",
        detallesCategoria: "",
        idForaneaFederacion: "",
      });
    onClose();
  }

  return (
    <div className="p-2 lg:px-25 ">
      <h2 className="text-2xl font-bold mb-4">Editar Categroia</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="text-gray-200 mb-1" htmlFor="nombreCategoria">
            Nombre de Categoria
          </label>
          <input
            type="text"
            id="nombreCategoria"
            name="nombreCategoria"
            value={formData.nombreCategoria}
            onChange={handleInputChange}
            className="border border-gray-200 p-2 rounded"
            placeholder="Ingrese nombre de la categoria"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-200 mb-1" htmlFor="nombreCategoria">
            Detalles categoria
          </label>
          <input
            type="text"
            id="detallesCategoria"
            name="detallesCategoria"
            value={formData.detallesCategoria}
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
          {loading ? "cargado..." : "Editar"}
        </button>
      <button onClick={()=>onClickCancelar()} className="w-full bg-gray-400 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-300 hover:text-gray-700">Cancelar</button>
      </form>
    </div>
  );
};


