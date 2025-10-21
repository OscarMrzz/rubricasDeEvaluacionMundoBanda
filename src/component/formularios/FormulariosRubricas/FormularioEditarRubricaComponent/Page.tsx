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
import { useDispatch } from "react-redux";
import { activarRefrescarDataRubricas } from "@/feacture/RefrescadorData/refrescadorDataSlice";

type Props = {
  rubricaAEditar: rubricaInterface;
  refresacar?: () => void;
  onClose: () => void;
};


export default function FormularioEditarRubricaComponent({
  refresacar,
  onClose,
  rubricaAEditar,
}: Props) {
  const [categoriasList, setCategoriasList] = useState<categoriaInterface[]>(
    []
  );
  const dispatch = useDispatch();

  const [loadingCategorias, setLoadingCategorias] = useState(true);

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
    if (rubricaAEditar) {
      cargarFormulario();
    }
  }, []);

  const cargarFormulario = () => {
    setFormData({
      nombreRubrica: rubricaAEditar.nombreRubrica,
      datalleRubrica: rubricaAEditar.datalleRubrica,
      puntosRubrica: rubricaAEditar.puntosRubrica,
      idForaneaCategoria: rubricaAEditar.idForaneaCategoria,
      idForaneaFederacion: rubricaAEditar.idForaneaFederacion,
    });
  };

  useEffect(() => {
    setLoadingCategorias(true);

    const categoriasServices = new CategoriasServices();
    categoriasServices
      .get()
      .then((categorias) => {
        setCategoriasList(categorias);
      })
      .catch((error) => {
        console.error("❌ Error al obtener las categorías:", error);
      })
      .finally(() => {
        setLoadingCategorias(false);
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

      await rubricaService.update(
        rubricaAEditar.idRubrica,
        nuevaRubrica as rubricaInterface
      );

      // Limpiar formulario
      setFormData({
        nombreRubrica: "",
        datalleRubrica: "",
        puntosRubrica: 0,
        idForaneaCategoria: "",
        idForaneaFederacion: "",
      });
    } catch (error) {
      console.error("❌ Error al editar la Rubrica:", error);
      alert("Error al Editar la Rubrica");
    } finally {
      setLoading(false);
   
      dispatch(activarRefrescarDataRubricas());
      onClose();
    }
  }
  const onClickCancelar=()=>{
      setFormData({
        nombreRubrica: "",
        datalleRubrica: "",
        puntosRubrica: 0,
        idForaneaCategoria: "",
        idForaneaFederacion: "",
      });
    onClose();
  }

  return (
    <div className="p-2 lg:px-25 ">
      <h2 className="text-2xl font-bold mb-4">Editar Categroia</h2>
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
            className="border border-gray-200 p-2 rounded"
            required
          >
            {loadingCategorias ? (
              <option value="" disabled className="">
                Cargando categorías...
              </option>
            ) : (
              <>
                <option className="text-gray-800" value="">
                  Seleccione una categoría
                </option>
                {categoriasList.map((cat) => (
                  <option
                    className="text-gray-800"
                    key={cat.idCategoria}
                    value={cat.idCategoria}
                  >
                    {cat.nombreCategoria}
                  </option>
                ))}
              </>
            )}
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
          {loading ? "cargado..." : "Editar"}
        </button>
        <button onClick={()=>onClickCancelar()} className="w-full bg-gray-400 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-300 hover:text-gray-700">Cancelar</button>
      </form>
    </div>
  );
}
