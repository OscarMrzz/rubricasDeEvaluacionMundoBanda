import React, { use } from "react";

import {  activarOverleyInformacionCumplimiento } from "@/feacture/overleys/overleySlice";
import { useDispatch, useSelector } from "react-redux";
import { setCumplimientoSeleccionado } from "@/feacture/cumplimientos/cumplimientosSlice";
import { cumplimientosDatosAmpleosInterface } from "@/interfaces/interfaces";
import { RootState } from "@/app/store";


type Props = {
  cumpimientos: cumplimientosDatosAmpleosInterface[];
  onRefresh?: () => void; // Función para refrescar los datos
};

export default function TablaCumplimientosComponent({ cumpimientos, onRefresh }: Props) {
   const dispatch = useDispatch();




  const seleccionarFila = (cumplimiento: cumplimientosDatosAmpleosInterface) => {
    dispatch(setCumplimientoSeleccionado(cumplimiento));
    dispatch(activarOverleyInformacionCumplimiento());
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
                Detalles
              </th>
              <th className="px-4 py-2 border text-left" scope="col">
                Puntos
              </th>
            </tr>
          </thead>
          <tbody>
            {cumpimientos.map((criterio, index) => (
              <tr
                key={criterio.idCumplimiento}
                onDoubleClick={() => seleccionarFila(criterio)}
                className="hover:bg-[#035a98] cursor-pointer"
              >
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{criterio.detalleCumplimiento}</td>
                <td className="px-4 py-2 border">
                  {criterio.puntosCumplimiento}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

