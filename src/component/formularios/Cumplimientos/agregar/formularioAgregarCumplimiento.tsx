"use client";

import {
  criterioEvaluacionDatosAmpleosInterface,
  cumplimientosInterface,
} from "@/interfaces/interfaces"; // Update the path as needed
import { useState } from "react";
import { useDispatch } from "react-redux";

import cumplimientossServices from "@/lib/services/cumplimientosServices";
import { activarRefrescarDataCumplimiento } from "@/feacture/RefrescadorData/refrescadorDataSlice";

type Props = {
  criterio: criterioEvaluacionDatosAmpleosInterface;
  onClose: () => void;
};


export default function FormularioAgregarCumplimientoComponet({
  criterio,

  onClose,
}: Props) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    detalleCumplimiento: "",
    puntosCumplimiento: 0,
    idForaneaCriterio: "",
  });

  const [loading, setLoading] = useState(false);

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
      const cumplimientosServices = new cumplimientossServices();

      const nuevoCunplimiento: Omit<cumplimientosInterface,"idCumplimiento" | "created_at"> = {
        detalleCumplimiento: formData.detalleCumplimiento,
        puntosCumplimiento: formData.puntosCumplimiento,
        idForaneaCriterio: criterio.idCriterio,
      };

      await cumplimientosServices.create(
        nuevoCunplimiento as cumplimientosInterface
      );

      // Limpiar formulario
      setFormData({
        detalleCumplimiento: "",
        puntosCumplimiento: 0,
        idForaneaCriterio: "",
      });
    } catch (error) {
      console.error("❌ Error al crear la Categoria:", error);
      alert("Error al agregar la cumplimiento");
    } finally {
      setLoading(false);

      dispatch(activarRefrescarDataCumplimiento());
      onClose();
    }
  };

  return (
    <div className="p-2 lg:px-25 ">
      <h2 className="text-2xl font-bold mb-4">Agregar Cumplimiento</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label
            className="text-gray-200 mb-1"
            htmlFor="detalleCumplimientoo}"
          >
            detalles
          </label>
          <input
            type="text"
            id="detalleCumplimiento"
            name="detalleCumplimiento"
            value={formData.detalleCumplimiento}
            onChange={handleInputChange}
            className="border border-gray-200 p-2 rounded"
            placeholder="Ingrese nombre de la categoria"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-200 mb-1" htmlFor="puntosCumplimiento">
            puntos
          </label>
          <input
            type="number"
            id="puntosCumplimiento"
            name="puntosCumplimiento"
            value={formData.puntosCumplimiento}
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
          {loading ? "cargado..." : "Aceptar"}
        </button>
      </form>
    </div>
  );
}
