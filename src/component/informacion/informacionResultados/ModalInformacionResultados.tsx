import { RootState } from "@/app/store";
import { setfilaResultadoItemSeleccionado } from "@/feacture/resultadosGenerales/ResultadosGeneralesSlice";
import { registroComentariosDatosAmpleosInterface, registroCumplimientoEvaluacionDatosAmpleosInterface, rubricaInterface } from "@/interfaces/interfaces";
import RegistroCumplimientoServices from "@/lib/services/RegistroCumplimientosServices";
import loading2 from "@/animacionesJson/Loading2.json";

import Lottie from "lottie-react";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import RegistroComentariosServices from "@/lib/services/RegistroComentariosServices";
import ModalFormularioSolicitudRevicion from "./modalFormularioSolicitudRevicion";
import { useModalSolicitudRevicionesStore } from "@/Store/revicionesStore/modalSolicitudRevicionesStore";
import { baseSolicitudRevicionInterface, useSolicitudRevicionStore } from "@/Store/revicionesStore/solicitudRevicionStore";

type OverleyModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function ModalInformacionResultados({ open, onClose }: OverleyModalProps) {
  const {setSolicitudRevicion} = useSolicitudRevicionStore()
    const {activarOverleyCriteriosFormularioSolicitudRevisar} =useModalSolicitudRevicionesStore()
    const registroCumpliminetoServices = useRef(new RegistroCumplimientoServices());
  const registroCumplimientoServices = useRef(new RegistroCumplimientoServices());
  const [datosCumplimientosbandaSelecionada, setDatosCumplimientosbandaSelecionada] = React.useState<
    registroCumplimientoEvaluacionDatosAmpleosInterface[]
  >([]);
  const [datosComentariosbandaSelecionada, setDatosComentariosbandaSelecionada] = React.useState<
  registroComentariosDatosAmpleosInterface[]
>([]);
  const filaResultadosSelecionada = useSelector((state: RootState) => state.resultadosGeneralesReducer);
  const [cargadoDatos, setCargadoDatos] = React.useState(true);
  const [listaCRubricasUnicas, setListaRubricaUnicas] = React.useState<rubricaInterface[]>([]);
  const [totalPorRubrica, setTotalPorRubrica] = React.useState<{ [key: string]: number }>({});
  const registroComentariosServices = useRef(new RegistroComentariosServices());

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      setCargadoDatos(true);

      if (!filaResultadosSelecionada || !filaResultadosSelecionada.idEvento) return;
      const { idEvento, idBanda } = filaResultadosSelecionada;
      const data = await registroCumplimientoServices.current.getPorBandaYEvento(idBanda, idEvento);
      const dataComentarios = await registroComentariosServices.current.getPorBandaYEvento(idBanda, idEvento);
     
      setDatosCumplimientosbandaSelecionada(data);
      setDatosComentariosbandaSelecionada(dataComentarios);

      setCargadoDatos(false);
    };
    fetchData();
  }, [filaResultadosSelecionada]);

  useEffect(() => {
    porcesarDatos();
  }, [datosCumplimientosbandaSelecionada]);

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
    setDatosCumplimientosbandaSelecionada([]);
    dispatch(setfilaResultadoItemSeleccionado({ idBanda: "", idEvento: "" }));
    setCargadoDatos(true);

    setAnimar(false);
    onClose();
  };

  const porcesarDatos = () => {
    const rubricasUnicas: { [key: string]: rubricaInterface } = {};
    const rubricasUnicasList: rubricaInterface[] = [];
    for (const dato of datosCumplimientosbandaSelecionada) {
      if (!rubricasUnicas[dato.rubricas.idRubrica]) {
        rubricasUnicas[dato.rubricas.idRubrica] = dato.rubricas;
        rubricasUnicasList.push(dato.rubricas);
      }
    }
    setListaRubricaUnicas(rubricasUnicasList);

    const totales: { [key: string]: number } = {};
    for (const dato of datosCumplimientosbandaSelecionada) {
      if (!totales[dato.rubricas.idRubrica]) {
        totales[dato.rubricas.idRubrica] = 0;
      }
      totales[dato.rubricas.idRubrica] += dato.puntosObtenidos;
    }
    setTotalPorRubrica(totales);
  };

  const onDoubleClickFila = (resultado: registroCumplimientoEvaluacionDatosAmpleosInterface) => {
    const idRegistroCumplimientoEvaluacion = resultado.idRegistroCumplimientoEvaluacion;
    const nombreBanda =resultado.bandas.nombreBanda;
    const rubricaNombre= resultado.rubricas.nombreRubrica;
    const criterioNombre= resultado.criteriosEvalucion.nombreCriterio;
    const cumplimientoDetalles =resultado.cumplimientos.detalleCumplimiento;
    const puntosObtenidos =resultado.puntosObtenidos;

    const solicitud: baseSolicitudRevicionInterface ={
        idRegistroCumplimiento: idRegistroCumplimientoEvaluacion,
        nombreBanda: nombreBanda,
        nombreRubrica: rubricaNombre,
        nombreCriterio: criterioNombre,
         nombreCumplimiento: cumplimientoDetalles,
        puntosObtenidos: puntosObtenidos,
    }


    setSolicitudRevicion(solicitud);
  activarOverleyCriteriosFormularioSolicitudRevisar();
  };


  return (
    <>

      {open ? (
        <div
          onDoubleClick={() => cerrarModal()}
          className="bg-gray-950/50 inset-0 z-100 fixed w-screen h-screen flex justify-center items-center"
        >
          <div
            className={`w-4xl h-140 bg-gray-800 px-2 lg:px-25 overflow-auto scrollbar-estetica ${
              Animar ? "scale-100" : "scale-75"
            }  transition-all duration-500 ease-in-out`}
          >
            {!cargadoDatos ? (
              <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">Banda X</h2>

                {listaCRubricasUnicas.map((rubrica) => (
                  <div
                    key={rubrica.idRubrica}
                    className="bg-gray-700 mb-6  pb-4  p-4"
                  >
                    <div className="flex flex-row gap-8 items-center mb-4">
                      <h3 className="text-xl font-semibold  text-gray-300">{rubrica.nombreRubrica}</h3>
                      <p className="text-lg font-semibold  text-gray-300"> {totalPorRubrica[rubrica.idRubrica] || 0} %</p>
                    </div>

                    <div className="flex flex-col gap-2 ">
                      {datosCumplimientosbandaSelecionada
                        .filter((dato) => dato.rubricas.idRubrica === rubrica.idRubrica)
                        .map((dato) => (
                          <div
                          onDoubleClick={()=>onDoubleClickFila(dato)}

                            key={dato.idRegistroCumplimientoEvaluacion}
                            className=" min-h-15   bg-gray-600 flex items-center gap-10 cursor-pointer hover:bg-slate-600 "
                          >
                            <div className="  flex justify-center items-center  w-15 h-full p-2 ">
                              <p className="font-bold"> {dato.puntosObtenidos} %</p>
                            </div>

                            <p>
                              <strong>{dato.criteriosEvalucion.nombreCriterio}</strong>{" "}
                            </p>
                          </div>
                        ))}
                    </div>


                          <div>
                    <h4 className=" font-light mt-4 mb-2 text-gray-300">Comentarios:</h4>
                    <div className="flex flex-col gap-2 ">
                      {datosComentariosbandaSelecionada
                        .filter((comentario) => comentario.rubricas.idRubrica === rubrica.idRubrica)
                        .map((comentario) => (  
                          <div
                            key={comentario.idRegistroComentario}
                            className="font-light    bg-[#72d1fa]/45 flex items-center gap-10 p-2 "
                          >
                            <p>
                              <strong>{comentario.comentario}</strong>{" "}
                            </p>
                          </div>
                        ))}
                        </div>
                    


                    </div>
              
                  </div>

                  

                  
                )

                
                )}
              </div>
            ) : (
              <div className="p-4 flex justify-center items-start">
                <div className="w-xl ">
                  <Lottie animationData={loading2} loop={true} className=" " />
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
