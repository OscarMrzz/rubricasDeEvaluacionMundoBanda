
import {
  cumplimientosInterface,
  perfilDatosAmpleosInterface,

  registroCumplimientoEvaluacionInterface,

  respuestaSolicitudRevicionInterface,

  solicitudRevicionInterface,
  vistaSolicitudRevicionInterface,
} from "@/interfaces/interfaces";
import React, { useEffect, useRef, useState } from "react";
import SolicitudRevicionServices from "@/lib/services/solicitudRevicionServices";
import cumplimientossServices from "@/lib/services/cumplimientosServices";
import RespuestaSolicitudRevicionesServices from "@/lib/services/respuestaSolicitudRevicionesServices";
import RegistroCumplimientoServices from "@/lib/services/RegistroCumplimientosServices";
import { a } from "framer-motion/client";


type OverleyModalProps = {
  open: boolean;
  onClose: () => void;
  solicitudRevicion: vistaSolicitudRevicionInterface;
};

export default function InformacionSolicitudRevicion({ open, onClose, solicitudRevicion }: OverleyModalProps) {
 







  const [justificacion, setJustificacion] = React.useState("");
  const [perfil, setPerfil] = useState<perfilDatosAmpleosInterface>({} as perfilDatosAmpleosInterface);
  const [listCumplimientos, setListCumplimientos] = useState<cumplimientosInterface[]>([]);
  const [aprobacion, setaprobacion] = useState<string>("pendiente");
  const [idCumplimientoSeleccionado, setIdCumplimientoSeleccionado] = useState<string>(
    solicitudRevicion?.idForaneaCumplimiento || ""
  );

  const cumplimientosServices = useRef(new cumplimientossServices());
  const respuestaSolicitudRevicionServices = useRef(new RespuestaSolicitudRevicionesServices());
  const solicitudRevicionServices = useRef(new SolicitudRevicionServices());
  const registroCumpliminetoServices = useRef(new RegistroCumplimientoServices());
  const [enviarPrecionado, setEnviarPrecionado] = useState(false);

  useEffect(() => {
    const perfilCookie = document.cookie.split(";").find((c) => c.trim().startsWith("perfilActivo="));
    const perfilBruto = perfilCookie ? decodeURIComponent(perfilCookie.split("=")[1]) : null;
    if (perfilBruto) {
      const perfil: perfilDatosAmpleosInterface = JSON.parse(perfilBruto);
      if (perfil) {
        setPerfil(perfil);
      }
    }
  }, []);

  const aprobarCambios = async () => {
    const cumplimientos = await cumplimientosServices.current.getPorCriterio(solicitudRevicion.idForaneaCriterio);
    setListCumplimientos(cumplimientos);
    setaprobacion("aprobado");
  };
  const denegarCambios = async () => {
    setaprobacion("denegado");
 
  };

  const [Animar, setAnimar] = React.useState(false);
  useEffect(() => {
    if (open) {
      setAnimar(false);
      setTimeout(() => {
        setAnimar(true);
      }, 10);
    } else {
      setAnimar(false); // Reinicia la animación al cerrar
    }
  }, [open]);

  const cerrarModal = () => {


    setAnimar(false);
    onClose();
  };





  const limpiarFormulario = () => {
    setJustificacion("");
    setaprobacion("pendiente");
    setIdCumplimientoSeleccionado( "");

  };

  const selecionarFilaCumplimiento = (idCumplimiento: string) => {
    setIdCumplimientoSeleccionado(idCumplimiento);
  }
  const cancelar = () => {
    setaprobacion("pendiente");
    
    setIdCumplimientoSeleccionado(solicitudRevicion?.idForaneaCumplimiento || "");
    onClose();
    limpiarFormulario();
    setEnviarPrecionado(false);
  };


  const enviarSolicitudRevision = async () => {
    setEnviarPrecionado(true);
    if (justificacion.length ===0 || aprobacion==="pendiente" ) return
   

    if(solicitudRevicion.idForaneaSolicitanteRevicion === undefined) return;


    const datosRegistroCumplimiento = await registroCumpliminetoServices.current.getOne(
      solicitudRevicion.idForaneaRegistroCumplimiento
    );

     const datosSolicitudActualizada: Partial<solicitudRevicionInterface> = {
    estado: aprobacion,
  };
    
      const datosRespuesta: Omit<respuestaSolicitudRevicionInterface, "idRespuesta" | "created_at"> = {
        idForaneaFederacion: perfil.idForaneaFederacion,
        idForaneaSolicitudRevicion: solicitudRevicion.idSolicitud,
        idForaneaRevisor: perfil.idPerfil,
        aprobacion: aprobacion,
        detallesRespuesta: justificacion,

    }
    
  
    try{

      await respuestaSolicitudRevicionServices.current.create(datosRespuesta as respuestaSolicitudRevicionInterface);
      await solicitudRevicionServices.current.update(solicitudRevicion.idSolicitud, datosSolicitudActualizada as solicitudRevicionInterface);
    
    }
    catch(error){
      console.error("Error al enviar la respuesta de la solicitud de revisión:", error);
      return;
    }
    try{


     if(aprobacion !== "aprobado") return;
      const nuevosDatosRegistroCumplimiento: Partial<registroCumplimientoEvaluacionInterface> = {
        idRegistroCumplimientoEvaluacion: datosRegistroCumplimiento.idRegistroCumplimientoEvaluacion,
        idForaneaEvento: datosRegistroCumplimiento.idForaneaEvento,
        idForaneaBanda: datosRegistroCumplimiento.idForaneaBanda,
        idForaneaCriterio: datosRegistroCumplimiento.idForaneaCriterio,
        idForaneaCumplimiento: aprobacion === "aprobado" ? idCumplimientoSeleccionado : datosRegistroCumplimiento.idForaneaCumplimiento,
        idForaneaCategoria: datosRegistroCumplimiento.idForaneaCategoria,
        idForaneaRegion: datosRegistroCumplimiento.idForaneaRegion,
        puntosObtenidos: aprobacion === "aprobado"
          ? listCumplimientos.find((cumplimiento) => cumplimiento.idCumplimiento === idCumplimientoSeleccionado)
              ?.puntosCumplimiento || datosRegistroCumplimiento.puntosObtenidos
          : datosRegistroCumplimiento.puntosObtenidos,
        idForaneaPerfil: datosRegistroCumplimiento.idForaneaPerfil,
        idForaneaFederacion: datosRegistroCumplimiento.idForaneaFederacion,
        idForaneaRubrica: datosRegistroCumplimiento.idForaneaRubrica,

      };
      await registroCumpliminetoServices.current.update(solicitudRevicion.idForaneaRegistroCumplimiento,nuevosDatosRegistroCumplimiento as registroCumplimientoEvaluacionInterface);
    }
    catch(error){
      console.error("Error al actualizar el registro de cumplimiento:", error);
      return;
    }


 

limpiarFormulario();
onClose();
}

  return (
    <>
    <div>
      <div>
        
      </div>


      {open ? (
        <div
          onDoubleClick={() => cerrarModal()}
          className="bg-gray-950/50 inset-0 z-100 fixed w-screen h-screen flex justify-center items-center"
        >
          <div
            className={`w-4xl h-140 bg-gray-800 px-4 lg:px-25 py-4 overflow-auto scrollbar-estetica ${
              Animar ? "scale-100" : "scale-75"
            } transition-all duration-500 ease-in-out`}
          >
            <div className="flex flex-col h-full">
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold">{solicitudRevicion?.nombreBanda}</h2>
                <p className="font-bold">
                  Rubrica: <span className="font-thin text-gray-400">{solicitudRevicion?.nombreRubrica}</span>
                </p>
                <p className="font-bold">
                  Criterio: <span className="font-thin text-gray-400">{solicitudRevicion?.nombreCriterio}</span>
                </p>
                <p className="font-bold">
                  Cumplimiento:{" "}
                  <span className="font-thin text-gray-400">{solicitudRevicion?.detalleCumplimiento}</span>
                </p>
                <p className="font-bold">
                  Puntos: <span className="font-thin text-gray-400">{solicitudRevicion?.puntosCumplimiento} %</span>
                </p>
                <p className="flex flex-col">
                  Detalles de la Solicitud:{" "}
                  <span className="text-gray-300 border bg-slate-600 min-h-35 p-2">
                    {solicitudRevicion?.detallesSolicitud}
                  </span>
                </p>
              </div>

              <div className="flex   h-full ">
                {solicitudRevicion.estado === "pendiente" && aprobacion ==="pendiente" ? (
                  <div className="flex gap-4 w-full h-full justify-center items-center">
                    <button
                      onClick={() => aprobarCambios()}
                      className="bg-emerald-400/50 border-2 px-6 py-4 cursor-pointer hover:bg-emerald-300/50"
                    >
                      Aprobar
                    </button>
                    <button
                      onClick={() => denegarCambios()}
                      className="bg-red-700/50 border-2 px-6 py-4 cursor-pointer hover:bg-red-400/50"
                    >
                      Denegar
                    </button>
                  </div>
                ) : (
                  <div className="mt-15 w-full ">
                    {aprobacion === "aprobado" || solicitudRevicion.estado === "aprobado"  ? (
                      <div className="">
                        <h2 className="text-emerald-400 font-bold text-2xl">Solicitud Aprobada</h2>
                        {
                          solicitudRevicion.estado !== "aprobado" ? (
                               <div className="flex flex-col gap-4">
                          <h3 className="text-lg font-bold mt-4 mb-2">Criterio: {solicitudRevicion.nombreCriterio}</h3>
                          {listCumplimientos.map((cumplimiento) => (
                            <div
                            onClick={()=>selecionarFilaCumplimiento(cumplimiento.idCumplimiento)}
                              key={cumplimiento.idCumplimiento}
                              className={`  p-4 cursor-pointer 
                            ${
                              cumplimiento.idCumplimiento === idCumplimientoSeleccionado
                                ? "bg-cyan-700 hover:bg-cyan-800"
                                : "bg-slate-700 hover:bg-slate-600"
                            }
                            
                            `}
                            >
                              <p className=" flex gap-4">
                                <span className=" text-gray-400 w-25 font-bold flex justify-center  items-center ">
                                  {cumplimiento.puntosCumplimiento} %
                                </span>

                                <span className="font-thin text-gray-400">{cumplimiento.detalleCumplimiento}</span>
                              </p>
                              <p className="font-bold"></p>
                            </div>
                          ))}
                        </div>
                          ) : null
                        }
                     
                      </div>
                    ) : (
                      <h2 className="text-red-600 font-bold text-2xl">Solicitud Denegada</h2>
                    )}
                    {
                      (solicitudRevicion.estado === "pendiente") && (
                            <form onSubmit={(e) => {
                      e.preventDefault()
                      enviarSolicitudRevision()}} className="" action="">
                    <div className="pt-5">
                           <textarea
                      maxLength={200}
                      rows={4}
                      value={justificacion}
                      onChange={(e) => setJustificacion(e.target.value)}
                      placeholder="Justifique..."
                      className={`w-full h-40 mb-4 bg-gray-700 border-2 border-gray-600 pr-4 pl-2 pt-2 pb-2
                        ${justificacion.length === 0 && enviarPrecionado
                          ? "border-red-500"
                          : ""
                    }
                        
                        `}
                    ></textarea>
                    </div>
                    <div className="flex w-full justify-end gap-4 pb-10">
                        <button onClick={()=>cancelar()} className=" px-6 py-2 border cursor-pointer  hover:bg-cyan-800/50 ">Cancelar</button>
                   
                    <button  className=" px-8 py-2 border cursor-pointer bg-cyan-700 hover:bg-cyan-800 ">Enviar</button>

                    </div>
                  
                  </form>
                      )
                    }
                
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
          </div>
    </>
  );
}
