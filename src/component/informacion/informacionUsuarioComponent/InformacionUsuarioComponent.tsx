

import { activarRefrescarDataPerfiles } from "@/feacture/Perfil/refrescadorPerfiles";
import { perfilDatosAmpleosInterface, perfilInterface } from "@/interfaces/interfaces";
import PerfilesServices from "@/lib/services/perfilesServices";

import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

import React from "react";
import { useDispatch } from "react-redux";
type Props = {
  perfil: perfilDatosAmpleosInterface;
  onClose: () => void; // Función para cerrar el modal
  onRefresh?: () => void; // Función para refrescar los datos
  openFormEditar: () => void; // Función para abrir el formulario de edición
};

export default function InformacionUsuarioComponent({
  perfil,
  onClose,
  onRefresh,
  openFormEditar,
}: Props) {

  const dispatch = useDispatch();
  const eliminar = () => {
    try {
      const perfilesServices = new PerfilesServices();
      const rol="sinPermisos"
      const  idFederacion ="3ad8c36d-c54a-4642-bfee-50736e04c991"
      const nuevoEstadoUsuario: perfilInterface ={ 
        idPerfil:perfil.idPerfil,
        created_at:perfil.created_at,
        nombre:perfil.nombre,
        alias:perfil.alias,
        tipoUsuario:perfil.tipoUsuario,
        fechaNacimiento:perfil.fechaNacimiento,
        sexo:perfil.sexo,
        genero:perfil.genero,
        identidad:perfil.identidad,
        numeroTelefono:perfil.numeroTelefono,
        direccion:perfil.direccion,
        idForaneaUser:perfil.idForaneaUser,
        idForaneaFederacion:perfil.idForaneaFederacion

       };
      nuevoEstadoUsuario.tipoUsuario=rol
      nuevoEstadoUsuario.idForaneaFederacion=idFederacion
   
      perfilesServices.EliminarPerfilDeFederacion(perfil.idPerfil,nuevoEstadoUsuario);
     console.log("Perfil eliminado correctamente");


    } catch (error) {
      console.error("❌ Error eliminando el perfil:", error);
    }finally{
      dispatch(activarRefrescarDataPerfiles());
      onClose?.();
    }
  
  };
  const onclickEditar = () => {
    openFormEditar?.();
    onClose?.();
  };

  return (
    <div className="max-h-[450px] overflow-auto scrollbar-estetica">
      <div className="grid grid-cols-[1fr_60px] gap-4 p-8">
        <div className="">
      
          <div className="  ">
            <h2>{perfil.nombre}</h2>
            <p>Alias: {perfil.alias}</p>
            <p>Tipo Usuario: {perfil.tipoUsuario}</p>
            <p>Fecha Nacimiento: {perfil.fechaNacimiento}</p>
            <p>Genero: {perfil.genero}</p>
            <p>Sexo: {perfil.sexo}</p>
            <p>Identidad: {perfil.identidad}</p>
            <p>Numero Telefono: {perfil.numeroTelefono}</p>
            <p>Direccion: {perfil.direccion}</p>
            <p>Federacion: {perfil.federaciones?.nombreFederacion}</p>
      
            

         
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
       
      </div>
    </div>
  );
}
