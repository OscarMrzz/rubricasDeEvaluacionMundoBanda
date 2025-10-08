import {
  bandaDatosAmpleosInterface,
  bandaInterface,
  categoriaDatosAmpleosInterface,
  criterioEvaluacionDatosAmpleosInterface,
  perfilInterface,
  regionesDatosAmpleosInterface,
  regionesInterface,
  registroComentariosInterface,
  registroCumplimientoEvaluacionInterface,
  registroEventoDatosAmpleosInterface,
  rubricaDatosAmpleosInterface,
} from "@/interfaces/interfaces";

import React, { useEffect, useState, useCallback, useRef } from "react";
import EvaluarCriterioComponent from "./EvaluarCriterioComponent";
import CriteriosServices from "@/lib/services/criteriosServices";
import { useDispatch, useSelector } from "react-redux";
import { agregarCriterioEvaluar, recetiarCriteriosEvaluados } from "@/feacture/evaluar/evaluarSlice";
import { RootState } from "@/app/store";
import registroCumplimintoServices from "@/lib/services/registroCumplimientoServices";
import { div, u } from "framer-motion/client";
import PerfilesServices from "@/lib/services/perfilesServices";
import registroComentariosServices from "@/lib/services/RegistroComentariosServices";
import RegistroComentariosServices from "@/lib/services/RegistroComentariosServices";
import loading2 from "@/animacionesJson/loading2.json";
import Lottie from "lottie-react";

