
import CumplimientosComponent from "@/component/cumplimientosComponent/CumplimientosComponet";
import { criterioEvaluacionDatosAmpleosInterface } from "@/interfaces/interfaces";
import CriteriosServices from "@/lib/services/criteriosServices";

import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

import React from "react";
type Props = {
  criterio: criterioEvaluacionDatosAmpleosInterface;
  onClose: () => void; // Función para cerrar el modal
  onRefresh?: () => void; // Función para refrescar los datos
  openFormEditar: () => void; // Función para abrir el formulario de edición
};

export default function InformacionCriterioComponent({
  criterio,
  onClose,
  onRefresh,
  openFormEditar,
}: Props) {
  const eliminar = () => {
    const criteriosServices = new CriteriosServices();
    criteriosServices.delete(criterio.idCriterio)
      .then(() => {
        console.log("✅ Criterio eliminado correctamente");
        onRefresh?.(); // Refrescar los datos
        onClose?.(); // Cerrar el modal después de eliminar
      })
      .catch((error) => {
        console.error("❌ Error al eliminar el criterio:", error);
      });
  };
  const onclickEditar = () => {
    openFormEditar?.();
    onClose?.();
  };

  return (
    <div className="max-h-[450px] overflow-auto scrollbar-estetica">
      <div className="grid grid-cols-[1fr_60px] gap-4 p-8">
        <div className="">
          <div className="flex gap-4 w-full justify-center items-center text-center ">
            <h2 className=" text-2xl font-bold">{criterio.nombreCriterio}</h2>

            <p>{criterio.puntosCriterio} %</p>
          </div>
          <div className="  ">
            <p>Rubrica: {criterio.rubricas?.nombreRubrica}</p>

            <p className="font-light">{criterio.detallesCriterio}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={onclickEditar}
            className="border-2 border-white w-10 h-10 flex items-center justify-center p-1 hover:bg-blue-400 cursor-pointer"
          >
            <PencilIcon className="w-6 h-6 text-white" />
          </button>
          <button
            className="border-2 border-white w-10 h-10 flex items-center justify-center p-1 hover:bg-blue-400 cursor-pointer"
            onClick={eliminar}
          >
            <TrashIcon className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
      <CumplimientosComponent />
      
      <div>
       
      </div>
    </div>
  );
}
