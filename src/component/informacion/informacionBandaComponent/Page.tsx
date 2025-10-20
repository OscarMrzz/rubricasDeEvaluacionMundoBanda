import { bandaDatosAmpleosInterface } from "@/interfaces/interfaces";
import BandasServices from "@/lib/services/bandasServices";
import React from "react";

type Props = {
  Banda: bandaDatosAmpleosInterface;
  onClose?: () => void;
  onRefresh?: () => void;
  openFormEditar?: () => void;
  urlLogoBanda: string;
  puntosTemporada: number;
  promedioTemporada: number;
  posicionTablaTemporada: number;
};

const InformacionBandaComponent = ({
  Banda,
  onClose,
  onRefresh,
  openFormEditar,
  urlLogoBanda,
  puntosTemporada,
  promedioTemporada,
  posicionTablaTemporada,
}: Props) => {
  const eliminarBanda = () => {
    const bandasServices = new BandasServices();
    bandasServices
      .delete(Banda.idBanda)
      .then(() => {
        onRefresh?.(); // Refrescar los datos
        onClose?.(); // Cerrar el modal después de eliminar
      })
      .catch((error: unknown) => {
        console.error("❌ Error al eliminar la banda:", error);
      });
  };

  const onclickEditar = () => {
    openFormEditar?.();
    onClose?.();
  };

  return (
    <div>
      <div className="flex px-10 pt-4 justify-between">
        <div className=" ">
          <div className="w-25 aspect-square  object-cover">
            {urlLogoBanda ? <img src={urlLogoBanda} alt="Logo Banda" className="object-cover" /> : null}
          </div>
          <h2 className="text-2xl text-gray-300 font-bold pb-4">{Banda.nombreBanda}</h2>
        </div>

        <div className="flex flex-col gap-2">
          <button className="border-2 border-white w-20 p-1 hover:bg-blue-400 cursor-pointer" onClick={eliminarBanda}>
            Eliminar
          </button>
          <button className="border-2 border-white w-20 p-1 hover:bg-blue-400 cursor-pointer" onClick={onclickEditar}>
            Editar
          </button>
        </div>
      </div>
      <div className="w-full px-4 h-full">
        <div className="w-full border-t-2 border-gray-400 flex h-full p-4">
          <div className=" border-r-2 border-gray-400 p-4 w-full h-full">
            <p className="text-gray-200">
              <span className="font-bold">Alias:</span> {Banda.AliasBanda}
            </p>
            <p className="text-gray-200">
              <span className="font-bold">Categoria:</span> {Banda.categorias.nombreCategoria}
            </p>
            <p className="text-gray-200">
              <span className="font-bold">Región:</span> {Banda.regiones.nombreRegion}
            </p>
          </div>
          <div className="w-full h-full p-4">
            <p className="text-gray-200">
              <span className="font-bold">Posicion:</span> {posicionTablaTemporada}
            </p>
            <p className="text-gray-200">
              <span className="font-bold">Puntos:</span> {puntosTemporada}
            </p>
            <p className="text-gray-200">
              <span className="font-bold">Promedio:</span> {promedioTemporada}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformacionBandaComponent;