type Props = {
  eventoSelecionado: registroEventoDatosAmpleosInterface;
  categoriaSelecionada: categoriaDatosAmpleosInterface;
  rubricaSelecionada: rubricaDatosAmpleosInterface;
  bandaSelecionada: bandaInterface;
  regionSelecionada: regionesDatosAmpleosInterface;
  recetiar: () => void;
  revisandoEvluacion: () => void;
};
export default function EvaluarBaseRubricaComponet({
  eventoSelecionado,
  categoriaSelecionada,
  rubricaSelecionada,
  bandaSelecionada,
  regionSelecionada,
  
  recetiar,
  revisandoEvluacion,
}: Props) {
  const dispatch = useDispatch();
  const registroCumplimientosServices = useRef(new registroCumplimintoServices());
  const registroComentariosServices =useRef(new RegistroComentariosServices())

  const dataCriteriosEvaluar = useSelector((state: RootState) => state.evaluarCriterio.evaluaciones);

  const [listCriteriosOriginales, setListCriteriosOrignales] = useState<criterioEvaluacionDatosAmpleosInterface[]>([]);
  const [listCriterios, setListCriterios] = React.useState<criterioEvaluacionDatosAmpleosInterface[]>([]);
  const [cargandoCriterios, setCargandoCriterios] = React.useState<boolean>(true);
  const [cargandoFichaResultados, setCargandoFichaResultados] = React.useState<boolean>(true);
  const [comentarios, setComentarios] = useState("");
  const [perfilActivo, setPerfilActivo] = useState<perfilInterface | null>(null);
const [sePrecionoElBotoGuardar,setSeprecionoElBotoGuardar] = React.useState<boolean>(false);
  const [campoImcompleto, setCampoIncompleto] = useState("");

  const [totalPuntos, setTotalPuntos] = useState(0);

  useEffect(() => {
    const fetchCriterios = async () => {
      setCargandoCriterios(true);
      const criteriosServices = new CriteriosServices();
      const dataCriterios = await criteriosServices.getDatosAmpleos();
      setListCriteriosOrignales(dataCriterios);
      const criteriosFiltrados = dataCriterios.filter(
        (criterio) => criterio.idForaneaRubrica === rubricaSelecionada.idRubrica
      );
      setListCriterios(criteriosFiltrados);

      dispatch(recetiarCriteriosEvaluados());
      setCargandoFichaResultados(true);
      criteriosFiltrados.forEach((criterio) => {
        dispatch(agregarCriterioEvaluar({ idCriterio: criterio.idCriterio, idCumplimiento: "", valor: 0 }));
      });

      setCargandoCriterios(false);
      setCargandoFichaResultados(false);
      if (dataCriterios.length !== 0) {
        setCargandoCriterios(false);
      }
    };

    fetchCriterios();
  }, [dispatch, rubricaSelecionada.idRubrica]);

  useEffect(() => {
    setCargandoCriterios(true);
    setCargandoFichaResultados(true);
    dispatch(recetiarCriteriosEvaluados());

    const criteriosFiltrados = listCriteriosOriginales.filter(
      (criterio) => criterio.idForaneaRubrica === rubricaSelecionada.idRubrica
    );
    criteriosFiltrados.forEach((criterio) => {
      dispatch(agregarCriterioEvaluar({ idCriterio: criterio.idCriterio, idCumplimiento: "", valor: 0 }));
    });
    setListCriterios(criteriosFiltrados);
    setCargandoCriterios(false);
    setCargandoFichaResultados(false);
  }, [rubricaSelecionada, dispatch, listCriteriosOriginales]);

  const sumarPuntosDeCriterios = useCallback(() => {
    let total = 0;
    Object.values(dataCriteriosEvaluar).forEach((item) => {
      if (typeof item === "object" && item !== null && "valor" in item) {
        total += item.valor;
      } else if (typeof item === "number") {
        total += item;
      }
    });
    setTotalPuntos(total);
  }, [dataCriteriosEvaluar]);

  useEffect(() => {
    sumarPuntosDeCriterios();
  }, [sumarPuntosDeCriterios]);

  const agregarComentario = (comentario: string) => {
    setComentarios(comentario);
  };

  const cargarPerfilActivo = async () => {
    try {
      const perfilServices = new PerfilesServices();
      const perfil = await perfilServices.getUsuarioLogiado();
      if (perfil) {
        setPerfilActivo(perfil);
      }
    } catch (error) {
      console.error("❌ Error cargando el perfil activo:", error);
    }
  };

  useEffect(() => {
    cargarPerfilActivo();
  }, []);

  const guardarEvaluacion = async () => {
    setSeprecionoElBotoGuardar(true)
    revisandoEvluacion()

    const camposCompletos = revisarCamposCompletos()

    if(camposCompletos){

   


    if (perfilActivo === null) {
      return;
    }
    const bandaAGuardar = bandaSelecionada.idBanda;
    const eventoAGuardar = eventoSelecionado.idEvento;
    const categoriaAGurdar = categoriaSelecionada.idCategoria;
    const rubricaAGurardar = rubricaSelecionada.idRubrica;
    const perfilEvaluadorAguardar = perfilActivo.idPerfil;
    const federaciónAGuardar = perfilActivo.idForaneaFederacion;
    const regionAguardar = regionSelecionada.idRegion;

    if (!perfilEvaluadorAguardar) {
      return;
    }
    const arregloDeCriteriosAGuardar = Object.entries(dataCriteriosEvaluar);
    if (
      perfilActivo !== null &&
      arregloDeCriteriosAGuardar.length !== 0 &&
      comentarios.trim() !== "" &&
      bandaAGuardar !== null &&
      eventoAGuardar !== null &&
      categoriaAGurdar !== null &&
      rubricaAGurardar !== null
    ) {
      arregloDeCriteriosAGuardar.forEach(async ([idCriterio, item]) => {
        const data: Omit<registroCumplimientoEvaluacionInterface, "idRegistroCumplimientoEvaluacion" | "created_at"> = {
          idForaneaBanda: bandaAGuardar,
          idForaneaEvento: eventoAGuardar,
          idForaneaCategoria: categoriaAGurdar,
          idForaneaRubrica: rubricaAGurardar,
          idForaneaPerfil: perfilEvaluadorAguardar,
          idForaneaFederacion: federaciónAGuardar,
          idForaneaRegion: regionAguardar,
          puntosObtenidos: item.valor,
          idForaneaCumplimiento: item.idCumplimiento,
          idForaneaCriterio: idCriterio,
        };
      
        try {
          const respuesta = await registroCumplimientosServices.current.create(
            data as registroCumplimientoEvaluacionInterface
          );
          if (respuesta) {
          } else {
            console.log("❌ Error al guardar la evaluación.");
          }
        } catch (error) {
          console.error("❌ Error al guardar la evaluación:", error);
        }
      });
      try {
              const dataComentario: Omit<registroComentariosInterface, "idRegistroComentario" | "created_at"> = {
        idForaneaBanda: bandaAGuardar,
        idForaneaEvento: eventoAGuardar,
        idForaneaCategoria: categoriaAGurdar,
        idForaneaRubrica: rubricaAGurardar,
        idForaneaPerfil: perfilEvaluadorAguardar,
        idForaneaFederacion: federaciónAGuardar,
        idForaneaRegion: regionAguardar,

        comentario: comentarios.trim(),
      };

      const respuestaComentario = await registroComentariosServices.current.create(dataComentario as registroComentariosInterface);
      if (respuestaComentario) {
        console.log("✅ Comentario guardado con éxito.");
        recetiar();
      } else {
        console.log("❌ Error al guardar el comentario.");

      
        };
      } catch (error) {
        console.error("❌ Error al guardar el comentario:", error);
      }


    } else {
      console.log("Faltan datos para guardar la evaluacion");
    }
     }

     
  };

  const revisarCamposCompletos = () => {
    const arregloDeCriteriosAGuardar = Object.entries(dataCriteriosEvaluar);
    let criterioNoEvaluado = "";
    arregloDeCriteriosAGuardar.forEach(([idCriterio, item]) => {
      if (item.idCumplimiento === "") {
        criterioNoEvaluado = idCriterio;
        return;
      }
    })
    if (criterioNoEvaluado !== ""){
      setCampoIncompleto(criterioNoEvaluado)
      return false
    }
    else{
      return true
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 items-center bg-gray-800 px-35">
      <section className="flex flex-col gap-2 items-center mb-4 bg-gray-700 w-full">
        <h2 className="text-2xl font-bold ">{bandaSelecionada.nombreBanda}</h2>
        <p>{eventoSelecionado.LugarEvento}</p>
        <p>{categoriaSelecionada.nombreCategoria}</p>
        <p>{rubricaSelecionada.nombreRubrica}</p>
      </section>
      {
        Object.keys(dataCriteriosEvaluar).length === 0 ?<div>
        <Lottie animationData={loading2} loop={true} className=" " />

      </div> : null
      }
      
      <div className=" w-full flex flex-col gap-4 ">
        {cargandoCriterios ? (
          <p>Cargando Criterios...</p>
        ) : (
          listCriterios.map((criterio) => (
            <EvaluarCriterioComponent key={criterio.idCriterio} criterioSelecionado={criterio} criterioNoEvaluado={campoImcompleto} />
          ))
        )}
      </div>




{Object.keys(dataCriteriosEvaluar).length === 0  ? null:
<>

      <div className="w-full bg-gray-500 h-120 shadow-2xl  p-4 border-2 border-gray-400 text-gray-800">

        <div className="border-b-2 border-gray-700 mb-4 pb-2 flex justify-between">
          <h2 className="text-2xl font-bold">{bandaSelecionada.nombreBanda}</h2>
          <p className="pr-5"> Total: {totalPuntos}</p>
        </div>

        

        <div className="flex flex-row gap-4 justify-between">
          <div>
            <div className="flex flex-row flex-wrap gap-10 justify-start items-start">
              { Object.keys(dataCriteriosEvaluar).length > 0 ? (
                Object.entries(dataCriteriosEvaluar).map(([idCriterio, item]) => {
                  const criterio = listCriterios.find((c) => c.idCriterio === idCriterio);
                  return (
                    <div key={idCriterio} className="flex flex-row items-center gap-1 ">
                      {criterio ? (
                        <>
                          <span className="font-bold">{criterio.nombreCriterio}:</span>
                          <span className="font-light">{item.valor}</span>
                        </>
                      ) : null}
                    </div>
                  );
                })
              ) : (
                <p>No hay criterios para evaluar.</p>
              )}
            </div>
          </div>
          <div className="">
            <textarea
              name=""
              id=""
              value={comentarios}
              onChange={(evento) => agregarComentario(evento.target.value)}
              cols={30}
              maxLength={255}
              style={{ height: "350px" }}
              className={`w-80 p-3 border  rounded-lg resize-none focus:outline-none
                ${comentarios.length===0 && sePrecionoElBotoGuardar ? "border-2 border-red-800":"border-gray-300"}
                `}
              placeholder="Observaciones comentarios y sugerencias..."
            ></textarea>
          </div>
        </div>
        
      </div>
        
        

        
    
    <div className="w-full flex justify-end items-center bg-gray-500 h-25 p-2 gap-4 border-2 border-gray-400 shadow-2xl">
        <button className="bg-gray-600 border-2 border-gray-400 hover:bg-gray-500 text-gray-300 h-10 w-52  px-4 py-2 rounded-xl cursor-pointer">
          Cancelar
        </button>
        <button
          onClick={() => guardarEvaluacion()}
          className="bg-cyan-800 hover:bg-cyan-700 border-2 border-cyan-500 h-10 w-52 text-white px-4 py-2 rounded-xl cursor-pointer"
        >
          Guardar Evaluación
        </button>
      </div>

     
</>
          }


      
   
    </div>
  );
}
