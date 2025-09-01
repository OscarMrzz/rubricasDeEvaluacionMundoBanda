"use client";

import { useEffect, useState } from "react";
import SkeletonTabla from "@/component/skeleton/SkeletonTabla/Page";
import React from "react";
import OverleyModalFormulario from "@/component/modales/OverleyModalFormulario/Page";
import { PlusIcon } from "@heroicons/react/16/solid";
import {
  categoriaInterface,
  rubricaDatosAmpleosInterface,
} from "@/interfaces/interfaces";
import RubricasServices from "@/lib/services/rubricasServices";

import FormularioAgregarRubricaComponent from "@/component/formularios/FormulariosRubricas/FormularioAgregarRubricaComponent/Page";
import TablaRubricasComponent from "@/component/Tablas/tablaRubricasComponent/Page";
import CategoriasServices from "@/lib/services/categoriaServices";
import FormularioAgregarCriterioComponet from "@/component/formularios/FormularioCriterio/FormularioAgregarCriterioComponent/FormularioAgregarCriterioComponet";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import {
  activarOverleyFormularioAgregarRubrica,
  activarOverleyFormularioEditarCriterio,
  activarOverleyFormularioEditarRubrica,
  desactivarOverleyCriteriosFormularioAgregar,
  desactivarOverleyFormularioAgregarRubrica,
  desactivarOverleyFormularioEditarCriterio,
  desactivarOverleyFormularioEditarRubrica,
  desactivarOverleyInformacionCriterio,
  desactivarOverleyInformacionRubrica,
} from "@/feacture/overleys/overleySlice";
import OverleyModal from "@/component/modales/OverleyModal/Page";
import InformacionRubricaComponent from "@/component/informacion/informacionRubricaComponent/Page";
import FormularioEditarRubricaComponent from "@/component/formularios/FormulariosRubricas/FormularioEditarRubricaComponent/Page";
import { desactivarRefrescarDataRubricas } from "@/feacture/RefrescadorData/refrescadorDataSlice";
import InformacionCriterioComponent from "@/component/informacion/informacionCriterioComponent/InformacionCriterioComponet";
import FormularioEditarCriterioComponet from "@/component/formularios/FormularioCriterio/FormilarioEditarCriterioComponent/FormularioEditarCirterioComponent";

