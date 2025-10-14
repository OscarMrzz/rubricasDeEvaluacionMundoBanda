import React from "react";
import OverleyModal from "../../modales/OverleyModal/Page";

import OverleyModalFormulario from "../../modales/OverleyModalFormulario/Page";
import { rubricaDatosAmpleosInterface } from "@/interfaces/interfaces";
import InformacionRubricaComponent from "@/component/informacion/informacionRubricaComponent/Page";
import FormularioEditarRubricaComponent from "@/component/formularios/FormulariosRubricas/FormularioEditarRubricaComponent/Page";
import FormularioAgregarCriterioComponet from "@/component/formularios/FormularioCriterio/FormularioAgregarCriterioComponent/FormularioAgregarCriterioComponet";
import { useDispatch, useSelector } from "react-redux";
import { activarOverleyInformacionRubrica,  } from "@/feacture/overleys/overleySlice";
import { recetiarRubricaSeleccionada, setRubricaSeleccionada } from "@/feacture/Rubrica/rubricaSlice"; // <-- Import the correct action creator
// import your actual Redux root state type
import { RootState } from "@/app/store";

type Props = {
  rubricas: rubricaDatosAmpleosInterface[];
  onRefresh?: () => void; // Función para refrescar los datos
};



export default function TablaRubricasComponent({ rubricas, onRefresh }: Props) {
  const RubricaSeleccionada = useSelector(
    (state: RootState) => state.rubrica.RubricaSeleccionada
  );
      const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [openFormularioEditar, setOpenFormularioEditar] = React.useState(false);
  

 

  const seleccionarFila = (rubrica: rubricaDatosAmpleosInterface) => {

    dispatch( setRubricaSeleccionada(rubrica));
    dispatch(activarOverleyInformacionRubrica());
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
    dispatch(recetiarRubricaSeleccionada());
  };




  return (
    <div>
 

 

      <div className="w-full">
        <table className="w-full border">
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
            {rubricas.map((rubrica, index) => (
              <tr
                key={rubrica.idRubrica}
                onDoubleClick={() => seleccionarFila(rubrica)}
                className="hover:bg-[#035a98] cursor-pointer"
              >
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{rubrica.nombreRubrica}</td>
                <td className="px-4 py-2 border">
                  {rubrica.categorias?.nombreCategoria}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


