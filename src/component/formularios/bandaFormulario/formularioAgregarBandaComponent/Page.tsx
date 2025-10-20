//Aqui creare un formulario para agregar bandas

"use client";

import React, { useState, useEffect, useRef } from "react";
import BandasServices from "@/lib/services/bandasServices";
import FederacionesServices from "@/lib/services/federacionesServices";
import CategoriasServices from "@/lib/services/categoriaServices";
import RegionesServices from "@/lib/services/regionesServices";
import {
  bandaInterface,
  federacionInterface,
  categoriaInterface,
  regionesInterface,
  perfilDatosAmpleosInterface,
} from "@/interfaces/interfaces";
import { url } from "inspector";

type Props = {
  refresacar: () => void;
  onClose: () => void;
};

/* 
ESTO SON LOS CAMPOS QUE FALTAN

ciudadBanda: string;
    urlLogoBanda: string;
    fechaFundacionBanda: string;
    fechaInscripcionAFederacion: string;
    ubicacionSedeBanda: string;


*/

const FormularioAgregarBandaComponent = ({ refresacar, onClose }: Props) => {
  const [formData, setFormData] = useState({
    nombreBanda: "",
    AliasBanda: "",
    idForaneaCategoria: "",
    idForaneaRegion: "",
    idForaneaFederacion: "",
    urlLogoBanda: "",
    ciudadBanda: "",
    fechaFundacionBanda: "",
    fechaInscripcionAFederacion: "",
    ubicacionSedeBanda: "",
  });

  const [federaciones, setFederaciones] = useState<federacionInterface[]>([]);
  const [categorias, setCategorias] = useState<categoriaInterface[]>([]);
  const [regiones, setRegiones] = useState<regionesInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [perfil, setPerfil] = useState<perfilDatosAmpleosInterface>({} as perfilDatosAmpleosInterface);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    cargarDatosIniciales();
  }, []);

  useEffect(() => {
    const perfilBruto = localStorage.getItem("perfilActivo");
    if (perfilBruto) {
      const perfil: perfilDatosAmpleosInterface = JSON.parse(perfilBruto);
      if (perfil) {
        setPerfil(perfil);
      }
    }
  }, []);

  // Limpiar URL temporal al desmontar el componente
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const cargarDatosIniciales = async () => {
    try {
      const federacionesServices = new FederacionesServices();
      const categoriasServices = new CategoriasServices();
      const regionesServices = new RegionesServices();

      const [federacionesData, categoriasData, regionesData] = await Promise.all([
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Crear URL temporal para vista previa
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      // Opcional: También puedes guardar el nombre del archivo en formData
      setFormData((prev) => ({
        ...prev,
        urlLogoBanda: file.name,
      }));
    }
  };

  const bandaServices = useRef(new BandasServices());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    refresacar();
    onClose();

    try {
      const urlLogoParaDB = await bandaServices.current.subirLogoBanda(
        selectedFile as File,
        `${formData.nombreBanda.replace(/\s+/g, "_")}_logo`
      );

      if(!urlLogoParaDB){
        throw new Error("Error al subir el logo de la banda.");
      }
    
      const nuevaBanda: Omit<bandaInterface, "idBanda" | "created_at"> = {
        nombreBanda: formData.nombreBanda,
        AliasBanda: formData.AliasBanda,
        idForaneaCategoria: formData.idForaneaCategoria,
        idForaneaRegion: formData.idForaneaRegion,
        idForaneaFederacion: perfil.tipoUsuario==="superadmin"? formData.idForaneaFederacion : perfil.idForaneaFederacion,
        urlLogoBanda:  urlLogoParaDB,
        ciudadBanda: formData.ciudadBanda,
        fechaFundacionBanda: formData.fechaFundacionBanda,
        fechaInscripcionAFederacion: formData.fechaInscripcionAFederacion,
        ubicacionSedeBanda: formData.ubicacionSedeBanda,
      };

      await bandaServices.current.create(nuevaBanda as bandaInterface);

      // Limpiar formulario
      setFormData({
        nombreBanda: "",
        AliasBanda: "",
        idForaneaCategoria: "",
        idForaneaRegion: "",
        idForaneaFederacion: "",
        urlLogoBanda: "",
        ciudadBanda: "",
        fechaFundacionBanda: "",
        fechaInscripcionAFederacion: "",
        ubicacionSedeBanda: "",
      });

      // Limpiar imagen
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl("");
      setSelectedFile(null);
    } catch (error) {
      console.error("❌ Error al crear la banda:", error);
      alert("Error al agregar la banda");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-2 lg:px-25 ">
      <h2 className="text-2xl font-bold mb-4">Agregar Banda</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
           {
          perfil.tipoUsuario==="superadmin" &&

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
            <option value="">Federacion</option>
            {federaciones.map((federacion) => (
              <option key={federacion.idFederacion} value={federacion.idFederacion}>
                {federacion.nombreFederacion}
              </option>
            ))}
          </select>
        </div>

        }
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
          />
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
           <div className="flex flex-col">
          <label className="text-gray-200 mb-1" htmlFor="fechaFundacionBanda">
           Fecha de fundacion
          </label>
          <input
            type="date"
            id="fechaFundacionBanda"
            name="fechaFundacionBanda"
            value={formData.fechaFundacionBanda}
            onChange={handleInputChange}
            className="border border-gray-200 p-2 rounded"
      
        
          />
        </div>
           <div className="flex flex-col">
          <label className="text-gray-200 mb-1" htmlFor="fechaInscripcionAFederacion">
           Fecha de de inscripcion
          </label>
          <input
            type="date"
            id="fechaInscripcionAFederacion"
            name="fechaInscripcionAFederacion"
            value={formData.fechaInscripcionAFederacion}
            onChange={handleInputChange}
            className="border border-gray-200 p-2 rounded"
      
        
          />
        </div>
            <div className="flex flex-col">
          <label className="text-gray-200 mb-1" htmlFor="ubicacionSedeBanda">
           URL google maps de la sede de la banda
          </label>
          <input
            type="text"
            id="ubicacionSedeBanda"
            name="ubicacionSedeBanda"
            value={formData.ubicacionSedeBanda}
            onChange={handleInputChange}
            className="border border-gray-200 p-2 rounded"
            placeholder="Ingrese nombre de la banda"
           
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-200 mb-1" htmlFor="urlLogoBanda">
            Logo de la Banda
          </label>

          <label className="w-full bg-gray-300 aspect-square cursor-pointer hover:bg-gray-400 transition-colors">
            <input
              type="file"
              id="urlLogoBanda"
              name="urlLogoBanda"
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
          
            />
            {previewUrl ? (
              <img src={previewUrl} alt="Logo de la Banda" className="w-full h-full object-cover rounded" />
            ) : (
              <span className="text-gray-600 text-6xl font-black w-full h-full flex justify-center items-center ">
                LOGO
              </span>
            )}
          </label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 cursor-pointer"
        >
          {loading ? "Agregando..." : "Agregar Banda"}
        </button>
      </form>
    </div>
  );
};

export default FormularioAgregarBandaComponent;
