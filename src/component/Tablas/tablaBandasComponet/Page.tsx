import { bandaDatosAmpleosInterface, categoriaInterface } from "@/interfaces/interfaces";
import React from "react";
import OverleyModal from "@/component/modales/OverleyModal/Page";
import InformacionBandaComponent from "@/component/informacion/informacionBandaComponent/Page";
import OverleyModalFormulario from "@/component/modales/OverleyModalFormulario/Page";
import FormularioEditarBandaComponent from "@/component/formularios/bandaFormulario/formularioEditarBandaComponent/Page";
 

type Props = {
  bandas: bandaDatosAmpleosInterface[];
    categorias: categoriaInterface[] // Asumiendo que las categorías tienen un campo nombreCategoria
  onRefresh?: () => void; // Función para refrescar los datos
};

const TablaBandasComponent = ({ bandas, categorias, onRefresh }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [openFormEditar, setOpenFormEditar] = React.useState(false);
  const [selectedBanda, setSelectedBanda] =
    React.useState<bandaDatosAmpleosInterface | null>(null);

  // Orden personalizado: Premier, A, B

  const bandasOrdenadas = (bandasParaOrdenar:bandaDatosAmpleosInterface[]) => {
    const listaBandas = [...bandasParaOrdenar];
   const  bandasPorCategorias: Record<string, bandaDatosAmpleosInterface[]> = {};
   const listaFinalBandas: bandaDatosAmpleosInterface[] = [];
   for(const categoria of categorias) {
      bandasPorCategorias[categoria.nombreCategoria] = listaBandas.filter(
        (banda) => banda.categorias.nombreCategoria === categoria.nombreCategoria
      );
    }

    for (const categoria of categorias) {
        const bandasCategoria = bandasPorCategorias[categoria.nombreCategoria];
        for (const banda of bandasCategoria) {
          listaFinalBandas.push(banda);
        }

    }
    return listaFinalBandas.reverse();

 
  };

  const seleccionarFila = (categoria: bandaDatosAmpleosInterface) => {
    setSelectedBanda(categoria);
    setOpen(true);
  };
  const cerrarModal = () => {
    setOpen(false);
  };
  const abrirModalEditar = () => {
    setOpenFormEditar(true);

  };
  

  const cerrarModalEditar = () => {
    setOpenFormEditar(false);
  };
 
  return (
    <>
      <div className=" ">
        <OverleyModal open={open} onClose={cerrarModal}>
          {selectedBanda && (
            <InformacionBandaComponent
              Banda={selectedBanda}
              onClose={cerrarModal}
              onRefresh={onRefresh}
              openFormEditar={abrirModalEditar}
            /> 
          )}
        </OverleyModal>

    <OverleyModalFormulario 
      open={openFormEditar} 
      onClose={cerrarModalEditar} 
    >
      {selectedBanda && (
        <FormularioEditarBandaComponent
          onClose={cerrarModalEditar}
          refresacar={onRefresh ?? (() => {})}
          bandaAEditar={selectedBanda}
        />
      )}
    </OverleyModalFormulario>

        <div className="">
          <table className="min-w-full  border  ">
            <thead>
              <tr className="">
                <th className="sticky top-0 bg-[#065b98] z-10 px-4 py-2 border w-1">
                  N°
                </th>
                <th className="sticky top-0 bg-[#065b98] z-10 px-4 py-2 border">
                  Nombre
                </th>
                <th className="sticky top-0 bg-[#065b98] z-10 px-4 py-2 border">
                  Categoria
                </th>
                <th className="sticky top-0 bg-[#065b98] z-10 px-4 py-2 border">
                  Region
                </th>
              </tr>
            </thead>
            <tbody>
              {bandasOrdenadas(bandas).map((banda, index) => (
                <tr
                  key={banda.idBanda}
                  onDoubleClick={() => seleccionarFila(banda)}
                  className="hover:bg-[#035a98] cursor-pointer"
                >
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{banda.nombreBanda}</td>
                  <td className="px-4 py-2 border">
                    {banda.categorias.nombreCategoria}
                  </td>
                  <td className="px-4 py-2 border">
                    {banda.regiones.nombreRegion}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TablaBandasComponent;
