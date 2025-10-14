//Aqui creare un formulario para agregar bandas

"use client";

import React, { useState, useEffect } from "react";
import BandasServices from "@/lib/services/bandasServices";
import FederacionesServices from "@/lib/services/federacionesServices";
import CategoriasServices from "@/lib/services/categoriaServices";
import RegionesServices from "@/lib/services/regionesServices";
import {
  bandaInterface,
  federacionInterface,
  categoriaInterface,
  regionesInterface,
  bandaDatosAmpleosInterface,
} from "@/interfaces/interfaces";

type Props = {
  bandaAEditar: bandaDatosAmpleosInterface
  refresacar: () => void;
  onClose: () => void;
};



const FormularioEditarBandaComponent = ({ refresacar, onClose, bandaAEditar }: Props) => {
  const [formData, setFormData] = useState({
    nombreBanda: "",
    AliasBanda: "",
    idForaneaCategoria: "",
    idForaneaRegion: "",
    idForaneaFederacion: "",
  });

  const [federaciones, setFederaciones] = useState<federacionInterface[]>([]);
  const [categorias, setCategorias] = useState<categoriaInterface[]>([]);
  const [regiones, setRegiones] = useState<regionesInterface[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    cargarDatosIniciales();
  }, []);
   useEffect(() => {
    llenarDatosFormulario();
  }, []);

  const cargarDatosIniciales = async () => {
    try {
      const federacionesServices = new FederacionesServices();
      const categoriasServices = new CategoriasServices();
      const regionesServices = new RegionesServices();

      const [federacionesData, categoriasData, regionesData] =
        await Promise.all([
          federacionesServices.get(),
          categoriasServices.get(),
          regionesServices.get(),
        ]);

      setFederaciones(federacionesData);
      setCategorias(categoriasData);
      setRegiones(regionesData);
    } catch (error) {
      console.error("Error cargando datos iniciales:", error);
    }
  };

  //llenar datos del formulario con la banda a editar
  const llenarDatosFormulario = () => {
    setFormData({
      nombreBanda: bandaAEditar.nombreBanda,
      AliasBanda: bandaAEditar.AliasBanda,
      idForaneaCategoria: bandaAEditar.idForaneaCategoria,
      idForaneaRegion: bandaAEditar.idForaneaRegion,
      idForaneaFederacion: bandaAEditar.idForaneaFederacion,
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
      const bandasServices = new BandasServices();
      const nuevaBanda: Omit<bandaInterface, "idBanda" | "created_at"> = {
        
        nombreBanda: formData.nombreBanda,
        AliasBanda: formData.AliasBanda,
        idForaneaCategoria: formData.idForaneaCategoria,
        idForaneaRegion: formData.idForaneaRegion,
        idForaneaFederacion: formData.idForaneaFederacion,
      };

    

      await bandasServices.update(bandaAEditar.idBanda,nuevaBanda as bandaInterface);
   


    } catch (error) {
      console.error("❌ Error al crear la banda:", error);
      alert("Error al agregar la banda");
    } finally {
      setLoading(false);
       refresacar();
    onClose();
    }
  };

  return (
    <div className="p-2 lg:px-25 ">
      <h2 className="text-2xl font-bold mb-4">Editar Banda</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="text-gray-200 mb-1" htmlFor="nombreBanda">
            Nombre de la Banda
          </label>
          <input
            type="text"
            id="nombreBanda"
            name="nombreBanda"
            value={formData.nombreBanda}
            onChange={handleInputChange}
            className="border border-gray-200 p-2 rounded"
            placeholder="Ingrese nombre de la banda"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-200 mb-1" htmlFor="AliasBanda">
            Alias de la Banda
          </label>
          <input
            type="text"
            id="AliasBanda"
            name="AliasBanda"
            value={formData.AliasBanda}
            onChange={handleInputChange}
            className="border border-gray-200 p-2 rounded"
            placeholder="Ingrese alias de la banda"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-200 mb-1" htmlFor="idForaneaFederacion">
            Federación
          </label>
          <select
            id="idForaneaFederacion"
            name="idForaneaFederacion"
            value={formData.idForaneaFederacion}
            onChange={handleInputChange}
            className="border text-gray-700 bg-gray-200 p-2 rounded"
            required
          >
            <option value="">Seleccione una federación</option>
            {federaciones.map((federacion) => (
              <option
                key={federacion.idFederacion}
                value={federacion.idFederacion}
              >
                {federacion.nombreFederacion}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-gray-200 mb-1" htmlFor="idForaneaCategoria">
            Categoría
          </label>
          <select
            id="idForaneaCategoria"
            name="idForaneaCategoria"
            value={formData.idForaneaCategoria}
            onChange={handleInputChange}
          className="border text-gray-700 bg-gray-200 p-2 rounded"
            required
          >
            <option value="">Seleccione una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.idCategoria} value={categoria.idCategoria}>
                {categoria.nombreCategoria}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-gray-200 mb-1" htmlFor="idForaneaRegion">
            Región
          </label>
          <select
            id="idForaneaRegion"
            name="idForaneaRegion"
            value={formData.idForaneaRegion}
            onChange={handleInputChange}
            className="border text-gray-700 bg-gray-200 p-2 rounded"
            required
          >
            <option value="">Seleccione una región</option>
            {regiones.map((region) => (
              <option key={region.idRegion} value={region.idRegion}>
                {region.nombreRegion}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Editando..." : "Editar Banda"}
        </button>
      </form>
    </div>
  );
};

export default FormularioEditarBandaComponent;