export default function RubricaHomePage() {
  const dispatch = useDispatch();

  /* ---------------Rubricas  */
  const refrescadorDataRubricas = useSelector(
    (state: RootState) => state.refrescadorData.RefrescadorDataRubricas
  );
  const activarOverleyFormularioAgregarRubricaValue = useSelector(
    (state: RootState) =>
      state.overley.activarOverleyFormularioAgregarRubrica
  );


  const activadorInformacionRubrica = useSelector(
    (state: RootState) => state.overley.activadorOverleyInformacionRubrica
  );
  const activadorOverleyFormularioEditar = useSelector(
    (state: RootState) => state.overley.activadorOverleyFormularioEditarRubrica
  );
  const rubricaSeleccionada = useSelector(
    (state: RootState) => state.rubrica.RubricaSeleccionada
  );

  /* --------------------Criterios ------------------- */



  const activadorInformacionCriterio = useSelector((state: RootState) => state.overley.activadorOverleyInformacionCriterio);
 
  const activadorOverleyFormularioAgregarCriterios = useSelector((state: RootState) =>state.overley.activadorOverleyFormularioAgregarCriterios);

  const criterioSeleccionado = useSelector((state: RootState) => state.criterio.CriterioSeleccionado);
  const activadorFormularioEditarCriterio = useSelector((state: RootState) => state.overley.activadorOverleyFormularioEditarCriterios);
  /*  ------------------- cumplimiento --------------------- */
  const [rubricas, setRubricas] = useState<rubricaDatosAmpleosInterface[]>([]);
  const [rubricasOriginales, setRubricasOriginales] = useState<
    rubricaDatosAmpleosInterface[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [cargandoFiltros, setCargadoFiltros] = useState(false);
  const [categoriasLista, setCategoriasLista] = useState<categoriaInterface[]>(
    []
  );
  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState<string>("");
  const [openFormularioAgregar, setOpenFormularioAgregar] = useState(false);

  const abrirFormularioAgregar = () => {
    dispatch(activarOverleyFormularioAgregarRubrica());
  };
// Removed duplicate declaration of cerrarFormularioAgregarCriterio

  useEffect(() => {
    traerDatosTabla();
  }, []);

  useEffect(() => {
    if (refrescadorDataRubricas) {
      traerDatosTabla();
      dispatch(desactivarRefrescarDataRubricas());
    }
  }, [refrescadorDataRubricas]);

  async function traerDatosTabla() {
    const rubricasServices = new RubricasServices();
    try {
      const rubricasData: rubricaDatosAmpleosInterface[] =
        await rubricasServices.getDatosAmpleos();
      setRubricas(rubricasData);
      setRubricasOriginales(rubricasData);
      setLoading(false);
      console.log("✅ Rubricas obtenidas:");
      console.log(rubricasData);
    } catch (error) {
      console.error("❌ Error al obtener las Rubricas:", error);
      setLoading(false);
    } finally {
      setCargadoFiltros(true);
    }
  }

  const cargarFiltros = async () => {
    const categoriasServices = new CategoriasServices();
    try {
      const categoriasData = await categoriasServices.get();
      setCategoriasLista(categoriasData);
    } catch (error) {
      console.error("❌ Error al obtener las Categorias:", error);
    }
  };

  useEffect(() => {
    cargarFiltros();
  }, []);

  const seleccionarCategoria = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const categoriaId = event.target.value;
    setCategoriaSeleccionada(categoriaId);
    filtrarRubricasPorCategoria(categoriaId);
  };

  const filtrarRubricasPorCategoria = (categoriaId: string) => {
    if (categoriaId === "") {
      setRubricas(rubricasOriginales);
    } else {
      const rubricasFiltradas = rubricasOriginales.filter(
        (rubrica) => rubrica.idForaneaCategoria === categoriaId
      );
      setRubricas(rubricasFiltradas);
    }
  };
  const cerrarFormularioAgregarRubrica = () => {
    dispatch(desactivarOverleyFormularioAgregarRubrica());
  }

  const cerrarFormularioAgregarCriterio = () => {
    dispatch(desactivarOverleyCriteriosFormularioAgregar());
  };

  const cerrarInformacionRubrica = () => {
    dispatch(desactivarOverleyInformacionRubrica());
  };
  const cerrarFormularioEditarRubrica = () => {
    dispatch(desactivarOverleyFormularioEditarRubrica());
  }
  const ActivarFormularioEditarRubrica = () => {
    dispatch(activarOverleyFormularioEditarRubrica());
  }

  const cerrarInformacionCriterio = () => {
    dispatch(desactivarOverleyInformacionCriterio());
  }
  const activarFormularioEditarCriterio = () => {
    dispatch(activarOverleyFormularioEditarCriterio());
  }
  const cerrarFormularioEditarCriterio = () => {
    dispatch(desactivarOverleyFormularioEditarCriterio());
  }

  return (
    <div className="px-20">
      {/*---------------01 RURBICA----------------- */}
      <OverleyModal
        open={activadorInformacionRubrica}
        onClose={cerrarInformacionRubrica}
      >
        {rubricaSeleccionada && (
          <InformacionRubricaComponent
            rubrica={rubricaSeleccionada}
            onClose={
              cerrarInformacionRubrica
            } 
            onRefresh={() => {}}
            openFormEditar={ActivarFormularioEditarRubrica}
            openFormAgregar={abrirFormularioAgregar}
          />
        )}
      </OverleyModal>
      <OverleyModalFormulario
        open={activarOverleyFormularioAgregarRubricaValue}
        onClose={cerrarFormularioAgregarRubrica}
      >
        <FormularioAgregarRubricaComponent
          refresacar={traerDatosTabla}
          onClose={cerrarFormularioAgregarRubrica}
        />
      </OverleyModalFormulario>

      <OverleyModalFormulario
        open={ activadorOverleyFormularioEditar}
        onClose={cerrarFormularioEditarRubrica}
      >
        <FormularioEditarRubricaComponent
          rubricaAEditar={rubricaSeleccionada!}
          //

          onClose={cerrarFormularioEditarRubrica}
          refresacar={() => {}}
          
        />
      </OverleyModalFormulario>
        {/*--------------- 02 Criterio ----------------- */}
              <OverleyModal open={activadorInformacionCriterio} onClose={cerrarInformacionCriterio}>
        {criterioSeleccionado && (
          <InformacionCriterioComponent
            criterio={criterioSeleccionado}
            onClose={cerrarInformacionCriterio}
            onRefresh={()=>{}}
            openFormEditar={activarFormularioEditarCriterio}
          />
        )}
      </OverleyModal>

      <OverleyModalFormulario
        open={activadorOverleyFormularioAgregarCriterios}
        onClose={cerrarFormularioAgregarCriterio}
      >
        <FormularioAgregarCriterioComponet
          rubrica={rubricaSeleccionada!}
          refresacar={() => {}}
          onClose={cerrarFormularioAgregarCriterio}
        />
      </OverleyModalFormulario>

          <OverleyModalFormulario
        open={activadorFormularioEditarCriterio}
        onClose={cerrarFormularioEditarCriterio}
      >
        <FormularioEditarCriterioComponet
          criterioAEditar={criterioSeleccionado!}
          //

          onClose={cerrarFormularioEditarCriterio}
          refresacar={() => {}}
        />
      </OverleyModalFormulario>

      <div>
        <div>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold mb-4">Rubricas</h1>
          </div>
          <div className="flex justify-between mb-4">
            <select
              className=" w-40 h-6 bg-red-500 border-0"
              name=""
              id=""
              value={categoriaSeleccionada}
              onChange={seleccionarCategoria}
            >
              <option className="bg-white text-gray-300" value="">
                Todas las categorias
              </option>
              {cargandoFiltros &&
                categoriasLista.map((categoria) => (
                  <option
                    className="bg-white text-gray-800"
                    key={categoria.idCategoria}
                    value={categoria.idCategoria}
                  >
                    {categoria.nombreCategoria}
                  </option>
                ))}
            </select>
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
        <TablaRubricasComponent
          rubricas={rubricas}
          onRefresh={traerDatosTabla}
        />
      )}
    </div>
  );
}
