import {
  bandaDatosAmpleosInterface,
  categoriaDatosAmpleosInterface,
  criterioEvaluacionDatosAmpleosInterface,
  registroEventoDatosAmpleosInterface,
  rubricaDatosAmpleosInterface,
} from "@/interfaces/interfaces";

import React, { useEffect } from "react";
import EvaluarCriterioComponent from "./EvaluarCriterioComponent";
import CriteriosServices from "@/lib/services/criteriosServices";
import { useDispatch, useSelector } from "react-redux";
import { agregarCriterioEvaluar } from "@/feacture/evaluar/evaluarSlice";
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

  const dataCriteriosEvaluar = useSelector(
    (state: RootState) => state.evaluarCriterio.evaluaciones
  );

  const [listCriteriosOriginales, setListCriteriosOrignales] = React.useState<
    criterioEvaluacionDatosAmpleosInterface[]
  >([]);
  const [listCriterios, setListCriterios] = React.useState<
    criterioEvaluacionDatosAmpleosInterface[]
  >([]);
  const [cargandoCriterios, setCargandoCriterios] =
    React.useState<boolean>(true);

  useEffect(() => {
    const fetchCriterios = async () => {
      const criteriosServices = new CriteriosServices();
      const dataCriterios = await criteriosServices.getDatosAmpleos();
      setListCriteriosOrignales(dataCriterios);
      const criteriosFiltrados = dataCriterios.filter(
        (criterio) => criterio.idForaneaRubrica === rubricaSelecionada.idRubrica
      );
      setListCriterios(criteriosFiltrados);

      // Inicializar criterios en el store de Redux
      criteriosFiltrados.forEach((criterio) => {
        dispatch(
          agregarCriterioEvaluar({ idCriterio: criterio.idCriterio, valor: 0 })
        );
      });

      setCargandoCriterios(false);
      if (dataCriterios.length !== 0) {
        setCargandoCriterios(false);
      }
    };

    fetchCriterios();
  }, [rubricaSelecionada, dispatch]);

  useEffect(() => {
    const criteriosFiltrados = listCriteriosOriginales.filter(
      (criterio) => criterio.idForaneaRubrica === rubricaSelecionada.idRubrica
    );
    setListCriterios(criteriosFiltrados);
    setCargandoCriterios(false);
  }, [rubricaSelecionada, listCriteriosOriginales]);

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
            <EvaluarCriterioComponent
              key={criterio.idCriterio}
              criterioSelecionado={criterio}
            />
          ))
        )}
      </div>
      

      <div className="w-full bg-gray-500 h-120 shadow-2xl  p-4 border-2 border-gray-400 text-gray-800">
        <div className="border-b-2 border-gray-700 mb-4 pb-2 flex justify-between">
          <h2 className="text-2xl font-bold">{bandaSelecionada.nombreBanda}</h2>
        </div>
        
        <div>
         


          <div className="flex flex-row gap-8">
            {Object.keys(dataCriteriosEvaluar).length > 0 ? (
              Object.entries(dataCriteriosEvaluar).map(
                ([idCriterio, valor]) => {
                  const criterio = listCriterios.find(
                    (c) => c.idCriterio === idCriterio
                  );
                  return (
                    <div
                      key={idCriterio}
                      className="flex flex-row items-center gap-1 "
                    >
                      <span className="font-bold">
                        {criterio
                          ? criterio.nombreCriterio
                          : `Criterio ${idCriterio}`}
                        :
                      </span>
                      <span className="text-2xl">{valor}</span>
                    </div>
                  );
                }
              )
            ) : (
              <p>No hay criterios para evaluar.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
