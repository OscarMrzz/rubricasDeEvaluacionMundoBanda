import React from "react";
import OverleyModal from "../../modales/OverleyModal/Page";

import OverleyModalFormulario from "../../modales/OverleyModalFormulario/Page";


import FormularioEditarRubricaComponent from "@/component/formularios/FormulariosRubricas/FormularioEditarRubricaComponent/Page";
import { criterioEvaluacionDatosAmpleosInterface } from "@/interfaces/interfaces";
import InformacionCriterioComponent from "@/component/informacion/informacionCriterioComponent/InformacionCriterioComponet";
import FormularioEditarCriterioComponet from "@/component/formularios/FormularioCriterio/FormilarioEditarCriterioComponent/FormularioEditarCirterioComponent";
import { setCriterioSeleccionado } from "@/feacture/Criterios/CriteriosSlice";
import { activarOverleyInformacionCriterio } from "@/feacture/overleys/overleySlice";
import { useDispatch } from "react-redux";


type Props = {
  Criterios: criterioEvaluacionDatosAmpleosInterface[];
  onRefresh?: () => void; // Función para refrescar los datos
};

export default function TablaCriteriosComponent({ Criterios, onRefresh }: Props) {
   const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [openFormularioEditar, setOpenFormularioEditar] = React.useState(false);

  const [selectCriterio, setSelectCriterio] =
    React.useState<criterioEvaluacionDatosAmpleosInterface | null>(null);

  const seleccionarFila = (Criterios: criterioEvaluacionDatosAmpleosInterface) => {
    dispatch(setCriterioSeleccionado(Criterios));
    dispatch(activarOverleyInformacionCriterio());
  };
  const cerrarModal = () => {
    setOpen(false);
  };
  const abrirFormularioEditar = () => {
    setOpenFormularioEditar(true);
    setOpen(false);
  };

  const cerrarFormularioEditar = () => {
    setOpenFormularioEditar(false);
    setSelectCriterio(null);
  };

  return (
    <div>


  

      <div className="">
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="px-4 py-2 border w-1" scope="col">
                N°
              </th>
              <th className="px-4 py-2 border text-left" scope="col">
                Nombre
              </th>
              <th className="px-4 py-2 border text-left" scope="col">
                Categoria
              </th>
            </tr>
          </thead>
          <tbody>
            {Criterios.map((criterio, index) => (
              <tr
                key={criterio.idCriterio}
                onDoubleClick={() => seleccionarFila(criterio)}
                className="hover:bg-[#035a98] cursor-pointer"
              >
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{criterio.nombreCriterio}</td>
                <td className="px-4 py-2 border">
                  {criterio.puntosCriterio}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

