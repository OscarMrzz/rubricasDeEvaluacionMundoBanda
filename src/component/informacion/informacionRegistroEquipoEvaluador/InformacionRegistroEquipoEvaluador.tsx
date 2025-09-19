

import CumplimientosComponent from "@/component/cumplimientosComponent/CumplimientosComponet";
import { cumplimientosDatosAmpleosInterface, registroEquipoEvaluadorDatosAmpleosInterface } from "@/interfaces/interfaces";
import cumplimientossServices from "@/lib/services/cumplimientosServices";
import RegistroEquipoEvaluadorServices from "@/lib/services/registroEquipoEvaluadorServices";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

import React from "react";
type Props = {
  registroEquipoEvaluador: registroEquipoEvaluadorDatosAmpleosInterface;
  onClose: () => void; // Función para cerrar el modal
  onRefresh?: () => void; // Función para refrescar los datos
  openFormEditar: () => void; // Función para abrir el formulario de edición
};

export default function InformacionRegistroEquipoEvaluadorComponent({
  registroEquipoEvaluador,
  onClose,
  onRefresh,
  openFormEditar,
}: Props) {
  const eliminar = () => {
    const registroEquipoEvaluadorServices = new RegistroEquipoEvaluadorServices();
    registroEquipoEvaluadorServices.delete( registroEquipoEvaluador.idRegistroEvaluador)
      .then(() => {
        console.log("✅ cumpimiento eliminado correctamente");
        onRefresh?.(); // Refrescar los datos
        onClose?.(); // Cerrar el modal después de eliminar
      })
      .catch((error) => {
        console.error("❌ Error al eliminar el cumpimiento:", error);
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
      
          <div className="  ">
            <p>Miembro : {registroEquipoEvaluador.perfiles.nombre}</p>

            <p className="font-light">{registroEquipoEvaluador.rolMiembro}</p>
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
      
      <div>
       
      </div>
    </div>
  );
}
