import { RootState } from "@/app/store";
import { setfilaResultadoItemSeleccionado } from "@/feacture/resultadosGenerales/ResultadosGeneralesSlice";
import {
  perfilDatosAmpleosInterface,
  perfilInterface,
  registroComentariosDatosAmpleosInterface,
  registroCumplimientoEvaluacionDatosAmpleosInterface,
  rubricaInterface,
  solicitudRevicionInterface,
} from "@/interfaces/interfaces";
import RegistroCumplimientoServices from "@/lib/services/RegistroCumplimientosServices";
import loading2 from "@/animacionesJson/Loading2.json";

import Lottie from "lottie-react";
import React, { use, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RegistroComentariosServices from "@/lib/services/RegistroComentariosServices";
import { useSolicitudRevicionStore } from "@/Store/revicionesStore/solicitudRevicionStore";
import SolicitudRevicionServices from "@/lib/services/solicitudRevicionServices";
import { form } from "@heroui/theme";
import { useModalSolicitudRevicionesStore } from "@/Store/revicionesStore/modalSolicitudRevicionesStore";

type OverleyModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function ModalFormularioSolicitudRevicion({ open, onClose }: OverleyModalProps) {
  const { solicitudRevicion } = useSolicitudRevicionStore();
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
  const [deseaSolicitarRevision, setDeseaSolicitarRevision] = React.useState(false);
  const solicitudRevicionServices = useRef(new SolicitudRevicionServices());
  const [justificacion, setJustificacion] = React.useState("");
     const {desactivarOverleyCriteriosFormularioSolicitudRevisar} =useModalSolicitudRevicionesStore()
  const [perfil, setPerfil] = useState<perfilDatosAmpleosInterface>({} as perfilDatosAmpleosInterface);
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

  const siDeseasolicitarRevision = () => {
    setDeseaSolicitarRevision(true);
  };

  const enviarSolicitud = async () => {
    if (!solicitudRevicion) return;
    const datosSolicitud: Omit<solicitudRevicionInterface,"idSolicitud" | "created_at"> = {
    idForaneaRegistroCumplimiento: solicitudRevicion.idRegistroCumplimiento,
    idForaneaFederacion: perfil.idForaneaFederacion,
    idForaneaSolicitanteRevicion: perfil.idPerfil,
    detallesSolicitud: justificacion

    }
    await solicitudRevicionServices.current.create(datosSolicitud as solicitudRevicionInterface);
    console.log("Solicitud Enviada");
    limpiarFormulario();
    desactivarOverleyCriteriosFormularioSolicitudRevisar();
    
  };

  const limpiarFormulario = () => {
    setJustificacion("");
    setDeseaSolicitarRevision(false);
  }

  return (
    <>
      {open ? (
        <div
          onDoubleClick={() => cerrarModal()}
          className="bg-gray-950/50 inset-0 z-100 fixed w-screen h-screen flex justify-center items-center"
        >
          <div
            className={`w-4xl h-140 bg-gray-800 px-4 lg:px-25 py-4  overflow-auto scrollbar-estetica ${
              Animar ? "scale-100" : "scale-75"
            }  transition-all duration-500 ease-in-out`}
          >
            <div className="flex flex-col h-full">
              <div className=" flex flex-col gap-4">
                <h2 className="text-2xl font-bold">{solicitudRevicion?.nombreBanda} </h2>
                <p className="font-bold">
                  Rubrica: <span className="font-thin text-gray-300">{solicitudRevicion?.nombreRubrica}</span>{" "}
                </p>
                <p className="font-bold">
                  Criterio: <span className="font-thin text-gray-300"> {solicitudRevicion?.nombreCriterio}</span>{" "}
                </p>
                <p className="font-bold">
                  Cumplimineto:{" "}
                  <span className="font-thin text-gray-300"> {solicitudRevicion?.nombreCumplimiento}</span>
                </p>
                <p className="font-bold">
                  Puntos: <span className="font-thin text-gray-300"> {solicitudRevicion?.puntosObtenidos} %</span>{" "}
                </p>
              </div>
              <div onClick={() => siDeseasolicitarRevision()} className="flex justify-center items-center h-full">
                {!deseaSolicitarRevision ? (
                  <button className=" border-2 px-2 py-4 cursor-pointer hover:bg-gray-700/50">
                    Solicitar Revicion
                  </button>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      enviarSolicitud();
                    }}
                    className="w-full"
                  >
                    <label htmlFor="">Justificacion</label>

                    <textarea
                      maxLength={200}
                      rows={4}
                      value={justificacion}
                      onChange={(e) => setJustificacion(e.target.value)}
                      placeholder="Justifique por que desea una revicion..."
                      className="w-full h-40 mb-4 bg-gray-700 border-2 border-gray-600 pr-4 pl-2 pt-2 pb-2"
                    ></textarea>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={enviarSolicitud}
                        className=" bg-sky-800 px-4 py-2 cursor-pointer hover:bg-sky-600 "
                      >
                        Enviar
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
