"use client";

import React, { useState, useEffect } from "react";

import {
  rubricaInterface,
  perfilDatosAmpleosInterface,
  categoriaInterface,
} from "@/interfaces/interfaces";
import PerfilesServices from "@/lib/services/perfilesServices";
import RubricasServices from "@/lib/services/rubricasServices";
import CategoriasServices from "@/lib/services/categoriaServices";

type Props = {
  refresacar: () => void;
  onClose: () => void;
};

/* 
      idRubrica: string;
    created_at: string;
    nombreRubrica: string;
    datalleRubrica: string; // Mantenido el typo como en DB (debería ser detalleRubrica)
    puntosRubrica: number;
    idForaneaCategoria: string;
    idForaneaFederacion: string;


*/
export default function FormularioAgregarRubricaComponent({
  refresacar,
  onClose,
}: Props) {
  const [categoriasList, setCategoriasList] = useState<categoriaInterface[]>(
    []
  );

  const [formData, setFormData] = useState({
    nombreRubrica: "",
    datalleRubrica: "",
    puntosRubrica: 0,
    idForaneaCategoria: "",
    idForaneaFederacion: "",
  });

  const [loading, setLoading] = useState(false);
  const [perfil, setPerfil] = useState<perfilDatosAmpleosInterface>(
    {} as perfilDatosAmpleosInterface
  );

  useEffect(() => {
    const perfilesServices = new PerfilesServices();
    perfilesServices.getUsuarioLogiado().then((perfil) => {
      if (perfil) {
        setPerfil(perfil);
      }
    });
  }, []);

    useEffect(() => {
      
        const categoriasServices = new CategoriasServices();
        categoriasServices
        .get()
        .then((categorias) => {
            setCategoriasList(categorias);
        })
        .catch((error) => {
            console.error("❌ Error al obtener las categorías:", error);
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
      const rubricaService = new RubricasServices();
      const nuevaRubrica: Omit<rubricaInterface, "idRubrica" | "created_at"> = {
        nombreRubrica: formData.nombreRubrica,
        datalleRubrica: formData.datalleRubrica,
        puntosRubrica: formData.puntosRubrica,
        idForaneaCategoria: formData.idForaneaCategoria,

        idForaneaFederacion: perfil.idForaneaFederacion,
      };

      await rubricaService.create(nuevaRubrica as rubricaInterface);

      // Limpiar formulario
      setFormData({
        nombreRubrica: "",
        datalleRubrica: "",
        puntosRubrica: 0,
        idForaneaCategoria: "",
        idForaneaFederacion: "",
      });
    } catch (error) {
      console.error("❌ Error al crear la Rubrica:", error);
      alert("Error al agregar la Rubrica");
    } finally {
      setLoading(false);
      refresacar();
      onClose();
    }
  };

  return (
    <div className="px-25 ">
      <h2 className="text-2xl font-bold mb-4">Agregar Categroia</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="text-gray-200 mb-1" htmlFor="nombreRubrica">
            Nombre de Rubrica
          </label>
          <input
            type="text"
            id="nombreRubrica"
            name="nombreRubrica"
            value={formData.nombreRubrica}
            onChange={handleInputChange}
            className="border border-gray-200 p-2 rounded"
            placeholder="Ingrese nombre de la Rubrica"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-200 mb-1" htmlFor="nombreRurbica">
            Detalles Rubrica
          </label>
          <input
            type="text"
            id="datalleRubrica"
            name="datalleRubrica"
            value={formData.datalleRubrica}
            onChange={handleInputChange}
            className="border border-gray-200 p-2 rounded"
            placeholder="Ingrese nombre de la Rubrica"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-200 mb-1" htmlFor="idForaneaCategoria">
            Categoria
          </label>
          <select
            id="idForaneaCategoria"
            name="idForaneaCategoria"
            value={formData.idForaneaCategoria}
            onChange={handleInputChange}
            className="border border-gray-200 p-2 rounded "
            required
          >
            <option className="text-gray-800" value="">Seleccione una categoría</option>
            {categoriasList.map((cat) => (
              <option className="text-gray-800"  key={cat.idCategoria} value={cat.idCategoria}>
                {cat.nombreCategoria}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-gray-200 mb-1" htmlFor="nombreRurbica">
            Puntos
          </label>
          <input
            type="number"
            id="puntosRubrica"
            name="puntosRubrica"
            value={formData.puntosRubrica}
            onChange={handleInputChange}
            className="border border-gray-200 p-2 rounded"
            placeholder=""
            required
          />
        </div>

        <div className="flex flex-col"></div>

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
}
