import { RootState } from "@/app/store";
import { setfilaResultadoItemSeleccionado } from "@/feacture/resultadosGenerales/ResultadosGeneralesSlice";
import { registroCumplimientoEvaluacionDatosAmpleosInterface, rubricaInterface } from "@/interfaces/interfaces";
import RegistroCumplimientoServices from "@/lib/services/RegistroCumplimientosServices";
import loading2 from "@/animacionesJson/Loading2.json";

import Lottie from "lottie-react";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

type OverleyModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function ModalInformacionResultados({ open, onClose }: OverleyModalProps) {
  const registroCumplimientoServices = useRef(new RegistroCumplimientoServices());
  const [datosCumplimientosbandaSelecionada, setDatosCumplimientosbandaSelecionada] = React.useState<
    registroCumplimientoEvaluacionDatosAmpleosInterface[]
  >([]);
  const filaResultadosSelecionada = useSelector((state: RootState) => state.resultadosGeneralesReducer);
  const [cargadoDatos, setCargadoDatos] = React.useState(true);
  const [listaCRubricasUnicas, setListaRubricaUnicas] = React.useState<rubricaInterface[]>([]);
  const [totalPorRubrica, setTotalPorRubrica] = React.useState<{ [key: string]: number }>({});

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      setCargadoDatos(true);

      if (!filaResultadosSelecionada || !filaResultadosSelecionada.idEvento) return;
      const { idEvento, idBanda } = filaResultadosSelecionada;
      const data = await registroCumplimientoServices.current.getPorBandaYEvento(idBanda, idEvento);
      console.log("Datos de cumplimiento obtenidos:", data);
      setDatosCumplimientosbandaSelecionada(data);
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

  return (
    <>
      {open ? (
        <div
          onDoubleClick={() => cerrarModal()}
          className="bg-gray-950/50 inset-0 z-100 fixed w-screen h-screen flex justify-center items-center"
        >
          <div
            className={`w-4xl h-140 bg-gray-800 px-25 overflow-auto scrollbar-estetica ${
              Animar ? "scale-100" : "scale-75"
            }  transition-all duration-500 ease-in-out`}
          >
            {!cargadoDatos ? (
              <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">Banda X</h2>

                {listaCRubricasUnicas.map((rubrica) => (
                  <div
                    key={rubrica.idRubrica}
                    className="bg-gray-700 mb-6 border-b pb-4 border-gray-500 shadow-2xl border-2 p-4"
                  >
                    <div className="flex flex-row gap-8 items-center mb-4">
                      <h3 className="text-xl font-semibold  text-gray-300">{rubrica.nombreRubrica}</h3>
                      <p className="text-lg font-semibold  text-gray-300"> {totalPorRubrica[rubrica.idRubrica] || 0}</p>
                    </div>

                    <div className="flex flex-col gap-2 ">
                      {datosCumplimientosbandaSelecionada
                        .filter((dato) => dato.rubricas.idRubrica === rubrica.idRubrica)
                        .map((dato) => (
                          <div
                            key={dato.idRegistroCumplimientoEvaluacion}
                            className=" h-15   bg-gray-600 flex items-center gap-10 "
                          >
                            <div className=" bg-[#274c77] flex justify-center items-center  w-15 h-full p-2 ">
                              <p className="font-bold"> {dato.puntosObtenidos}</p>
                            </div>

                            <p>
                              <strong>{dato.criteriosEvalucion.nombreCriterio}</strong>{" "}
                            </p>
                          </div>
                        ))}
                    </div>
                    <div></div>
                  </div>
                ))}
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
