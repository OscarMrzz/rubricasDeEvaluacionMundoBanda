import { bandaDatosAmpleosInterface } from "@/interfaces/interfaces";
import React from "react";
import OverleyModal from "@/component/modales/OverleyModal/Page";
import InformacionBandaComponent from "@/component/informacion/informacionBandaComponent/Page";

type Props = {
  bandas: bandaDatosAmpleosInterface[];
  onRefresh?: () => void; // Función para refrescar los datos
};

const TablaBandasComponent = ({ bandas, onRefresh }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [selectedBanda, setSelectedBanda] =
    React.useState<bandaDatosAmpleosInterface | null>(null);

  // Orden personalizado: Premier, A, B
  const categoriaOrden = {
    Premier: 0,
    A: 1,
    B: 2,
  } as const;
  const bandasOrdenadas = [...bandas].sort((a, b) => {
    const bandaA = a.nombreBanda?.toLowerCase() || "";
    const bandaB = b.nombreBanda?.toLowerCase() || "";
    if (bandaA < bandaB) return -1;
    if (bandaA > bandaB) return 1;
    // Ordenar por categoría personalizada
    const catA =
      categoriaOrden[
        a.categorias?.nombreCategoria as keyof typeof categoriaOrden
      ] ?? 99;
    const catB =
      categoriaOrden[
        b.categorias?.nombreCategoria as keyof typeof categoriaOrden
      ] ?? 99;
    return catA - catB;
  });

  const seleccionarFila = (categoria: bandaDatosAmpleosInterface) => {
    setSelectedBanda(categoria);
    setOpen(true);
  };
  const cerrarModal = () => {
    setOpen(false);
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
            />
          )}
        </OverleyModal>

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
              {bandasOrdenadas.map((banda, index) => (
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
