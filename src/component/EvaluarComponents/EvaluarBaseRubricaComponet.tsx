import {
  bandaDatosAmpleosInterface,
  categoriaDatosAmpleosInterface,
  criterioEvaluacionDatosAmpleosInterface,
  registroEventoDatosAmpleosInterface,
  rubricaDatosAmpleosInterface,
} from "@/interfaces/interfaces";

import React, { useEffect, useState, useCallback } from "react";
import EvaluarCriterioComponent from "./EvaluarCriterioComponent";
import CriteriosServices from "@/lib/services/criteriosServices";
import { useDispatch, useSelector } from "react-redux";
import { agregarCriterioEvaluar, recetiarCriteriosEvaluados } from "@/feacture/evaluar/evaluarSlice";
import { RootState } from "@/app/store";

type Props = {
  eventoSelecionado: registroEventoDatosAmpleosInterface;
  categoriaSelecionada: categoriaDatosAmpleosInterface;
  rubricaSelecionada: rubricaDatosAmpleosInterface;
  bandaSelecionada: bandaDatosAmpleosInterface;
};
export default function EvaluarBaseRubricaComponet({
  eventoSelecionado,
  categoriaSelecionada,
  rubricaSelecionada,
  bandaSelecionada,
}: Props) {
  const dispatch = useDispatch();

  const dataCriteriosEvaluar = useSelector((state: RootState) => state.evaluarCriterio.evaluaciones);

  const [listCriteriosOriginales, setListCriteriosOrignales] = useState<criterioEvaluacionDatosAmpleosInterface[]>([]);
  const [listCriterios, setListCriterios] = React.useState<criterioEvaluacionDatosAmpleosInterface[]>([]);
  const [cargandoCriterios, setCargandoCriterios] = React.useState<boolean>(true);
  const [cargandoFichaResultados, setCargandoFichaResultados] = React.useState<boolean>(true);
  const [comentarios, setComentarios] = useState("");

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
        dispatch(agregarCriterioEvaluar({ idCriterio: criterio.idCriterio, valor: 0 }));
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
      dispatch(agregarCriterioEvaluar({ idCriterio: criterio.idCriterio, valor: 0 }));
    });
    setListCriterios(criteriosFiltrados);
    setCargandoCriterios(false);
    setCargandoFichaResultados(false);
  }, [rubricaSelecionada, dispatch, listCriteriosOriginales]);

  const sumarPuntosDeCriterios = useCallback(() => {
    let total = 0;
    Object.values(dataCriteriosEvaluar).forEach((valor) => {
      total += valor;
    });
    setTotalPuntos(total);
  }, [dataCriteriosEvaluar]);

  useEffect(() => {
    sumarPuntosDeCriterios();
  }, [sumarPuntosDeCriterios]);

  const agregarComentario = (comentario: string) => {
    setComentarios(comentario);
  }

  return (
    <div className="flex flex-col gap-4 p-4 items-center bg-gray-800 px-35">
      <section className="flex flex-col gap-2 items-center mb-4 bg-gray-700 w-full">
        <h2 className="text-2xl font-bold ">{bandaSelecionada.nombreBanda}</h2>
        <p>{eventoSelecionado.LugarEvento}</p>
        <p>{categoriaSelecionada.nombreCategoria}</p>
        <p>{rubricaSelecionada.nombreRubrica}</p>
      </section>
      <div className=" w-full flex flex-col gap-4 ">
        {cargandoCriterios ? (
          <p>Cargando Criterios...</p>
        ) : (
          listCriterios.map((criterio) => (
            <EvaluarCriterioComponent key={criterio.idCriterio} criterioSelecionado={criterio} />
          ))
        )}
      </div>

      <div className="w-full bg-gray-500 h-120 shadow-2xl  p-4 border-2 border-gray-400 text-gray-800">
        <div className="border-b-2 border-gray-700 mb-4 pb-2 flex justify-between">
          <h2 className="text-2xl font-bold">{bandaSelecionada.nombreBanda}</h2>
          <p className="pr-5"> Total: {totalPuntos}</p>
        </div>

        <div className="flex flex-row gap-4 justify-between">
          <div>
            <div className="flex flex-row flex-wrap gap-10 justify-start items-start">
              {cargandoFichaResultados ? (
                <p>Cargando...</p>
              ) : Object.keys(dataCriteriosEvaluar).length > 0 ? (
                Object.entries(dataCriteriosEvaluar).map(([idCriterio, valor]) => {
                  const criterio = listCriterios.find((c) => c.idCriterio === idCriterio);
                  return (
                    <div key={idCriterio} className="flex flex-row items-center gap-1 ">
                      {criterio ? (
                        <>
                          <span className="font-bold">{criterio.nombreCriterio}:</span>
                          <span className="font-light">{valor}</span>
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
              className="w-80 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none"
              placeholder="Observaciones comentarios y sugerencias..."
            ></textarea>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end items-center bg-gray-500 h-25 p-2 gap-4 border-2 border-gray-400 shadow-2xl">
        <button className="bg-gray-600 border-2 border-gray-400 hover:bg-gray-500 text-gray-300 h-10 w-52  px-4 py-2 rounded-xl cursor-pointer">
          Cancelar
        </button>
        <button className="bg-cyan-800 hover:bg-cyan-700 border-2 border-cyan-500 h-10 w-52 text-white px-4 py-2 rounded-xl cursor-pointer">
          Guardar Evaluación
        </button>
      </div>
    </div>
  );
}
