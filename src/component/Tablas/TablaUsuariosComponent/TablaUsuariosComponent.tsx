import { activarOverleyInformacionPerfiles } from "@/feacture/Perfil/overleyPerfil";
import { setPerfilSeleccionado } from "@/feacture/Perfil/PerfilSlice";
import { perfilDatosAmpleosInterface } from "@/interfaces/interfaces";
import React from "react";
import { useDispatch } from "react-redux";


type Props = {
  Perfiles: perfilDatosAmpleosInterface[];
};
export default function TablaRegistroPerfilesComponent({
  Perfiles,
}: Props) {
    
  const dispatch = useDispatch();

  const seleccionarFila = (perfil: perfilDatosAmpleosInterface) => {
    dispatch(setPerfilSeleccionado(perfil));
    dispatch(activarOverleyInformacionPerfiles());
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
                Tipo Usuario
              </th>
            
            </tr>
          </thead>
          <tbody>
            {Perfiles.map((perfil: perfilDatosAmpleosInterface, index: number) => (
              <tr
                key={perfil.idPerfil}
                onDoubleClick={() => seleccionarFila(perfil)}
                className="hover:bg-[#035a98] cursor-pointer"
              >
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{perfil.nombre}</td>
                <td className="px-4 py-2 border">{perfil.tipoUsuario}</td>
           
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
