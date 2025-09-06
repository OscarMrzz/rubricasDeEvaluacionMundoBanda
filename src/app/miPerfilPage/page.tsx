/* eslint-disable @next/next/no-img-element */
"use client";
import FormularioEditarUsuario from "@/component/formularios/Perfil/editar/FormularioEditarUsuario";
import OverleyModalFormulario from "@/component/modales/OverleyModalFormulario/Page";
import { perfilDatosAmpleosInterface } from "@/interfaces/interfaces";
import PerfilesServices from "@/lib/services/perfilesServices";
import React, { useEffect, useState } from "react";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { activarOverleyFormularioCambiarPassword, activarOverleyFormularioEditarPerfiles, desactivarOverleyFormularioCambiarPassword, desactivarOverleyFormularioEditarPerfiles } from "@/feacture/Perfil/overleyPerfil";
import FormularioCambiarPassword from "@/component/formularios/Perfil/CambierContraseña/CambiarPassword";
import ApprovateMessage from "@/component/Message/ApprovateMessage";
import ErrorMessage from "@/component/Message/ErrorMessage";

export default function MiPerfilPage() {

      const [ActivadorApprovateMessage, setActivadorApprovateMessage] = useState(false);
      const [mensajeApprovate, setMensajeApprovate] = useState({titulo:"Exito", texto:""});
  
          const activarMessageApprovate = () => {
          setMensajeApprovate({titulo:"Contraseña actualizada", texto:"La contraseña se ha actualizado con éxito."});
        setActivadorApprovateMessage(true);
   
      }
    const dispatch = useDispatch();
    const activadorOverleyFormularioEditarEPerfiles = useSelector(
    (state: RootState) =>
      state.overleyPerfiles.activadorOverleyFormularioEditarPerfiles
  );
  

  const activadorOverleyFormularioCambiarPassword = useSelector(
    (state: RootState) =>
      state.overleyPerfiles.activadorOverleyFormularioCambiarPassword
  );
  const [perfil, setPerfil] = useState<perfilDatosAmpleosInterface>(
    {} as perfilDatosAmpleosInterface
  );

  useEffect(() => {
    traerInformacionUsuarioLogaido();
  }, []);

  const traerInformacionUsuarioLogaido = async () => {
    try {
      const perfilesServices = new PerfilesServices();
      const perfilActivo: perfilDatosAmpleosInterface =
        await perfilesServices.getUsuarioLogiado();
      setPerfil(perfilActivo);
    } catch (error) {
      console.error(
        "❌ Error trayendo la informacion del usuario logeado:",
        error
      );
    } finally {
    }
  };

    const cerrarFormularioEditarPerfil = () => {
      dispatch(desactivarOverleyFormularioEditarPerfiles());
      traerInformacionUsuarioLogaido();
    };
    const cerrarFormularioCambiarPassword = () => {
      dispatch(desactivarOverleyFormularioCambiarPassword());
      
    };


    const ActivarFormularioEditarPerfil = () => {
      dispatch(activarOverleyFormularioEditarPerfiles());
    };

    const activarFormularioCambiarPassword = () => {
      dispatch(activarOverleyFormularioCambiarPassword());
    }


  

  return (
    <>
    <OverleyModalFormulario
    open={activadorOverleyFormularioEditarEPerfiles}
    onClose={cerrarFormularioEditarPerfil}
    
    
    >
      <FormularioEditarUsuario
      perfilAEditar={perfil}
      onClose={cerrarFormularioEditarPerfil}
      
      />
    </OverleyModalFormulario>

    <OverleyModalFormulario
      open={activadorOverleyFormularioCambiarPassword}
      onClose={cerrarFormularioCambiarPassword}
    
    >
      <FormularioCambiarPassword
      onclose={cerrarFormularioCambiarPassword}
      activarMessageApprovate={activarMessageApprovate}
      
      />

    </OverleyModalFormulario>

       <ApprovateMessage
      open={ActivadorApprovateMessage}
      onClose={()=>{setActivadorApprovateMessage(false)}}
      titulo={mensajeApprovate.titulo}
      texto={mensajeApprovate.texto}
      
      />

    <div className="p-20 flex items-center justify-center">
      <div className="bg-gray-800  w-4xl h-120 shadow-lg rounded-lg grid grid-cols-2 ">
        <div className="  h-full w-full flex flex-col items-start justify-start p-10">
          <h2 className="text-3xl text-primario font-bold ">{perfil.nombre}</h2>
          <div className="flex flex-col gap-2">

         
          <p>
            <b className="text-stone-300">Alias:</b> {perfil.alias}
          </p>
          <p>
            <b className="text-stone-300">Fecha de nacimiento:</b> {perfil.fechaNacimiento}
          </p>
          <p>
            <b className="text-stone-300">Género:</b> {perfil.genero}
          </p>
          <p>
            <b className="text-stone-300">Rol:</b> {perfil.tipoUsuario}
          </p>
          <p>
            <b className="text-stone-300">Sexo:</b> {perfil.sexo}
          </p>
          <p>
            <b className="text-stone-300">Identidad:</b> {perfil.identidad}
          </p>
          <p>
            <b className="text-stone-300">Número de teléfono:</b> {perfil.numeroTelefono}
          </p>
          <p>
            <b className="text-stone-300">Dirección:</b> {perfil.direccion}
          </p>
          <p>
            <b className="text-stone-300">Federación:</b> {perfil.federaciones?.nombreFederacion}
          </p>
           </div>
           <div className="flex gap-2">

        <button onClick={ActivarFormularioEditarPerfil} className="bg-primario text-20 p-2 cursor-pointer mt-5">Editar perfil</button>
        <button onClick={activarFormularioCambiarPassword} className="bg-primario text-20 p-2 cursor-pointer mt-5">Cambiar contraseseña</button>
           </div>
        </div>
        <div>
          <div className=" h-full w-full flex items-center justify-center">
            <div className="w-90 h-90 rounded-full bg-gray-200 flex items-center justify-center shadow-lg">
              <div className="w-85 h-85 rounded-full bg-gray-400 flex items-center justify-center shadow-lg overflow-hidden">
                <img src="imgs\noFotoPerfil.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
