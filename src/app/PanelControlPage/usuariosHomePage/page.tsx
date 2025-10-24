"use client";

import { useEffect, useState } from "react";
import SkeletonTabla from "@/component/skeleton/SkeletonTabla/Page";
import React from "react";
import OverleyModalFormulario from "@/component/modales/OverleyModalFormulario/Page";
import { PlusIcon } from "@heroicons/react/16/solid";
import {perfilDatosAmpleosInterface} from "@/interfaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import {} from "@/feacture/overleys/overleySlice";
import OverleyModal from "@/component/modales/OverleyModal/Page";
import { activarOverleyFormularioAgregarPerfiles, activarOverleyFormularioEditarPerfiles, activarOverleyInformacionPerfiles, desactivarOverleyFormularioAgregarPerfiles, desactivarOverleyFormularioEditarPerfiles, desactivarOverleyInformacionPerfiles } from "@/feacture/Perfil/overleyPerfil";
import { desactivarRefrescarDataPerfiles } from "@/feacture/Perfil/refrescadorPerfiles";
import PerfilesServices from "@/lib/services/perfilesServices";
import InformacionUsuarioComponent from "@/component/informacion/informacionUsuarioComponent/InformacionUsuarioComponent";
import FormularioAgregarUsuario from "@/component/formularios/Perfil/Agregar/FormularioAgregarUsuario";
import FormularioEditarUsuario from "@/component/formularios/Perfil/editar/FormularioEditarUsuario";
import TablaRegistroPerfilesComponent from "@/component/Tablas/TablaUsuariosComponent/TablaUsuariosComponent";
import { div } from "framer-motion/client";
import { setPerfilSeleccionado } from "@/feacture/Perfil/PerfilSlice";

export default function PerfilesHomePage() {

  const dispatch = useDispatch();

  const refrescadorDataPerfiles = useSelector(
    (state: RootState) => state.refrescadorDataPerfiles.RefrescadorDataPerfiles
  );
  const activadorOverleyFormularioAgregarPerfiles = useSelector(
    (state: RootState) =>
      state.overleyPerfiles.activadorOverleyFormularioAgregarPerfiles
  );

  const activadorOverleyInformacionPerfiles = useSelector(
    (state: RootState) =>
      state.overleyPerfiles.activadorOverleyInformacionPerfiles
  );
  const activadorOverleyFormularioEditarEPerfiles = useSelector(
    (state: RootState) =>
      state.overleyPerfiles.activadorOverleyFormularioEditarPerfiles
  );
  const perfilSeleccionado = useSelector(
    (state: RootState) => state.perfil.perfilSeleccionado
  );

  const [perfiles, setPerfiles] = useState<perfilDatosAmpleosInterface[]>(
    []
  );

  const [loading, setLoading] = useState(true);
 

  const abrirFormularioAgregar = () => {
    dispatch(activarOverleyFormularioAgregarPerfiles());
  };
  // Removed duplicate declaration of cerrarFormularioAgregarCriterio

  useEffect(() => {
    traerDatosTabla();
  }, []);





  useEffect(() => {
    if (refrescadorDataPerfiles) {
      traerDatosTabla();
      dispatch(desactivarRefrescarDataPerfiles());
    }
  }, [refrescadorDataPerfiles]);

  async function traerDatosTabla() {
    const perfilesServices = new PerfilesServices();
    try {
      const perfilActivo: perfilDatosAmpleosInterface =await perfilesServices.getUsuarioLogiado();

      const perfilesData: perfilDatosAmpleosInterface[] =await perfilesServices.getDatosAmpleos(perfilActivo.idForaneaFederacion,perfilActivo.tipoUsuario);

      setPerfiles(perfilesData);
      setPerfiles(perfilesData);
      setLoading(false);
    } catch (error) {
      console.error("❌ Error al obtener las Rubricas:", error);
      setLoading(false);
    } finally {
   
    }
  }

  const cerrarFormularioAgregarPerfil = () => {
    dispatch(desactivarOverleyFormularioAgregarPerfiles());
  };
  const cerrarInformacionPerfil = () => {
    dispatch(desactivarOverleyInformacionPerfiles());
  };
  const cerrarFormularioEditarPerfil = () => {
    dispatch(desactivarOverleyFormularioEditarPerfiles());
  };
  const ActivarFormularioEditarPerfil = () => {
    dispatch(activarOverleyFormularioEditarPerfiles());
  }

  const onDobleClickAbrirInformacion =  (perfil: perfilDatosAmpleosInterface) => {
    
    dispatch(activarOverleyInformacionPerfiles());
    dispatch(setPerfilSeleccionado(perfil));
  }

  return (
    <div className="px-2 lg:px-20">
      <OverleyModal
        open={activadorOverleyInformacionPerfiles}
        onClose={cerrarInformacionPerfil}
      >
        {perfilSeleccionado && (
          <InformacionUsuarioComponent
            perfil={perfilSeleccionado!}
            onClose={cerrarInformacionPerfil}
            onRefresh={() => {}}
            openFormEditar={ActivarFormularioEditarPerfil}
          />
        )}
      </OverleyModal>
      <OverleyModalFormulario
        open={activadorOverleyFormularioAgregarPerfiles}
        onClose={cerrarFormularioAgregarPerfil}
      >
        <FormularioAgregarUsuario
          onClose={cerrarFormularioAgregarPerfil}
        />
      </OverleyModalFormulario>

      <OverleyModalFormulario
        open={activadorOverleyFormularioEditarEPerfiles}
        onClose={cerrarFormularioEditarPerfil}
      >
        <FormularioEditarUsuario
          perfilAEditar={perfilSeleccionado!}
          //

          onClose={cerrarFormularioEditarPerfil}
        />
      </OverleyModalFormulario>

      <div>
        <div>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold mb-4">Usuarios</h1>
             <button
              className="cursor-pointer flex justify-center items-center gap-2"
              onClick={abrirFormularioAgregar}
            >
              <PlusIcon className="w-5 h-5 bg-blue-600  rounded-2xl" />
              Agregar
            </button>
          </div>
        
        </div>
      </div>
      {loading ? (
        <SkeletonTabla />
      ) : (
        <>
        <div className="flex flex-col  gap-4 w-full ">

       
       {
        perfiles.map((perfil) => {
          return (
            <div onDoubleClick ={()=>onDobleClickAbrirInformacion(perfil)}  key={perfil.idPerfil} className="h-25 p-4 flex flex-wrap justify-between w-full bg-slate-700 cursor-pointer hover:bg-slate-600">
              <h2 className="text-xl">{perfil.nombre}</h2>
              <p className="">{perfil.tipoUsuario}</p>

            </div>
          )
        }
        
      
      )
  
       }
      
         </div>
        </>
     
      )}
    </div>
  );
}
