import React from "react";
import OverleyModal from "../../modales/OverleyModal/Page";

import OverleyModalFormulario from "../../modales/OverleyModalFormulario/Page";
import { rubricaDatosAmpleosInterface } from "@/interfaces/interfaces";
import InformacionRubricaComponent from "@/component/informacion/informacionRubricaComponent/Page";
import FormularioEditarRubricaComponent from "@/component/formularios/FormulariosRubricas/FormularioEditarRubricaComponent/Page";

type Props = {
  rubricas: rubricaDatosAmpleosInterface[];
  onRefresh?: () => void; // Función para refrescar los datos
};

export default function TablaRubricasComponent({ rubricas, onRefresh }: Props) {
  const [open, setOpen] = React.useState(false);
  const [openFormularioEditar, setOpenFormularioEditar] = React.useState(false);

  const [selectedRubrica, setSelectedRubrica] =
    React.useState<rubricaDatosAmpleosInterface | null>(null);

  const seleccionarFila = (rubrica: rubricaDatosAmpleosInterface) => {
    setSelectedRubrica(rubrica);
    setOpen(true);
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
    setSelectedRubrica(null);
  };

  return (
    <div>
      <OverleyModal open={open} onClose={cerrarModal}>
        {selectedRubrica && (
          <InformacionRubricaComponent
            rubrica={selectedRubrica}
            onClose={cerrarModal}
            onRefresh={onRefresh}
            openFormEditar={abrirFormularioEditar}
          />
        )}
      </OverleyModal>

      <OverleyModalFormulario
        open={openFormularioEditar}
        onClose={cerrarFormularioEditar}
      >
        <FormularioEditarRubricaComponent
          rubricaAEditar={selectedRubrica!}
          //

          onClose={cerrarFormularioEditar}
          refresacar={() => {
            onRefresh?.();
            cerrarFormularioEditar();
          }}
        />
      </OverleyModalFormulario>

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
