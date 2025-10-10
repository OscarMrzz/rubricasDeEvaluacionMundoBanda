import CriterioCompoenet from "@/component/Criterios/CriteriosComponet";
import { activarOverleyFormularioEditarRubrica } from "@/feacture/overleys/overleySlice";
import { activarRefrescarDataRubricas } from "@/feacture/RefrescadorData/refrescadorDataSlice";
import { rubricaDatosAmpleosInterface } from "@/interfaces/interfaces";
import RubricasServices from "@/lib/services/rubricasServices";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

import React from "react";
import { useDispatch } from "react-redux";
type Props = {
  rubrica: rubricaDatosAmpleosInterface;
  onClose: () => void; // Función para cerrar el modal
  onRefresh?: () => void; // Función para refrescar los datos
  openFormEditar: () => void; // Función para abrir el formulario de edición
  openFormAgregar: () => void; // Función para abrir el formulario de agregar criterio
};

export default function InformacionRubricaComponent({
  rubrica,
  onClose,
  onRefresh,
  openFormEditar,
  openFormAgregar,
}: Props) {
  const dispatch = useDispatch();
  const eliminar = () => {
    const rubricaServices = new RubricasServices();
    rubricaServices
      .delete(rubrica.idRubrica)
      .then(() => {
        
        onRefresh?.(); // Refrescar los datos
        onClose?.(); // Cerrar el modal después de eliminar
      })
      .catch((error) => {
        console.error("❌ Error al eliminar la región:", error);
      })
      .finally(() => {
        dispatch(activarRefrescarDataRubricas());
        onClose?.(); 
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
            <h2 className=" text-2xl font-bold">{rubrica.nombreRubrica}</h2>

            <p>{rubrica.puntosRubrica} %</p>
          </div>
          <div className="  ">
            <p>Categoría: {rubrica.categorias?.nombreCategoria}</p>

            <p className="font-light">{rubrica.datalleRubrica}</p>
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
        <CriterioCompoenet
       
        
        
        />
      </div>
    </div>
  );
}
