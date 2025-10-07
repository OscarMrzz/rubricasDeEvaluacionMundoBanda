import {
  criterioEvaluacionDatosAmpleosInterface,
  cumplimientosDatosAmpleosInterface,
} from "@/interfaces/interfaces";
import cumplimientossServices from "@/lib/services/cumplimientosServices";
import React, { useEffect } from "react";

type Props = {
  criterioSelecionado: criterioEvaluacionDatosAmpleosInterface;
};

export default function EvaluarCriterioComponent({
  criterioSelecionado,
}: Props) {
  const [listCumplimientoOriginales, setListCumplimientoOriginales] =
    React.useState<cumplimientosDatosAmpleosInterface[]>([]);
  const [listCumplimiento, setListCumplimiento] = React.useState<
    cumplimientosDatosAmpleosInterface[]
  >([]);
  const [cumplimientoSelecionado, setCumplimientoSelecionado] =
    React.useState<cumplimientosDatosAmpleosInterface | null>(null);

  const [cargandoCumplimientos, setCargandoCumplimientos] =
    React.useState<boolean>(true);

  useEffect(() => {
    const fetchCumplimientos = async () => {
      setCargandoCumplimientos(true);
      try {
        const cumplimientoServices = new cumplimientossServices();
        const datosCumplimientos = await cumplimientoServices.getDatosAmpleos();
        setListCumplimientoOriginales(datosCumplimientos);
      } catch (error) {
        console.error("Error fetching cumplimientos:", error);
      } finally {
        setCargandoCumplimientos(false);
      }
    };
    fetchCumplimientos();
  }, []);

  useEffect(() => {
    if (listCumplimientoOriginales.length > 0) {
      const cumplimientosFiltrados = listCumplimientoOriginales.filter(
        (cumplimiento) =>
          cumplimiento.idForaneaCriterio === criterioSelecionado.idCriterio
      );
      setListCumplimiento(cumplimientosFiltrados);
    }
  }, [criterioSelecionado, listCumplimientoOriginales]);

  return (
    <div className="w-full h-120 shadow-2xl  bg-gray-700 p-4">
      <div>
        <h3 className="text-xl font-bold">
          {criterioSelecionado.nombreCriterio}
        </h3>
        <p>{criterioSelecionado.detallesCriterio}</p>
        <p>{criterioSelecionado.puntosCriterio}</p>
      </div>
      {cargandoCumplimientos ? (
        <div className="w-full">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-500  w-3/4"></div>
            <div className="h-8 bg-gray-500  w-5/6"></div>
            <div className="h-8 bg-gray-500  w-2/3"></div>
          </div>
        </div>
      ) : (
        <form className="flex flex-col gap-6">
          {listCumplimiento.map((cumplimiento) => (
            <label
              key={cumplimiento.idCumplimiento}
              className={`flex flex-row cursor-pointer border-2 border-transparent  p-2
        ${
          cumplimientoSelecionado?.idCumplimiento ===
          cumplimiento.idCumplimiento
            ? "bg-blue-400 hover:border-blue-300"
            : "bg-gray-600 hover:border-gray-500"
        }`}
            >
              <input
                type="radio"
                name="cum"
                value={cumplimiento.idCumplimiento}
                onChange={() => setCumplimientoSelecionado(cumplimiento)}
                className="hidden"
              />
              <div className="flex flex-row gap-4 ml-4">
                <span>{cumplimiento.puntosCumplimiento}</span>
                <span>|</span>
                <span>{cumplimiento.detalleCumplimiento}</span>
              </div>
            </label>
          ))}
        </form>
      )}
    </div>
  );
}
